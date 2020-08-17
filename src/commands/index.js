const echoCmd = require("./echo");
const versionCmd = require("./version");
const testCmd = require("./test");

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

const load = () => {
  regist(testCmd);
  regist(versionCmd);
  regist(echoCmd);
};

const parse = (message) => {
  const tokens = message.content.split(" ");
  const command = tokens[0].slice(prefix.length);

  if (!commandSet[command]) {
    return null;
  }

  return {
    command,
    args: tokens.slice(1),
  };
};

const execute = ({ command, args }) => {
  const { run, conf, help } = commandSet[command];

  if (!conf.enabled) {
    throw new Error(`비활성화된 명령어(${command}) 입니다.`);
  }

  let groupName;
  if (conf.requireGroup) {
    // const group = await models.group.findOne({
    //   where: { discordGuildId: message.guild.id },
    // });
    // groupName = group ? group.groupName : '';

    groupName = "test";

    if (groupName === "") {
      throw new Error("[Error] 방 등록을 해주세요. 사용법: /방등록 그룹이름");
    }
  }

  try {
    return run({ args, groupName });
  } catch (e) {
    return `${help.usage}\n\t${help.discription}\n\t${e}`;
  }
};

const run = (message) => {
  const parsed = parse(message);

  return parsed ? execute(parsed) : null;
};

module.exports = {
  load,
  run,
};
