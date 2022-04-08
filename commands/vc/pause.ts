import { ICommand } from "wokcommands";
import * as index from "../../index"

export default {
    name: 'Pause',
    category: "Voice Channel",
    description: "Pause the track that is currently playing",
    slash: true,
    callback: async ({ interaction }) => {
        const guildId: any = interaction.guild
        const queue = index.player.getQueue(guildId)
        if (!queue) return await interaction.editReply("There are no songs in the queue")

		queue.setPaused(true)
        await interaction.editReply("Music has been paused! Use `/resume` to resume the music")
    },
} as ICommand