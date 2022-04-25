package flags

import (
	"flag"
	"reflect"
	"strings"
	"testing"

	"github.com/buildbuddy-io/buildbuddy/server/config"
	"github.com/buildbuddy-io/buildbuddy/server/util/flagutil"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

// Set a flag value and register a cleanup function to restore the flag
// to its original value after the given test is complete.
func Set(t testing.TB, name string, value interface{}) {
	origValue, err := flagutil.DereferencedValueFromFlagName(name)
	require.NoError(t, err)
	err = flagutil.SetValueForFlagName(name, value, nil, false, true)
	require.NoError(t, err)

	t.Cleanup(func() {
		err = flagutil.SetValueForFlagName(name, origValue, nil, false, true)
		require.NoError(t, err)
	})
}

// CheckFlagsAgainstConfig checks that all defined flags containing a `.` are
// present in the config struct.
func CheckFlagsAgainstConfig(t *testing.T) {
	configurator, err := config.PopulateFlagsFromData([]byte{})
	require.NoError(t, err)
	yamlFlagSet := configurator.GenerateFlagSet()
	flag.VisitAll(func(flg *flag.Flag) {
		if strings.HasPrefix(flg.Name, "test.") || !strings.Contains(flg.Name, ".") {
			return
		}
		yamlFlg := yamlFlagSet.Lookup(flg.Name)
		assert.NotNil(t, yamlFlg, "Flag %s is not present in the yaml config", flg.Name)
		if yamlFlg == nil {
			return
		}
		assert.Equal(t, yamlFlg.Usage, flg.Usage, "Flag %s has usage: `%s`, but yaml docstring is `%s`", flg.Name, flg.Usage, yamlFlg.Usage)
		require.Equal(t, reflect.TypeOf(yamlFlg.Value).Kind(), reflect.TypeOf(flg.Value).Kind(), "Flag %s is of type %T, but yaml flag is of type %T", flg.Name, flg.Value, yamlFlg.Value)
		if reflect.TypeOf(yamlFlg.Value).Kind() == reflect.Slice || reflect.TypeOf(yamlFlg.Value).Kind() == reflect.Struct {
			assert.Equal(t, reflect.TypeOf(yamlFlg.Value), reflect.TypeOf(flg.Value), "Flag %s is of type %T, but yaml flag is of type %T", flg.Name, flg.Value, yamlFlg.Value)
		}
	})
}
