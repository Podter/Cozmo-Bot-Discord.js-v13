import { Intents } from "discord.js";
const Discord = require("discord.js");
import WOKCommands from "wokcommands"
import path from "path"
import benDb from './modules/ben/schema'
import benMessages from './modules/ben/list'
import dotenv from "dotenv"
dotenv.config()

const client = new Discord.Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MEMBERS]
});

client.on("ready", async () => {
    new WOKCommands(client, {
        commandsDir: path.join(__dirname, "commands"),
        typeScript: false,
        disabledDefaultCommands: [
            'help',
            'command',
            'language',
            'prefix',
            'requiredrole',
            'slash',
            'channelonly'
        ],
        botOwners: ["331793642689789962"],
        testServers: ["886859636148408382"],
        mongoUri: process.env.MONGO_URI,
        dbOptions: {
            keepAlive: true,
        }
    })
    .setCategorySettings([
        {
            name: 'Music',
            emoji: '🎶'
        },
        {
            name: 'Other',
            emoji: '👀'
        },
        {
            name: 'Help',
            emoji: '💡'
        },
        {
            name: 'Fun',
            emoji: '😂'
        },
    ])
    client.user.setPresence({ activities: [{ name: 'music | Type /help', type: "LISTENING" }], status: 'idle' });
    console.log("Bot is Ready!")
})

client.on('messageCreate', async (message: any) => {
    if (await benDb.findOne({ guildId: message.guild?.id, channelId: message.channel?.id })) {
        if (message.author.bot || message.author.id === client.user.id) return;
        const benMessageText = benMessages.messages[Math.floor(Math.random() * benMessages.messages.length)]
        message.reply(`**🐶 Ben:** ${benMessageText}`)
    }
})

client.login(process.env.TOKEN);
