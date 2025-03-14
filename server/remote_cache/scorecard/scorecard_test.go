package scorecard_test

import (
	"context"
	"testing"
	"time"

	"github.com/buildbuddy-io/buildbuddy/server/interfaces"
	"github.com/buildbuddy-io/buildbuddy/server/remote_cache/scorecard"
	"github.com/buildbuddy-io/buildbuddy/server/testutil/testenv"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"google.golang.org/protobuf/encoding/prototext"
	"google.golang.org/protobuf/proto"
	"google.golang.org/protobuf/types/known/durationpb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
	"google.golang.org/protobuf/types/known/timestamppb"

	capb "github.com/buildbuddy-io/buildbuddy/proto/cache"
	repb "github.com/buildbuddy-io/buildbuddy/proto/remote_execution"
	statuspb "google.golang.org/genproto/googleapis/rpc/status"
	gcodes "google.golang.org/grpc/codes"
)

var (
	// Test data.

	besUpload = &capb.ScoreCard_Result{
		ActionId:    "bes-upload",
		Digest:      &repb.Digest{Hash: "aaa", SizeBytes: 1_000},
		CacheType:   capb.CacheType_CAS,
		RequestType: capb.RequestType_WRITE,
		Status:      &statuspb.Status{Code: int32(gcodes.OK)},
		StartTime:   timestamppb.New(time.Unix(100, 0)),
		Duration:    durationpb.New(300 * time.Millisecond),
	}
	acMiss = &capb.ScoreCard_Result{
		ActionId:       "abc",
		ActionMnemonic: "GoCompile",
		TargetId:       "//foo",
		Digest:         &repb.Digest{Hash: "abc", SizeBytes: 111},
		CacheType:      capb.CacheType_AC,
		RequestType:    capb.RequestType_READ,
		Status:         &statuspb.Status{Code: int32(gcodes.NotFound)},
		StartTime:      timestamppb.New(time.Unix(300, 0)),
		Duration:       durationpb.New(100 * time.Millisecond),
	}
	casUpload = &capb.ScoreCard_Result{
		ActionId:       "abc",
		ActionMnemonic: "GoCompile",
		TargetId:       "//foo",
		Digest:         &repb.Digest{Hash: "ccc", SizeBytes: 10_000},
		CacheType:      capb.CacheType_CAS,
		RequestType:    capb.RequestType_WRITE,
		Status:         &statuspb.Status{Code: int32(gcodes.OK)},
		StartTime:      timestamppb.New(time.Unix(200, 0)),
		Duration:       durationpb.New(200 * time.Millisecond),
	}
	casDownload = &capb.ScoreCard_Result{
		ActionId:       "edf",
		ActionMnemonic: "GoLink",
		TargetId:       "//bar",
		Digest:         &repb.Digest{Hash: "fff", SizeBytes: 100_000},
		CacheType:      capb.CacheType_CAS,
		RequestType:    capb.RequestType_READ,
		Status:         &statuspb.Status{Code: int32(gcodes.OK)},
		StartTime:      timestamppb.New(time.Unix(400, 0)),
		Duration:       durationpb.New(150 * time.Millisecond),
	}

	testScorecard = &capb.ScoreCard{
		Results: []*capb.ScoreCard_Result{
			// NOTE: keep the order here matching the above.
			besUpload,
			acMiss,
			casUpload,
			casDownload,
		},
	}
)

func TestGetCacheScoreCard_Filter_Search(t *testing.T) {
	ctx := context.Background()
	env := setupEnv(t)
	req := &capb.GetCacheScoreCardRequest{
		Filter: &capb.GetCacheScoreCardRequest_Filter{
			Mask:   &fieldmaskpb.FieldMask{Paths: []string{"search"}},
			Search: "bes-upload",
		},
	}

	res, err := scorecard.GetCacheScoreCard(ctx, env, req)
	require.NoError(t, err)

	assertResults(t, res, besUpload)
}

