import { ICommand } from "wokcommands";
import * as musicFunctions from "../../modules/vc/vcFunctions";

export default {
    name: 'NowPlaying',
    category: "Voice Channel",
    description: "Display the current track playing",
    slash: true,
    callback: async ({interaction}) => {
        await interaction.deferReply()
        await new Promise((resolve) => setTimeout(resolve, 1000))
        musicFunctions.nowplaying(interaction)
    },
} as ICommand