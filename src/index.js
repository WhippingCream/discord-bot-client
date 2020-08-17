const Discord = require("discord.js");
const events = require("./events");
const commands = require("./commands");

const client = new Discord.Client();

events.load(client);
commands.load();

client.login(process.env.BOT_TOKEN);
