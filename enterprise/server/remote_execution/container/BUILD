load("@io_bazel_rules_go//go:def.bzl", "go_library", "go_test")

go_library(
    name = "container",
    srcs = ["container.go"],
    importpath = "github.com/buildbuddy-io/buildbuddy/enterprise/server/remote_execution/container",
    visibility = ["//visibility:public"],
    deps = [
        "//enterprise/server/remote_execution/platform",
        "//proto:remote_execution_go_proto",
        "//server/config",
        "//server/environment",
        "//server/interfaces",
        "//server/util/flagutil",
        "//server/util/log",
        "//server/util/perms",
        "//server/util/status",
        "//server/util/tracing",
        "@com_github_docker_distribution//reference",
        "@io_opentelemetry_go_otel//attribute",
        "@io_opentelemetry_go_otel_trace//:trace",
    ],
)

go_test(
    name = "container_test",
    srcs = ["container_test.go"],
    deps = [
        ":container",
        "//enterprise/server/remote_execution/platform",
        "//proto:remote_execution_go_proto",
        "//server/config",
        "//server/interfaces",
        "//server/testutil/testauth",
        "//server/testutil/testenv",
        "//server/util/status",
        "//server/util/testing/flags",
        "@com_github_stretchr_testify//assert",
        "@com_github_stretchr_testify//require",
    ],
)
