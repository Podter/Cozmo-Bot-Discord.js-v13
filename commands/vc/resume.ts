import { ICommand } from "wokcommands";
import * as index from "../../index"

export default {
    name: 'Resume',
    category: "Voice Channel",
    description: "Resume the track that is currently playing",
    slash: true,
    callback: async ({interaction}) => {
        const guildId: any = interaction.guild
        const queue = index.player.getQueue(guildId)
        if (!queue) return await interaction.editReply("There are no songs in the queue")

		queue.setPaused(false)
        await interaction.editReply("Music has been paused! Use `/pause` to resume the music")
    },
} as ICommand