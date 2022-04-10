import { ICommand } from "wokcommands";

export default {
    name: 'Ping',
    category: "Other",
    description: "Replies with Pong!",
    slash: true,
    cooldown: '5s',
    testOnly: true,
    callback: ({}) => {
        return 'Pong! 🏓'
    },
} as ICommand