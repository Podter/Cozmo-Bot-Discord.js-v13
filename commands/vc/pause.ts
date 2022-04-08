import { ICommand } from "wokcommands";
import * as index from "../../index"

export default {
    name: 'Pause',
    category: "Voice Channel",
    description: "Pause the track that is currently playing",
    slash: true,
    callback: async ({ guild }) => {
        const guildId: any = guild?.id
        const queue = index.player.getQueue(guildId)
        if (!queue) return "There are no songs in the queue 🤷‍♂️"

		queue.setPaused(true)
        return "⏸️ Music has been paused! Use `/resume` to resume the music"
    },
} as ICommand