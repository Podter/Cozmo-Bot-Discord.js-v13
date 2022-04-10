import { ICommand } from "wokcommands";
import * as index from "../../index"

export default {
    name: 'SkipTo',
    category: "Voice Channel",
    description: "Skips to a certain track number",
    expectedArgs: '[tracknumber]',
    minArgs: 1,
    maxArgs: 1,
    options: [],
    slash: true,
    cooldown: '5s',
    callback: async ({ args, guild, member }) => {
        const guildId: any = guild?.id
        const queue = index.player.getQueue(guildId)
        if (!queue) return "There are no songs in the queue 🤷‍♂️"
        if (!member.voice.channel) return "❌ You must be in a voice channel to use this command"

        const trackNum: number = parseInt(args.shift()!)
        if (isNaN(trackNum) || trackNum > queue.tracks.length)
            return "❌ Invalid track number"
		queue.skipTo(trackNum - 1)

        return `⏭️ Skipped ahead to track number ${trackNum}`
    },
} as ICommand