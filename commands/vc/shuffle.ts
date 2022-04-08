import { ICommand } from "wokcommands";
import * as index from "../../index"

export default {
    name: 'Shuffle',
    category: "Voice Channel",
    description: "Shuffles the queue",
    slash: true,
    callback: async ({ guild }) => {
        const guildId: any = guild?.id
        const queue = index.player.getQueue(guildId)
        if (!queue) return "There are no songs in the queue 🤷‍♂️"

        queue.shuffle()
        return `🔀 The queue of ${queue.tracks.length} songs have been shuffled!`
    },
} as ICommand