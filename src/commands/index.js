const { logger } = require("../logger");

const groupsCmd = require("./groups");
const usersCmd = require("./users");
const echoCmd = require("./echo");
const versionCmd = require("./version");
const testCmd = require("./test");

const { getGroupByDiscordGuildId } = require("../apis/groups");

const {
  command: { prefix },
} = require("../config");

const commandSet = {};

const regist = ({ run, name, aliases, conf, help }) => {
  const commandObject = {
    run,
    conf,
    help,
  };

  [name, ...aliases].forEach((command) => {
    if (commandSet[command]) {
      throw new Error(`Command(${command}) is duplicated.`);
    }
    commandSet[command] = commandObject;
  });
};

const parse = (content) => {
  const tokens = content.split(" ");
  const command = tokens[0].slice(prefix.length);

  if (!commandSet[command]) {
    return null;
  }

  return {
    command,
    args: tokens.slice(1),
  };
};

const execute = async ({ command, args }, { guildId }) => {
  const { run, conf, help } = commandSet[command];

  if (!conf.enabled) {
    throw new Error(`비활성화된 명령어(${command}) 입니다.`);
  }

  let group = null;

  if (conf.requireGroup) {
    try {
      group = await getGroupByDiscordGuildId(guildId);
    } catch (e) {
      return {
        result: false,
        replyMessage: "방 등록을 해주세요. 사용법: /방등록 그룹이름",
      };
    }
  }

  try {
    const replyMessage = await run({ args, group });
    return { result: true, replyMessage };
  } catch (e) {
    logger.error(e.message);
    return {
      result: false,
      replyMessage: `사용법: \`${help.usage}\`\n\t${help.description}`,
    };
  }
};

module.exports.load = () => {
  regist(usersCmd);
  regist(groupsCmd);
  regist(testCmd);
  regist(versionCmd);
  regist(echoCmd);
};

module.exports.run = (content, { guildId, channelId }) => {
  const parsed = parse(content);
  const reply = parsed ? execute(parsed, { guildId, channelId }) : null;
  return reply;
};
