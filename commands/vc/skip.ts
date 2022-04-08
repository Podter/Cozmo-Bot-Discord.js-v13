import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import * as index from "../../index"

export default {
    name: 'Skip',
    category: "Voice Channel",
    description: "Skip the track that is currently playing",
    slash: true,
    callback: async ({guild}) => {
        const guildId: any = guild?.id
        const queue = index.player.getQueue(guildId)

		if (!queue) return "There are no songs in the queue 🤷‍♂️"

        const currentSong = queue.current

		queue.skip()

        return [
            new MessageEmbed().setDescription(`⏭️ ${currentSong.title} has been skipped!`).setThumbnail(currentSong.thumbnail)
        ]
    },
} as ICommand