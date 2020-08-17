const run = ({ args }) => {
  switch (args[0]) {
    default:
      throw new Error(`user sub-command(${args[0]}) is not valid`);
    case "add":
      return "사용자 추가";
    case "rm":
      return "사용자 제거";
    case "list":
      return "사용자 목록";
    case "help":
      return "사용자 도움말";
  }
};

module.exports = {
  run,
  name: "user",
  aliases: ["사용자"],
  conf: {
    enabled: true,
    requireGroup: false,
  },
  help: {
    description: "사용자 관리 명령어.",
    usage: "user {add|rm|list|help}",
  },
};
