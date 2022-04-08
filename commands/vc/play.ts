import { ICommand } from "wokcommands";

export default {
    name: 'Play',
    category: "Voice Channel",
    description: "Add a song to the queue",
    expectedArgs: '[song]',
    minArgs: 1,
    slash: true,
    callback: async ({}) => {
        return "soon"
    },
} as ICommand