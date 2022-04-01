import { ICommand } from "wokcommands";
import * as musicFunctions from "../../modules/music/musicFunctions";

export default {
    name: 'Pause',
    category: "Music",
    description: "Pause the track that is currently playing",
    slash: true,
    callback: ({interaction}) => {
        musicFunctions.pause(interaction)
    },
} as ICommand