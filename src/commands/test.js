const { getGroupByDiscordGuildId } = require("../apis/groups");

module.exports = {
  run: async () => await getGroupByDiscordGuildId("635802085601968158"),
  name: "test",
  aliases: ["테스트"],
  conf: {
    enabled: true,
    requireGroup: true,
  },
  help: {
    description: "기능테스트 디버그용.",
    usage: "test [args]",
  },
};
