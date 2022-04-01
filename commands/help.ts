import { ICommand } from "wokcommands";

export default {
    name: 'Help',
    category: "Help",
    description: "List all commands!",
    slash: true,
    callback: ({}) => {
        return "This is the help command!"
    },
} as ICommand