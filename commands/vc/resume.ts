import { ICommand } from "wokcommands";
import * as musicFunctions from "../../modules/vc/vcFunctions";

export default {
    name: 'Resume',
    category: "Voice Channel",
    description: "Resume the track that is currently playing",
    slash: true,
    callback: ({interaction}) => {
        musicFunctions.resume(interaction)
    },
} as ICommand