const { logger } = require("../logger");

const { run } = require("../commands");

const {
  command: { prefix },
} = require("../config");

module.exports = async (message) => {
  // filter msg from bot
  if (message.author.bot) {
    return;
  }

  // filter not started prefix
  if (!message.content.startsWith(prefix)) {
    return;
  }

  try {
    const output = await run(message);
    if (output) {
      message.channel.send(output);
    }
  } catch (e) {
    logger.error(e);
    return `[Error] ${cmd.help.name} ${e}`;
  }
};
