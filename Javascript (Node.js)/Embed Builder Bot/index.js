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
