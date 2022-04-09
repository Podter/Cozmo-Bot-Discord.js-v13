import { ICommand } from "wokcommands";

export default {
    name: 'Help',
    category: "Other",
    description: "List all commands!",
    slash: true,
    cooldown: '5s',
    callback: ({}) => {
        return 'This is the help command!';
    },
} as ICommand