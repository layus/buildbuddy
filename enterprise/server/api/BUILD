load("@io_bazel_rules_go//go:def.bzl", "go_library", "go_test")

go_library(
    name = "api",
    srcs = ["api_server.go"],
    importpath = "github.com/buildbuddy-io/buildbuddy/enterprise/server/api",
    visibility = ["//visibility:public"],
    deps = [
        "//proto:build_event_stream_go_proto",
        "//proto:eventlog_go_proto",
        "//proto:invocation_go_proto",
        "//proto/api/v1:api_v1_go_proto",
        "//proto/api/v1:common_go_proto",
        "//server/build_event_protocol/build_event_handler",
        "//server/bytestream",
        "//server/environment",
        "//server/eventlog",
        "//server/http/protolet",
        "//server/interfaces",
        "//server/remote_cache/digest",
        "//server/tables",
        "//server/util/perms",
        "//server/util/query_builder",
        "//server/util/status",
        "//server/util/timeutil",
        "@org_golang_google_protobuf//types/known/durationpb",
        "@org_golang_google_protobuf//types/known/timestamppb",
    ],
)

go_test(
    name = "api_test",
    srcs = ["api_server_test.go"],
    embed = [":api"],
    deps = [
        "//proto:build_event_stream_go_proto",
        "//proto:build_events_go_proto",
        "//proto:publish_build_event_go_proto",
        "//proto/api/v1:api_v1_go_proto",
        "//server/build_event_protocol/build_event_handler",
        "//server/tables",
        "//server/testutil/testauth",
        "//server/testutil/testenv",
        "@com_github_google_uuid//:uuid",
        "@com_github_stretchr_testify//assert",
        "@com_github_stretchr_testify//require",
        "@org_golang_google_protobuf//types/known/anypb",
    ],
)
