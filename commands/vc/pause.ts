import { ICommand } from "wokcommands";
import * as musicFunctions from "../../modules/vc/vcFunctions";

export default {
    name: 'Pause',
    category: "Voice Channel",
    description: "Pause the track that is currently playing",
    slash: true,
    callback: ({interaction}) => {
        musicFunctions.pause(interaction)
    },
} as ICommand