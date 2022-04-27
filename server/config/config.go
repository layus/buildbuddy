package config

import (
	"flag"
	"fmt"
	"os"

	"github.com/buildbuddy-io/buildbuddy/server/util/flagutil"
	"gopkg.in/yaml.v2"

	"github.com/buildbuddy-io/buildbuddy/server/util/log"
)

var (
	configFile = flag.String("config_file", "/config.yaml", "The path to a buildbuddy config file")
)

func PopulateFlagsFromData(data []byte) error {
	// expand environment variables
	expandedData := []byte(os.ExpandEnv(string(data)))

	strictMap, err := flagutil.GenerateYAMLMapFromFlags()
	if err != nil {
		return err
	}

	// Unmarshal in strict mode once and warn about invalid fields.
	if err := yaml.UnmarshalStrict([]byte(expandedData), strictMap); err != nil {
		log.Warningf("Unknown fields in config: %s", err)
	}

	permissiveMap := make(map[interface{}]interface{})
	if err := yaml.Unmarshal([]byte(expandedData), permissiveMap); err != nil {
		return fmt.Errorf("Error parsing config file: %s", err)
	}

	return flagutil.PopulateFlagsFromYAMLMap(permissiveMap)
}

func PopulateFlagsFromFile() error {
	log.Infof("Reading buildbuddy config from '%s'", *configFile)

	_, err := os.Stat(*configFile)

	// If the file does not exist then skip it.
	if os.IsNotExist(err) {
		log.Warningf("No config file found at %s.", *configFile)
		return nil
	}

	fileBytes, err := os.ReadFile(*configFile)
	if err != nil {
		return fmt.Errorf("Error reading config file: %s", err)
	}

	return PopulateFlagsFromData(fileBytes)
}
