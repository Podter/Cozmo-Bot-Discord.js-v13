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
    callback: async ({ args, guild }) => {
        const guildId: any = guild?.id
        const queue = index.player.getQueue(guildId)
        if (!queue) return "There are no songs in the queue 🤷‍♂️"

        const trackNum: number = parseInt(args.shift()!)
        console.log(trackNum)
        if (isNaN(trackNum) || trackNum > queue.tracks.length)
            return "❌ Invalid track number"
		queue.skipTo(trackNum - 1)

        return `⏭️ Skipped ahead to track number ${trackNum}`
    },
} as ICommand