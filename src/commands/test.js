module.exports = {
  run: () => `테스트`,
  name: "test",
  aliases: ["테스트"],
  conf: {
    enabled: true,
    requireGroup: false,
  },
  help: {
    description: "기능테스트 디버그용.",
    usage: "test [args]",
  },
};
