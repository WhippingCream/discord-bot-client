const { run } = require("../commands");

const {
  command: { prefix },
} = require("../config");

module.exports = async (message) => {
  const { content, author, channel } = message;

  const {
    id: channelId,
    guild: { id: guildId },
  } = channel;

  // filter msg from bot
  if (author.bot) {
    return;
  }

  // filter not started prefix
  if (!content.startsWith(prefix)) {
    return;
  }

  const { result, replyMessage } = await run(content, { channelId, guildId });

  if (result) {
    message.react("🐾");
  } else {
    message.react("🙀");
  }

  if (replyMessage) {
    channel.send(replyMessage);
  }
};
