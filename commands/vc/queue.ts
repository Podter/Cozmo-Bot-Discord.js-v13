import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import * as index from "../../index"

export default {
name: 'Queue',
    category: "Voice Channel",
    description: "Display the current queue",
    expectedArgs: '[page]',
    maxArgs: 1,
    options: [],
    slash: true,
    cooldown: '5s',
    testOnly: true,
    callback: async ({ interaction, guild, args }) => {
        await interaction.deferReply()
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const guildId: any = guild?.id
        const queue = index.player.getQueue(guildId)
        if (!queue || !queue.playing){
            interaction.editReply("There are no songs in the queue 🤷‍♂️")
            return
        }

        const totalPages = Math.ceil(queue.tracks.length / 10) || 1
        const page: number = (parseInt(args.shift()!) || 1) - 1

        if (isNaN(page) || page + 1 > totalPages) {
            interaction.editReply(`❌ Invalid Page. There are only a total of ${totalPages} pages of songs`)
            return
        }
        
        const queueString = queue.tracks.slice(page * 10, page * 10 + 10).map((song, i) => {
            return(`**${page * 10 + i + 1}.** \`[${song.duration}]\` ${song.title} -- <@${song.requestedBy.id}>`)
        }).join("\n")

        const currentSong = queue.current

        let bar = queue.createProgressBar({
			length: 10,
            timecodes: true,
		})

        const embed = new MessageEmbed()
        .setColor('#96cdfb')
        .setAuthor({
            name: `Queue 📃`,
        })
        .setTitle(`${currentSong.title}`)
        .setURL(`${currentSong.url}`)
        .setDescription(`${bar}\n\n**(${queue.tracks.length}) Upcoming next:**\n${queueString}`)
        .setTimestamp()
        .setFooter({
            text: `Page ${page + 1} of ${totalPages} • Cozmo`,
            iconURL: "https://media.discordapp.net/attachments/959692896720797736/959693526092906506/pfp-png.png",
        })
        .setThumbnail(currentSong.thumbnail)
        interaction.editReply({ embeds: [embed] })
    },
} as ICommand