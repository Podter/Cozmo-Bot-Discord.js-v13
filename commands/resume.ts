import { ICommand } from "wokcommands";
import * as musicFunctions from "../modules/music/musicFunctions";

export default {
    name: 'Resume',
    category: "Music",
    description: "Resume the track that is currently playing",
    slash: true,
    callback: ({interaction}) => {
        musicFunctions.resume(interaction)
    },
} as ICommand