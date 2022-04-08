import { ICommand } from "wokcommands";
import * as index from "../../index"

export default {
    name: 'SkipTo',
    category: "Voice Channel",
    description: "Skips to a certain track #",
    slash: true,
    callback: async ({ interaction }) => {
        const guildId: any = interaction.guild
        const queue = index.player.getQueue(guildId)
        if (!queue) return await interaction.editReply("There are no songs in the queue")

        const trackNum: any = interaction.options.getNumber("tracknumber")
        if (trackNum > queue.tracks.length)
            return await interaction.editReply("Invalid track number")
		queue.skipTo(trackNum - 1)

        await interaction.editReply(`Skipped ahead to track number ${trackNum}`)
    },
} as ICommand