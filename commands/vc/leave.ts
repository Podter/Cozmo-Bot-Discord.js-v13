import { ICommand } from "wokcommands";
import { player } from "../../index"

export default {
    name: 'Leave',
    category: "Voice Channel",
    description: "Leave the Voice Channel",
    slash: true,
    cooldown: '5s',
    callback: async ({ guild, member }) => {
        const guildId: any = guild?.id
        const queue = player.getQueue(guildId)

		if (!queue) return "There are no songs in the queue 🤷‍♂️"
        if (!member.voice.channel) return "❌ You must be in a voice channel to use this command"

		queue.destroy()
        return "👋 Bye!"
    },
} as ICommand