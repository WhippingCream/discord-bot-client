const { version: appVersion } = require("../../package.json");

module.exports = {
  run: () => `v${appVersion}`,
  name: "version",
  aliases: ["v", "버전", "버젼"],
  conf: {
    enabled: true,
    requireGroup: false,
  },
  help: {
    description: "version info",
    usage: "version",
  },
};
