load("@io_bazel_rules_go//go:def.bzl", "go_library", "go_test")

# gazelle:resolve go github.com/docker/go-units @com_github_docker_docker//vendor/github.com/docker/go-units:go_default_library
go_library(
    name = "docker",
    srcs = ["docker.go"],
    importpath = "github.com/buildbuddy-io/buildbuddy/enterprise/server/remote_execution/containers/docker",
    visibility = ["//visibility:public"],
    deps = [
        "//enterprise/server/remote_execution/commandutil",
        "//enterprise/server/remote_execution/container",
        "//proto:remote_execution_go_proto",
        "//server/config",
        "//server/environment",
        "//server/interfaces",
        "//server/util/log",
        "//server/util/random",
        "//server/util/status",
        "@com_github_docker_docker//api/types:go_default_library",
        "@com_github_docker_docker//api/types/container:go_default_library",
        "@com_github_docker_docker//client:go_default_library",
        "@com_github_docker_docker//pkg/stdcopy:go_default_library",
        "@com_github_docker_docker//vendor/github.com/docker/go-units:go_default_library",
        "@org_golang_google_grpc//codes",
        "@org_golang_google_grpc//status",
    ],
)

go_test(
    name = "docker_test",
    srcs = ["docker_test.go"],
    exec_properties = {
        # TODO(https://github.com/buildbuddy-io/buildbuddy-internal/issues/1094): Require less manual configuration here.
        "workload-isolation-type": "firecracker",
        "init-dockerd": "true",
    },
    shard_count = 2,
    tags = ["docker"],
    deps = [
        ":docker",
        "//enterprise/server/remote_execution/container",
        "//proto:remote_execution_go_proto",
        "//server/interfaces",
        "//server/testutil/testauth",
        "//server/testutil/testenv",
        "//server/testutil/testfs",
        "//server/util/status",
        "@com_github_docker_docker//client:go_default_library",
        "@com_github_stretchr_testify//assert",
        "@com_github_stretchr_testify//require",
    ],
)
