const run = ({ args }) => {
  switch (args[0]) {
    default:
      throw new Error(`group sub-command(${args[0]}) is not valid`);
    case "add":
      return "그룹 추가";
    case "rm":
      return "그룹 제거";
    case "list":
      return "그룹 목록";
    case "help":
      return "그룹 도움말";
  }
};

module.exports = {
  run,
  name: "group",
  aliases: ["그룹"],
  conf: {
    enabled: true,
    requireGroup: false,
  },
  help: {
    description: "그룹 관리 명령어.",
    usage: "group {add|rm|list|help}",
  },
};
