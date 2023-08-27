
const { Collection, Client, Discord } = require('discord.js');
const client = new Client({
  disableEveryone: true
})
const path = require('path')
const fs = require('fs')
module.exports = client;
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync(path.resolve('src/commands'));
["command"].forEach(handler => {
  require(path.resolve(`src/handlers/${handler}`))(client);
});

client.login("YOUR BOT TOKEN");
