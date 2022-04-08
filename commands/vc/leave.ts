import { ICommand } from "wokcommands";
import * as index from "../../index"

export default {
    name: 'Leave',
    category: "Voice Channel",
    description: "Leave the Voice Channel",
    slash: true,
    callback: async ({ guild }) => {
        const guildId: any = guild?.id
        const queue = index.player.getQueue(guildId)

		if (!queue) return "There are no songs in the queue 🤷‍♂️"

		queue.destroy()
        return "👋 Bye!"
    },
} as ICommand