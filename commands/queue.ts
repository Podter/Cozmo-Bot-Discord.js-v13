import { ICommand } from "wokcommands";
import * as musicFunctions from "../modules/music/musicFunctions";

export default {
    name: 'Queue',
    category: "Music",
    description: "Display the current queue",
    slash: true,
    callback: async ({interaction}) => {
        await interaction.deferReply()
        await new Promise((resolve) => setTimeout(resolve, 1000))
        musicFunctions.queue(interaction)
    },
} as ICommand