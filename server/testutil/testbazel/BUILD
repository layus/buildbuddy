load("@io_bazel_rules_go//go:def.bzl", "go_library")

go_library(
    name = "testbazel",
    testonly = 1,
    srcs = ["testbazel.go"],
    data = ["//server/util/bazel:bazel-5.0.0rc3_crossplatform"],
    importpath = "github.com/buildbuddy-io/buildbuddy/server/testutil/testbazel",
    visibility = ["//visibility:public"],
    deps = [
        "//server/testutil/testfs",
        "//server/util/bazel",
        "//server/util/log",
        "@com_github_stretchr_testify//require",
        "@io_bazel_rules_go//go/tools/bazel:go_default_library",
    ],
)
