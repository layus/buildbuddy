package podman_test

import (
	"context"
	"io/ioutil"
	"path/filepath"
	"strconv"
	"strings"
	"testing"
	"time"

	"github.com/buildbuddy-io/buildbuddy/enterprise/server/remote_execution/container"
	"github.com/buildbuddy-io/buildbuddy/enterprise/server/remote_execution/containers/podman"
	"github.com/buildbuddy-io/buildbuddy/server/testutil/testauth"
	"github.com/buildbuddy-io/buildbuddy/server/testutil/testenv"
	"github.com/buildbuddy-io/buildbuddy/server/testutil/testfs"
	"github.com/buildbuddy-io/buildbuddy/server/util/status"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	repb "github.com/buildbuddy-io/buildbuddy/proto/remote_execution"
)

func writeFile(t *testing.T, parentDir, fileName, content string) {
	path := filepath.Join(parentDir, fileName)
	if err := ioutil.WriteFile(path, []byte(content), 0660); err != nil {
		t.Fatal(err)
	}
}

func makeTempDirWithWorldTxt(t *testing.T) string {
	dir := testfs.MakeTempDir(t)
	workDir := testfs.MakeDirAll(t, dir, "work")
	writeFile(t, workDir, "world.txt", "world")
	return dir
}

func TestRunHelloWorld(t *testing.T) {
	ctx := context.Background()
	rootDir := makeTempDirWithWorldTxt(t)
	cmd := &repb.Command{
		EnvironmentVariables: []*repb.Command_EnvironmentVariable{
			&repb.Command_EnvironmentVariable{Name: "GREETING", Value: "Hello"},
		},
		Arguments: []string{"sh", "-c", `printf "$GREETING $(cat world.txt)!"`},
	}
	// Need to give enough time to download the Docker image.
	ctx, cancel := context.WithTimeout(ctx, 2*time.Minute)
	defer cancel()

	env := testenv.GetTestEnv(t)
	env.SetAuthenticator(testauth.NewTestAuthenticator(testauth.TestUsers("US1", "GR1")))
	cacheAuth := container.NewImageCacheAuthenticator(container.ImageCacheAuthenticatorOpts{})

	podman := podman.NewPodmanCommandContainer(env, cacheAuth, "docker.io/library/busybox", rootDir, &podman.PodmanOptions{})
	result := podman.Run(ctx, cmd, "/work", container.PullCredentials{})

	require.NoError(t, result.Error)
	assert.Regexp(t, "^(/usr)?/bin/podman\\s", result.CommandDebugString, "sanity check: command should be run bare")
	assert.Equal(t, "Hello world!", string(result.Stdout),
		"stdout should equal 'Hello world!' ('$GREETING' env var should be replaced with 'Hello', and "+
			"tempfile containing 'world' should be readable.)",
	)
	assert.Empty(t, string(result.Stderr), "stderr should be empty")
	assert.Equal(t, 0, result.ExitCode, "should exit with success")
}

func TestHelloWorldExec(t *testing.T) {
	ctx := context.Background()
	rootDir := makeTempDirWithWorldTxt(t)
	cmd := &repb.Command{
		EnvironmentVariables: []*repb.Command_EnvironmentVariable{
			&repb.Command_EnvironmentVariable{Name: "GREETING", Value: "Hello"},
		},
		Arguments: []string{"sh", "-c", `printf "$GREETING $(cat world.txt)!"`},
	}
	// Need to give enough time to download the Docker image.
	ctx, cancel := context.WithTimeout(ctx, 2*time.Minute)
	defer cancel()

	env := testenv.GetTestEnv(t)
	env.SetAuthenticator(testauth.NewTestAuthenticator(testauth.TestUsers("US1", "GR1")))
	cacheAuth := container.NewImageCacheAuthenticator(container.ImageCacheAuthenticatorOpts{})

	podman := podman.NewPodmanCommandContainer(env, cacheAuth, "docker.io/library/busybox", rootDir, &podman.PodmanOptions{})

	err := podman.Create(ctx, "/work")
	require.NoError(t, err)

	result := podman.Exec(ctx, cmd, nil, nil)
	assert.NoError(t, result.Error)

	assert.Regexp(t, "^(/usr)?/bin/podman\\s", result.CommandDebugString, "sanity check: command should be run bare")
	assert.Equal(t, "Hello world!", string(result.Stdout),
		"stdout should equal 'Hello world!' ('$GREETING' env var should be replaced with 'Hello', and "+
			"tempfile containing 'world' should be readable.)",
	)
	assert.Empty(t, string(result.Stderr), "stderr should be empty")
	assert.Equal(t, 0, result.ExitCode, "should exit with success")

	err = podman.Remove(ctx)
	assert.NoError(t, err)
}

