import { ICommand } from "wokcommands";
import * as index from "../../index"

export default {
    name: 'Shuffle',
    category: "Voice Channel",
    description: "Shuffles the queue",
    slash: true,
    callback: async ({ interaction }) => {
        const guildId: any = interaction.guild
        const queue = index.player.getQueue(guildId)
        if (!queue) return await interaction.editReply("There are no songs in the queue")

        queue.shuffle()
        await interaction.editReply(`The queue of ${queue.tracks.length} songs have been shuffled!`)
    },
} as ICommand