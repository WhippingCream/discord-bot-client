const client = require("../client");

const scope = "/v2/groups";

module.exports.getGroupByDiscordGuildId = async (id) => {
  try {
    const result = await client({
      method: "GET",
      path: `${scope}/discord-guild-id/${id}`,
    });

    return result;
  } catch (e) {
    throw new Error(`그룹(discordGuildId:${id}) 정보 요청에 실패하였습니다.`);
  }
};
