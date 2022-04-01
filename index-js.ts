// The different between this and index.ts is line 18

import { Intents } from "discord.js";
const Discord = require("discord.js");
import WOKCommands from "wokcommands"
import path from "path"
import dotenv from "dotenv"
dotenv.config()

const client = new Discord.Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MEMBERS]
});

client.on("ready", () => {
    console.log("Bot is Ready!")
    new WOKCommands(client, {
        commandsDir: path.join(__dirname, "commands"),
        typeScript: false, // here!
        disabledDefaultCommands: [
            'help',
            'command',
            'language',
            'prefix',
            'requiredrole',
            'channelOnly',
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
    ])
    client.user.setPresence({ activities: [{ name: 'music | Type /help', type: "LISTENING" }], status: 'idle' });
})

client.login(process.env.TOKEN);
