import { ICommand } from "wokcommands";

export default {
    name: 'Restart',
    category: "Other",
    description: "Restart the bot",
    slash: true,
    hidden: true,
    ownerOnly: true,
    testOnly: true,
    callback: async ({ interaction }) => {
        interaction.reply("https://cdn.discordapp.com/attachments/959692896720797736/959830380549144586/a_mimir.mp4")
        await new Promise((resolve) => setTimeout(resolve, 2000))
        process.exit(0)
    },
} as ICommand