func TestGetCacheScoreCard_Filter_CacheType(t *testing.T) {
	ctx := context.Background()
	env := setupEnv(t)
	req := &capb.GetCacheScoreCardRequest{
		Filter: &capb.GetCacheScoreCardRequest_Filter{
			Mask:      &fieldmaskpb.FieldMask{Paths: []string{"cache_type"}},
			CacheType: capb.CacheType_AC,
		},
	}

	res, err := scorecard.GetCacheScoreCard(ctx, env, req)
	require.NoError(t, err)

	assertResults(t, res, acMiss)
}

func TestGetCacheScoreCard_Filter_RequestType(t *testing.T) {
	ctx := context.Background()
	env := setupEnv(t)
	req := &capb.GetCacheScoreCardRequest{
		Filter: &capb.GetCacheScoreCardRequest_Filter{
			Mask:        &fieldmaskpb.FieldMask{Paths: []string{"request_type"}},
			RequestType: capb.RequestType_READ,
		},
	}

	res, err := scorecard.GetCacheScoreCard(ctx, env, req)
	require.NoError(t, err)

	assertResults(t, res, acMiss, casDownload)
}

func TestGetCacheScoreCard_Filter_ResponseType(t *testing.T) {
	ctx := context.Background()
	env := setupEnv(t)
	req := &capb.GetCacheScoreCardRequest{
		Filter: &capb.GetCacheScoreCardRequest_Filter{
			Mask:         &fieldmaskpb.FieldMask{Paths: []string{"response_type"}},
			ResponseType: capb.ResponseType_NOT_FOUND,
		},
	}

	res, err := scorecard.GetCacheScoreCard(ctx, env, req)
	require.NoError(t, err)

	assertResults(t, res, acMiss)
}

func TestGetCacheScoreCard_Sort_StartTime(t *testing.T) {
	ctx := context.Background()
	env := setupEnv(t)
	req := &capb.GetCacheScoreCardRequest{
		OrderBy: capb.GetCacheScoreCardRequest_ORDER_BY_START_TIME,
	}

	res, err := scorecard.GetCacheScoreCard(ctx, env, req)
	require.NoError(t, err)

	assertResults(t, res, besUpload, casUpload, acMiss, casDownload)
}

func TestGetCacheScoreCard_Sort_Duration(t *testing.T) {
	ctx := context.Background()
	env := setupEnv(t)
	req := &capb.GetCacheScoreCardRequest{
		OrderBy: capb.GetCacheScoreCardRequest_ORDER_BY_DURATION,
	}

	res, err := scorecard.GetCacheScoreCard(ctx, env, req)
	require.NoError(t, err)

	assertResults(t, res, acMiss, casDownload, casUpload, besUpload)
}

func TestGetCacheScoreCard_GroupByActionOrderByDurationDesc(t *testing.T) {
	ctx := context.Background()
	env := setupEnv(t)
	req := &capb.GetCacheScoreCardRequest{
		OrderBy:       capb.GetCacheScoreCardRequest_ORDER_BY_DURATION,
		GroupByAction: true,
		Descending:    true,
	}

	res, err := scorecard.GetCacheScoreCard(ctx, env, req)
	require.NoError(t, err)

	assertResults(t, res, besUpload, casUpload, acMiss, casDownload)
}

func assertResults(t *testing.T, res *capb.GetCacheScoreCardResponse, msg ...*capb.ScoreCard_Result) {
	// Note: not asserting directly on the protos because the diff is too hard to read.
	t.Log("EXPECTED:")
	expected := &capb.GetCacheScoreCardResponse{Results: msg}
	t.Log(prototext.Format(expected))
	t.Log("ACTUAL:")
	t.Log(prototext.Format(res))

	assert.True(t, proto.Equal(expected, res), "unexpected response")
}

func setupEnv(t *testing.T) *testenv.TestEnv {
	te := testenv.GetTestEnv(t)
	te.SetBlobstore(&fakeBlobStore{})
	return te
}

type fakeBlobStore struct {
	interfaces.Blobstore
}

func (*fakeBlobStore) ReadBlob(ctx context.Context, name string) ([]byte, error) {
	return proto.Marshal(testScorecard)
}
