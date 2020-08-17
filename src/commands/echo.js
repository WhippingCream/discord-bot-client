module.exports = {
  run: ({ args }) => args.join(" "),
  name: "echo",
  aliases: ["에코"],
  conf: {
    enabled: true,
    requireGroup: false,
  },
  help: {
    description: "echo.",
    usage: "echo [command]",
  },
};
