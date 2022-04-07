import { ICommand } from "wokcommands";
import * as musicFunctions from "../../modules/vc/vcFunctions";

export default {
    name: 'Leave',
    category: "Voice Channel",
    description: "Leave the Voice Channel",
    slash: true,
    callback: ({ interaction }) => {
        musicFunctions.leave(interaction)
    },
} as ICommand