func TestRun_Timeout(t *testing.T) {
	rootDir := testfs.MakeTempDir(t)
	workDir := testfs.MakeDirAll(t, rootDir, "work")
	ctx := context.Background()
	cmd := &repb.Command{Arguments: []string{
		"sh", "-c", `
			echo ExampleStdout >&1
			echo ExampleStderr >&2
			echo "output" > output.txt
      # Wait for the context to be canceled
			sleep 100
		`,
	}}
	env := testenv.GetTestEnv(t)
	env.SetAuthenticator(testauth.NewTestAuthenticator(testauth.TestUsers("US1", "GR1")))
	cacheAuth := container.NewImageCacheAuthenticator(container.ImageCacheAuthenticatorOpts{})

	c := podman.NewPodmanCommandContainer(
		env, cacheAuth, "docker.io/library/busybox", rootDir, &podman.PodmanOptions{})
	// Ensure the image is cached
	err := container.PullImageIfNecessary(ctx, env, cacheAuth, c, container.PullCredentials{}, "docker.io/library/busybox")
	require.NoError(t, err)

	ctx, cancel := context.WithTimeout(ctx, 1*time.Second)
	defer cancel()

	res := c.Run(ctx, cmd, workDir, container.PullCredentials{})

	assert.True(
		t, status.IsDeadlineExceededError(res.Error),
		"expected DeadlineExceeded error, got: %s", res.Error)
	assert.Less(
		t, res.ExitCode, 0,
		"if timed out, exit code should be < 0 (unset)")
	assert.Equal(
		t, "ExampleStdout\n", string(res.Stdout),
		"if timed out, should be able to see debug output on stdout")
	assert.Equal(
		t, "ExampleStderr\n", string(res.Stderr),
		"if timed out, should be able to see debug output on stderr")
	output := testfs.ReadFileAsString(t, workDir, "output.txt")
	assert.Equal(
		t, "output\n", output,
		"if timed out, should be able to read debug output files")
}

func TestExec_Timeout(t *testing.T) {
	rootDir := testfs.MakeTempDir(t)
	workDir := testfs.MakeDirAll(t, rootDir, "work")
	ctx := context.Background()
	cmd := &repb.Command{Arguments: []string{
		"sh", "-c", `
			echo ExampleStdout >&1
			echo ExampleStderr >&2
			echo "output" > output.txt
      # Wait for the context to be canceled
			sleep 100
		`,
	}}
	env := testenv.GetTestEnv(t)
	env.SetAuthenticator(testauth.NewTestAuthenticator(testauth.TestUsers("US1", "GR1")))
	cacheAuth := container.NewImageCacheAuthenticator(container.ImageCacheAuthenticatorOpts{})

	c := podman.NewPodmanCommandContainer(
		env, cacheAuth, "docker.io/library/busybox", rootDir, &podman.PodmanOptions{})
	// Ensure the image is cached
	err := container.PullImageIfNecessary(ctx, env, cacheAuth, c, container.PullCredentials{}, "docker.io/library/busybox")
	require.NoError(t, err)
	err = c.Create(ctx, workDir)
	require.NoError(t, err)

	ctx, cancel := context.WithTimeout(ctx, 1*time.Second)
	defer cancel()

	res := c.Run(ctx, cmd, workDir, container.PullCredentials{})

	assert.True(
		t, status.IsDeadlineExceededError(res.Error),
		"expected DeadlineExceeded error, got: %s", res.Error)
	assert.Less(
		t, res.ExitCode, 0,
		"if timed out, exit code should be < 0 (unset)")
	assert.Equal(
		t, "ExampleStdout\n", string(res.Stdout),
		"if timed out, should be able to see debug output on stdout")
	assert.Equal(
		t, "ExampleStderr\n", string(res.Stderr),
		"if timed out, should be able to see debug output on stderr")
	output := testfs.ReadFileAsString(t, workDir, "output.txt")
	assert.Equal(
		t, "output\n", output,
		"if timed out, should be able to read debug output files")
}

