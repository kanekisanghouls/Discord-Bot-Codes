//Requirements
//Node.js
//Discord.js

//Step 1: Create a new folder for your project
//Step 2: Create a package.json file in the project folder

const fs = require('fs');
fs.writeFileSync('package.json', JSON.stringify({
    "name": "my-discord-bot",
    "version": "1.0.0",
    "description": "My Discord Bot",
    "main": "index.js",
    "scripts": {
        "start": "node index.js"
    },
    "dependencies": {
        "discord.js": "^11.5.1"
    }
}));

//Step 3: Install Discord.js
//Run the following command in the project folder:

npm install discord.js

//Step 4: Create an index.js file in the project folder

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('Pong!');
    }
});

client.login('YOUR_BOT_TOKEN_HERE');

//Step 5: Run your bot
//Run the following command in the project folder:

npm start
