import devConfig from "../config/development";
import prodConfig from "../config/production";
import testConfig from "../config/test";

const configs = {
  development: devConfig,
  production: prodConfig,
  test: testConfig,
} as any;

const environment = process.env.NODE_ENV || "development";

export const config = configs[environment];
