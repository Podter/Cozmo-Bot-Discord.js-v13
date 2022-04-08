import { ICommand } from "wokcommands";
import * as index from "../../index"

export default {
    name: 'Leave',
    category: "Voice Channel",
    description: "Leave the Voice Channel",
    slash: true,
    callback: async ({ interaction }) => {
        const guildId: any = interaction.guild
        const queue = index.player.getQueue(guildId)

		if (!queue) return await interaction.editReply("There are no songs in the queue")

		queue.destroy()
        await interaction.editReply("Bye!")
    },
} as ICommand