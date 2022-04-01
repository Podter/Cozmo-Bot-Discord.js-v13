import { ICommand } from "wokcommands";
import * as musicFunctions from "../modules/music/musicFunctions";

export default {
    name: 'NowPlaying',
    category: "Music",
    description: "Display the current song that is playing",
    slash: true,
    callback: async ({interaction}) => {
        await interaction.deferReply()
        await new Promise((resolve) => setTimeout(resolve, 1000))
        musicFunctions.nowplaying(interaction)
    },
} as ICommand