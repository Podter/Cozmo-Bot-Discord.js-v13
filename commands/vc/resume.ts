import { ICommand } from "wokcommands";
import * as index from "../../index"

export default {
    name: 'Resume',
    category: "Voice Channel",
    description: "Resume the track that is currently playing",
    slash: true,
    callback: async ({guild}) => {
        const guildId: any = guild?.id
        const queue = index.player.getQueue(guildId)
        if (!queue) return "There are no songs in the queue 🤷‍♂️"

		queue.setPaused(false)
        return "▶️ Music has been resumed!"
    },
} as ICommand