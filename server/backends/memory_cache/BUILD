load("@io_bazel_rules_go//go:def.bzl", "go_library", "go_test")

go_library(
    name = "memory_cache",
    srcs = ["memory_cache.go"],
    importpath = "github.com/buildbuddy-io/buildbuddy/server/backends/memory_cache",
    visibility = ["//visibility:public"],
    deps = [
        "//proto:remote_execution_go_proto",
        "//server/cache/config",
        "//server/environment",
        "//server/interfaces",
        "//server/remote_cache/digest",
        "//server/util/log",
        "//server/util/lru",
        "//server/util/prefix",
        "//server/util/status",
    ],
)

go_test(
    name = "memory_cache_test",
    srcs = ["memory_cache_test.go"],
    deps = [
        ":memory_cache",
        "//proto:remote_execution_go_proto",
        "//server/interfaces",
        "//server/remote_cache/digest",
        "//server/testutil/testauth",
        "//server/testutil/testdigest",
        "//server/testutil/testenv",
        "//server/util/prefix",
        "//server/util/testing/flags",
    ],
)
