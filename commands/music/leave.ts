import { ICommand } from "wokcommands";
import * as musicFunctions from "../../modules/music/musicFunctions";

export default {
    name: 'Leave',
    category: "Music",
    description: "Leave the Voice Channel",
    slash: true,
    callback: ({ interaction }) => {
        musicFunctions.leave(interaction)
    },
} as ICommand