import { ICommand } from "wokcommands";
import { player } from "../../index"

export default {
    name: 'Shuffle',
    category: "Voice Channel",
    description: "Shuffles the queue",
    slash: true,
    cooldown: '5s',
    callback: async ({ guild, member }) => {
        const guildId: any = guild?.id
        const queue = player.getQueue(guildId)
        if (!queue) return "There are no songs in the queue 🤷‍♂️"
        if (!member.voice.channel) return "❌ You must be in a voice channel to use this command"

        queue.shuffle()
        return `🔀 The queue of ${queue.tracks.length} songs have been shuffled!`
    },
} as ICommand