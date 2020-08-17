const readyEvent = require("./ready");
const messageEvent = require("./message");

const load = (client) => {
  client.on("ready", async () => readyEvent(client));
  client.on("message", messageEvent);
};

module.exports = {
  load,
};
