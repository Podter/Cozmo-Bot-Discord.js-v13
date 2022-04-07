import { ICommand } from "wokcommands";
import * as musicFunctions from "../../modules/vc/vcFunctions";

export default {
    name: 'Skip',
    category: "Voice Channel",
    description: "Skip the track that is currently playing",
    slash: true,
    callback: ({interaction}) => {
        musicFunctions.skip(interaction)
    },
} as ICommand