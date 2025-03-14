package role_filter

import (
	"context"

	"github.com/buildbuddy-io/buildbuddy/server/environment"
	"github.com/buildbuddy-io/buildbuddy/server/util/authutil"
	"github.com/buildbuddy-io/buildbuddy/server/util/perms"
	"github.com/buildbuddy-io/buildbuddy/server/util/role"
	"github.com/buildbuddy-io/buildbuddy/server/util/status"
)

const (
	globalAdminGroupID = "admin"
)

var (
	// RoleIndependentRPCs do not require a particular group role for auth. They
	// may rely on other forms of authorization if appropriate.
	RoleIndependentRPCs = []string{
		// RPCs that happen pre-login and don't require group membership.
		"GetUser",
		"GetImpersonatedUser",
		"CreateUser",
		"GetGroup",
		// Invocations can be shared publicly, so authorization for these RPCs is
		// done purely using perms bits attached to each row.
		"GetInvocation",
		"GetEventLogChunk",
		"GetCacheScoreCard",
		"GetTarget",
		"GetExecution",
		// Users do not need any particular role within their current group to be
		// able to create another group or request to join an existing group.
		"CreateGroup",
		"JoinGroup",
		// Anonymous users can see the Bazel config required to use BuildBuddy, so
		// don't require a group role.
		"GetBazelConfig",
		// API calls are role independent
		// TODO(bduffany): prefix all of these with the service name,
		// since API methods and BuildBuddyService methods may be the same.
		"GetInvocation",
		"GetLog",
		"GetTarget",
		"GetAction",
		"GetFile",
	}

	// DeveloperRPCs can be called only by developers or admins of the selected
	// group.
	GroupDeveloperRPCs = []string{
		// Invocation history and historical data for the org
		"SearchInvocation",
		"GetInvocationStat",
		"GetTrend",
		// Per-invocation actions
		"UpdateInvocation",
		"DeleteInvocation",
		"ExecuteWorkflow",
		// Setup
		"GetApiKeys",
		// Remote Bazel
		"Run",
	}

	// AdminOnlyRPCs can only be called by admins of the selected group.
	GroupAdminOnlyRPCs = []string{
		// Org details management
		"UpdateGroup",
		// Org members management
		"GetGroupUsers",
		"UpdateGroupUsers",
		// Org GitHub account link management
		"UnlinkGitHubAccount",
		// API key management
		"CreateApiKey",
		"UpdateApiKey",
		"DeleteApiKey",
		// Workflow management
		"CreateWorkflow",
		"DeleteWorkflow",
		"GetWorkflows",
		"GetRepos",
		// RBE deployment view
		"GetExecutionNodes",
		// BuildBuddy usage data
		"GetUsage",
	}

	// ServerAdminOnlyRPCs can only be called by server admins. It is different
	// from AdminOnlyRPCs in that it requires the authenticated user to be an
	// admin of the configured server-admin group, and not just an admin of
	// their authenticated group.
	ServerAdminOnlyRPCs = []string{
		"GetInvocationOwner",
	}
)

// AuthorizeRPC applies a coarse-grained authorization check on an RPC to ensure
// that the user has the appropriate role within their org to call the RPC.
//
// If the RPC accesses any specific resources within the org, further
// authorization checks may be needed beyond this coarse-grained filter.
func AuthorizeRPC(ctx context.Context, env environment.Env, rpcName string) error {
	if stringSliceContains(RoleIndependentRPCs, rpcName) {
		return nil
	}

	u, err := perms.AuthenticatedUser(ctx, env)
	if err != nil {
		return err
	}

	if stringSliceContains(u.GetAllowedGroups(), globalAdminGroupID) {
		return nil
	}

	serverAdminGID := env.GetAuthenticator().AdminGroupID()
	if serverAdminGID != "" && stringSliceContains(ServerAdminOnlyRPCs, rpcName) {
		for _, m := range u.GetGroupMemberships() {
			if m.GroupID == serverAdminGID && m.Role == role.Admin {
				return nil
			}
		}
		return status.PermissionDeniedError("Permission denied.")
	}

	groupID := u.GetGroupID()
	if groupID == "" {
		return status.UnauthenticatedError("Could not determine authenticated group ID from request")
	}

	allowedRoles := role.Admin | role.Developer
	if stringSliceContains(GroupAdminOnlyRPCs, rpcName) {
		allowedRoles = role.Admin
	}

	return authutil.AuthorizeGroupRole(u, groupID, allowedRoles)
}

func stringSliceContains(slice []string, val string) bool {
	for _, v := range slice {
		if val == v {
			return true
		}
	}
	return false
}
