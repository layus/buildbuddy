package environment

import (
	"io/fs"
	"net/url"

	"github.com/go-redis/redis/v8"

	"github.com/buildbuddy-io/buildbuddy/server/config"
	"github.com/buildbuddy-io/buildbuddy/server/interfaces"

	pepb "github.com/buildbuddy-io/buildbuddy/proto/publish_build_event"
	repb "github.com/buildbuddy-io/buildbuddy/proto/remote_execution"
	scpb "github.com/buildbuddy-io/buildbuddy/proto/scheduler"
	bspb "google.golang.org/genproto/googleapis/bytestream"
)

// The environment struct allows for easily injecting many of buildbuddy's core
// dependencies without enumerating them.
//
// Rather than requiring a handler to have a signature like this:
//  - func NewXHandler(a interfaces.A, b interfaces.B, c interfaces.C) *Handler {}
// you can instead have a handler like this:
//   - func NewXHandler(env *environment.Env) *Handler {}
//
// Code that accepts an environment for dependency injection is required to
// gracefully handle missing *optional* dependencies.
//
// Do not put anything in the environment that would not be broadly useful
// across handlers.

type Env interface {
	// The following dependencies are required.
	GetConfigurator() *config.Configurator

	// Optional dependencies below here. For example: enterprise-only things,
	// or services that may not always be configured, like webhooks.
	GetDBHandle() interfaces.DBHandle
	// GetStaticFilesystem returns the FS that is used to serve from the /static
	// directory.
	GetStaticFilesystem() fs.FS
	// GetAppFilesystem returns the FS used to serve JS and CSS resources needed
	// by the app, including the app bundle and any lazily loaded JS chunks.
	GetAppFilesystem() fs.FS
	GetBlobstore() interfaces.Blobstore
	GetInvocationDB() interfaces.InvocationDB
	GetHealthChecker() interfaces.HealthChecker
	GetAuthenticator() interfaces.Authenticator
	SetAuthenticator(a interfaces.Authenticator)
	GetWebhooks() []interfaces.Webhook
	GetBuildEventHandler() interfaces.BuildEventHandler
	GetBuildEventProxyClients() []pepb.PublishBuildEventClient
	GetCache() interfaces.Cache
	GetUserDB() interfaces.UserDB
	GetAuthDB() interfaces.AuthDB
	GetInvocationStatService() interfaces.InvocationStatService
	GetExecutionService() interfaces.ExecutionService
	GetInvocationSearchService() interfaces.InvocationSearchService
	GetSplashPrinter() interfaces.SplashPrinter
	GetActionCacheClient() repb.ActionCacheClient
	GetByteStreamClient() bspb.ByteStreamClient
	GetSchedulerClient() scpb.SchedulerClient
	GetRemoteExecutionClient() repb.ExecutionClient
	GetContentAddressableStorageClient() repb.ContentAddressableStorageClient
	GetAPIService() interfaces.ApiService
	GetFileCache() interfaces.FileCache
	GetRemoteExecutionService() interfaces.RemoteExecutionService
	GetSchedulerService() interfaces.SchedulerService
	GetTaskRouter() interfaces.TaskRouter
	GetCacheRedisClient() redis.UniversalClient
	GetDefaultRedisClient() redis.UniversalClient
	GetRemoteExecutionRedisClient() redis.UniversalClient
	GetRemoteExecutionRedisPubSubClient() redis.UniversalClient
	GetMetricsCollector() interfaces.MetricsCollector
	GetKeyValStore() interfaces.KeyValStore
	GetRepoDownloader() interfaces.RepoDownloader
	GetWorkflowService() interfaces.WorkflowService
	GetRunnerService() interfaces.RunnerService
	GetGitProviders() interfaces.GitProviders
	GetUsageService() interfaces.UsageService
	GetUsageTracker() interfaces.UsageTracker
	GetXcodeLocator() interfaces.XcodeLocator
	// GetFileResolver returns an FS that can be used to read server-side
	// resources that aren't intended to be directly served to end users. It first
	// consults the bundle and falls back to runfiles.
	//
	// See server/util/fileresolver/fileresolver.go
	GetFileResolver() fs.FS
	GetSelfAuthURL() *url.URL
	GetMux() interfaces.HttpServeMux
}
