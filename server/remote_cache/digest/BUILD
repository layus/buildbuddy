load("@io_bazel_rules_go//go:def.bzl", "go_library", "go_test")

go_library(
    name = "digest",
    srcs = ["digest.go"],
    importpath = "github.com/buildbuddy-io/buildbuddy/server/remote_cache/digest",
    visibility = ["//visibility:public"],
    deps = [
        "//proto:remote_execution_go_proto",
        "//server/util/status",
        "@com_github_google_uuid//:uuid",
        "@go_googleapis//google/rpc:errdetails_go_proto",
        "@org_golang_google_grpc//codes",
        "@org_golang_google_grpc//metadata",
        "@org_golang_google_grpc//status",
        "@org_golang_google_protobuf//proto",
    ],
)

go_test(
    name = "digest_test",
    srcs = ["digest_test.go"],
    embed = [":digest"],
    deps = [
        "//proto:remote_execution_go_proto",
        "//server/util/status",
        "@org_golang_google_grpc//status",
    ],
)
