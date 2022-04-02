import { ICommand } from "wokcommands";

export default {
    name: 'Restart',
    category: "Other",
    description: "Restart the bot",
    slash: true,
    hidden: true,
    ownerOnly: true,
    testOnly: true,
    callback: ({ interaction }) => {
        interaction.reply("https://cdn.discordapp.com/attachments/959692896720797736/959830380549144586/a_mimir.mp4")
        process.exit(0)
    },
} as ICommand
