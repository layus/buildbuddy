load("@io_bazel_rules_go//go:def.bzl", "go_library")

go_library(
    name = "operation",
    srcs = ["operation.go"],
    importpath = "github.com/buildbuddy-io/buildbuddy/enterprise/server/remote_execution/operation",
    visibility = ["//visibility:public"],
    deps = [
        "//proto:execution_stats_go_proto",
        "//proto:remote_execution_go_proto",
        "//server/remote_cache/digest",
        "//server/util/log",
        "//server/util/status",
        "@go_googleapis//google/longrunning:longrunning_go_proto",
        "@org_golang_google_grpc//status",
        "@org_golang_google_protobuf//proto",
        "@org_golang_google_protobuf//types/known/anypb",
    ],
)
