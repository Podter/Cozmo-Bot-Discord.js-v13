import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import * as index from "../../index"

export default {
name: 'Queue',
    category: "Voice Channel",
    description: "Display the current queue",
    slash: true,
    callback: async ({ interaction, guild }) => {
        await interaction.deferReply()
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const guildId: any = guild?.id
        const queue = index.player.getQueue(guildId)
        if (!queue || !queue.playing){
            interaction.editReply("There are no songs in the queue 🤷‍♂️")
        }

        const totalPages = Math.ceil(queue.tracks.length / 10) || 1
        const page = (interaction.options.getNumber("page") || 1) - 1

        if (page + 1 > totalPages) 
            interaction.editReply(`❌ Invalid Page. There are only a total of ${totalPages} pages of songs`)
        
        const queueString = queue.tracks.slice(page * 10, page * 10 + 10).map((song, i) => {
            interaction.editReply(`**${page * 10 + i + 1}.** \`[${song.duration}]\` ${song.title} -- <@${song.requestedBy.id}>`)
        }).join("\n")

        const currentSong = queue.current

        const embed = new MessageEmbed()
        embed.setDescription(`**Currently Playing**\n` + 
        (currentSong ? `\`[${currentSong.duration}]\` ${currentSong.title} -- <@${currentSong.requestedBy.id}>` : "None") +
        `\n\n**Queue**\n${queueString}`
        )
        embed.setFooter({
            text: `Page ${page + 1} of ${totalPages}`
        })
        embed.setThumbnail(currentSong.thumbnail)
        interaction.editReply({ embeds: [embed] })
    },
} as ICommand