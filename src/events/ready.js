const { logger } = require("../logger");

module.exports = (client) => {
  logger.info(`Logged in as ${client.user.tag}!`);
};
