// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = require("dotenv").config();

if (!envFound) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

module.exports = {
  discord: {
    botToken: process.env.BOT_TOKEN,
  },
  command: {
    prefix: process.env.COMMAND_PREFIX || "/",
  },
  api: {
    server: "https://camille.locodo.co/api",
  },
  logs: {
    level: process.env.LOG_LEVEL || "silly",
  },
};
