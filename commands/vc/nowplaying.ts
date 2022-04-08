import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import * as index from "../../index"

export default {
    name: 'NowPlaying',
    category: "Voice Channel",
    description: "Display the current track playing",
    slash: true,
    callback: async ({ interaction }) => {
        const guildId: any = interaction.guild
        const queue = index.player.getQueue(guildId)
        if (!queue) return await interaction.editReply("There are no songs in the queue")

        const song = queue.current

        await interaction.editReply({
			embeds: [new MessageEmbed()
            .setThumbnail(song.thumbnail)
            .setDescription(`Currently Playing [${song.title}](${song.url})\n\n`)
        ],
		})
    },
} as ICommand