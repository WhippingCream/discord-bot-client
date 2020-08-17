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

module.exports.load = () => {
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

const execute = async ({ command, args }) => {
  const { run, conf, help } = commandSet[command];

  if (!conf.enabled) {
    throw new Error(`비활성화된 명령어(${command}) 입니다.`);
  }

  let groupName;
  // if (conf.requireGroup) {
  //   // message.guild.id
  //   const group = await getGroupByDiscordGuildId("635802085601968158");

  //   groupName = group ? group.groupName : '';

  //   if (groupName === "") {
  //     throw new Error("[Error] 방 등록을 해주세요. 사용법: /방등록 그룹이름");
  //   }
  // }

  try {
    const result = await run({ args, groupName });
    return result;
  } catch (e) {
    console.log("2");
    return `${e.message}\n사용법: \`${help.usage}\`\n\t${help.description}`;
  }
};

module.exports.run = (message) => {
  const parsed = parse(message);
  const reply = parsed ? execute(parsed) : null;
  return reply;
};
