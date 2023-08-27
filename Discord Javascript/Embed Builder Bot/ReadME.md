# Here's an example of a Discord bot using the discord.js library in JavaScript that can create and send embed messages:
```js
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();

client.once('ready', () => {
    console.log('Embed Builder bot is online!');
});

client.on('message', (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'embed') {
        const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Example Embed')
            .setURL('https://discord.js.org/')
            .setDescription('This is an example embed message')
            .addField('Field 1', 'Some value 1', true)
            .addField('Field 2', 'Some value 2', true)
            .addField('Field 3', 'Some value 3')
            .setImage('https://i.imgur.com/AfFp7pu.png')
            .setTimestamp()
            .setFooter('Embed Builder bot');

        message.channel.send(embed);
    }
});

client.login(token);
```
# To set up the bot, follow these steps:
1. Install the required packages by running the following command in your project directory:
```npm install discord.js```
2. Create a new file named config.json in your project directory and add the following content:
```js
{
    "prefix": "!", // Customize the prefix as per your preference
    "token": "YOUR_DISCORD_BOT_TOKEN"
}
```
3. Replace "YOUR_DISCORD_BOT_TOKEN" in the config.json file with your actual Discord bot token. You can obtain a token by creating a new bot on the Discord Developer Portal.
4. Save the code provided above in a file named index.js in your project directory.
5. Run the bot using the following command:
```node index.js```

Your Embed Builder Discord Bot should now be online and ready to use. You can invite it to your Discord server and use the command !embed to send an example embed message in the channel where the command is used. Feel free to modify the embed message content, fields, colors, images, and other properties to suit your needs. You can refer to the Discord.js documentation for more information on the available options and customization possibilities for embed messages.
