# Here's a simple example of a Music Discord Bot using the discord.js library in JavaScript:
```js
const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
const queue = new Map();

client.once('ready', () => {
    console.log('Music bot is online!');
});

client.once('disconnect', () => {
    console.log('Music bot is disconnected!');
});

client.on('message', async (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();

    if (command === 'play') {
        execute(message, args);
    } else if (command === 'skip') {
        skip(message);
    } else if (command === 'stop') {
        stop(message);
    }
});

async function execute(message, args) {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
        return message.channel.send(
            'You need to be in a voice channel to play music!'
        );
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
        return message.channel.send(
            'I need the permissions to join and speak in your voice channel!'
        );
    }

    const songInfo = await ytdl.getInfo(args[0]);
    const song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
    };

    let serverQueue = queue.get(message.guild.id);

    if (!serverQueue) {
        const queueConstruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true,
        };

        queue.set(message.guild.id, queueConstruct);
        queueConstruct.songs.push(song);

        try {
            const connection = await voiceChannel.join();
            queueConstruct.connection = connection;
            play(message.guild, queueConstruct.songs[0]);
        } catch (err) {
            console.log(err);
            queue.delete(message.guild.id);
            return message.channel.send(err);
        }
    } else {
        serverQueue.songs.push(song);
        return message.channel.send(
            `${song.title} has been added to the queue!`
        );
    }
}

function skip(message) {
    const serverQueue = queue.get(message.guild.id);
    if (!message.member.voice.channel)
        return message.channel.send(
            'You have to be in a voice channel to skip the music!'
        );
    if (!serverQueue)
        return message.channel.send('There is no song that I could skip!');
    serverQueue.connection.dispatcher.end();
}

function stop(message) {
    const serverQueue = queue.get(message.guild.id);
    if (!message.member.voice.channel)
        return message.channel.send(
            'You have to be in a voice channel to stop the music!'
        );
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
    const serverQueue = queue.get(guild.id);
    if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }
    const dispatcher = serverQueue.connection
        .play(ytdl(song.url))
        .on('finish', () => {
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);
        })
        .on('error', (error) => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    serverQueue.textChannel.send(`Now playing: **${song.title}**`);
}

client.login(token);
```

# To set up the bot, you'll need to follow these steps:
1. Install the required packages by running the following command in your project directory:
```npm install discord.js ytdl-core```
2. Create a new file named config.json in your project directory and add the following content:
```js
{
    "prefix": "!", // Customize the prefix as per your preference
    "token": "YOUR_DISCORD_BOT_TOKEN"
}
```
3. Replace "YOUR_DISCORD_BOT_TOKEN" in the config.json file with your actual Discord bot token. You can obtain a token by creating a new bot on the Discord Developer Portal.
4.Save the code provided above in a file named index.js in your project directory.
5. Run the bot using the following command:
```node index.js```

Your Music Discord Bot should now be online and ready to use. You can invite it to your Discord server and use commands like !play <YouTube URL> to play music in a voice channel, !skip to skip the current song, and !stop to stop the music and make the bot leave the voice channel. Remember to replace ! with your desired prefix if you customized it in the config.json file.

Please note that this is a basic example and can be further expanded and customized according to your requirements.
