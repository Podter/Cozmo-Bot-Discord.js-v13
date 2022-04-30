import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import * as index from "../../index"

export default {
    name: 'NowPlaying',
    category: "Voice Channel",
    description: "Display the current track playing",
    slash: true,
    cooldown: '5s',
    callback: async ({ interaction, guild }) => {
        await interaction.deferReply()
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const guildId: any = guild?.id
        const queue = index.player.getQueue(guildId)
        if (!queue) {
            interaction.editReply("There are no songs in the queue 🤷‍♂️")
            return
        }

        const song = queue.current

        let bar = queue.createProgressBar({
			length: 10,
            timecodes: true,
		})

        const embed = new MessageEmbed()
        .setColor('#96cdfb')
        .setTitle(`${song.title}`)
        .setURL(`${song.url}`)
        .setAuthor({
            name: `Now playing 📃`,
        })
        .setDescription(`${bar}\nBy ${song.author}`)
        .setImage(song.thumbnail)
        .setTimestamp()
        .setFooter({
            text: "Cozmo",
            iconURL: "attachment://pfp-png.png",
        })
        interaction.editReply({ embeds: [embed], files: ['./assets/pfp-png.png'] })
    },
} as ICommand