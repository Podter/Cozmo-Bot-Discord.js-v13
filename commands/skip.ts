import { ICommand } from "wokcommands";
import * as musicFunctions from "../modules/music/musicFunctions";

export default {
    name: 'Skip',
    category: "Music",
    description: "Skip the track that is currently playing",
    slash: true,
    callback: ({interaction}) => {
        musicFunctions.skip(interaction)
    },
} as ICommand