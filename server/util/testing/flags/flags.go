package flags

import (
	"flag"
	"sync"
	"testing"

	"github.com/buildbuddy-io/buildbuddy/server/config"
	"github.com/buildbuddy-io/buildbuddy/server/util/flagutil"
	"github.com/buildbuddy-io/buildbuddy/server/util/log"
	"github.com/buildbuddy-io/buildbuddy/server/util/status"
	"github.com/stretchr/testify/require"
)

var populateFlagsOnce sync.Once

func PopulateFlagsFromData(t testing.TB, testConfigData []byte) {
	populateFlagsOnce.Do(func() {
		// add placeholder type for type adding by testing
		flagutil.AddTestFlagTypeForTesting(flag.Lookup("test.benchtime").Value, struct{}{})
		c, err := config.NewConfiguratorFromData(testConfigData)
		c.ReconcileFlagsAndConfig()
		require.NoError(t, err)
	})
}

// Set a flag value and register a cleanup function to restore the flag
// to its original value after the given test is complete.
func Set(t testing.TB, name string, value interface{}) {
	origValue, err := flagutil.DereferencedValueFromFlagName(name)
	if status.IsNotFoundError(err) {
		log.Warningf("Attempted to set %s to %v, but %s was not found.", name, value, name)
		return
	}
	require.NoError(t, err)
	err = flagutil.SetValueForFlagName(name, value, nil, false, true)
	require.NoError(t, err)

	t.Cleanup(func() {
		err = flagutil.SetValueForFlagName(name, origValue, nil, false, true)
		require.NoError(t, err)
	})
}