func TestIsImageCached(t *testing.T) {
	rootDir := testfs.MakeTempDir(t)
	testfs.MakeDirAll(t, rootDir, "work")
	ctx := context.Background()
	ctx, cancel := context.WithTimeout(ctx, 2*time.Minute)
	defer cancel()
	env := testenv.GetTestEnv(t)
	env.SetAuthenticator(testauth.NewTestAuthenticator(testauth.TestUsers("US1", "GR1")))
	cacheAuth := container.NewImageCacheAuthenticator(container.ImageCacheAuthenticatorOpts{})

	tests := []struct {
		desc    string
		image   string
		want    bool
		wantErr bool
	}{
		{
			desc:    "image cached",
			image:   "docker.io/library/busybox",
			want:    true,
			wantErr: false,
		},
		{
			desc:    "image not cached",
			image:   "test.image",
			want:    false,
			wantErr: false,
		},
	}

	for _, tc := range tests {
		podman := podman.NewPodmanCommandContainer(env, cacheAuth, tc.image, rootDir, &podman.PodmanOptions{})
		if tc.want {
			err := podman.PullImage(ctx, container.PullCredentials{})
			require.NoError(t, err)
		}
		actual, err := podman.IsImageCached(ctx)
		assert.Equal(t, actual, tc.want)
		if tc.wantErr {
			assert.Error(t, err)
		} else {
			assert.NoError(t, err)
		}
	}
}

func TestForceRoot(t *testing.T) {
	rootDir := testfs.MakeTempDir(t)
	testfs.MakeDirAll(t, rootDir, "work")
	ctx := context.Background()
	ctx, cancel := context.WithTimeout(ctx, 2*time.Minute)
	defer cancel()
	env := testenv.GetTestEnv(t)
	env.SetAuthenticator(testauth.NewTestAuthenticator(testauth.TestUsers("US1", "GR1")))
	cacheAuth := container.NewImageCacheAuthenticator(container.ImageCacheAuthenticatorOpts{})
	image := "gcr.io/flame-public/test-nonroot:test-enterprise-v1.5.4"

	cmd := &repb.Command{
		Arguments: []string{"id", "-u"},
	}

	tests := []struct {
		desc      string
		forceRoot bool
		wantUID   int
	}{
		{
			desc:      "forceRoot",
			forceRoot: true,
			wantUID:   0,
		},
		{
			desc:      "not forceRoot",
			forceRoot: false,
			wantUID:   1000,
		},
	}
	for _, tc := range tests {
		podman := podman.NewPodmanCommandContainer(env, cacheAuth, image, rootDir, &podman.PodmanOptions{ForceRoot: tc.forceRoot})
		result := podman.Run(ctx, cmd, "/work", container.PullCredentials{})
		uid, err := strconv.Atoi(strings.TrimSpace(string(result.Stdout)))
		assert.NoError(t, err)
		assert.Equal(t, tc.wantUID, uid)
		assert.Empty(t, string(result.Stderr), "stderr should be empty")
		assert.Equal(t, 0, result.ExitCode, "should exit with success")
	}
}

func TestPodmanRun_LongRunningProcess_CanGetAllLogs(t *testing.T) {
	ctx := context.Background()
	rootDir := testfs.MakeTempDir(t)
	workDir := testfs.MakeDirAll(t, rootDir, "work")
	cmd := &repb.Command{
		Arguments: []string{"sh", "-c", `
			echo "Hello world"
			sleep 0.5
			echo "Hello again"
		`},
	}
	env := testenv.GetTestEnv(t)
	env.SetAuthenticator(testauth.NewTestAuthenticator(testauth.TestUsers("US1", "GR1")))
	cacheAuth := container.NewImageCacheAuthenticator(container.ImageCacheAuthenticatorOpts{})
	c := podman.NewPodmanCommandContainer(env, cacheAuth, "docker.io/library/busybox", rootDir, &podman.PodmanOptions{})

	res := c.Run(ctx, cmd, workDir, container.PullCredentials{})

	assert.Equal(t, "Hello world\nHello again\n", string(res.Stdout))
}
