import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import { player } from "../../index"

export default {
    name: 'Skip',
    category: "Voice Channel",
    description: "Skip the track that is currently playing",
    slash: true,
    cooldown: '5s',
    callback: async ({ guild, member, interaction }) => {
        const guildId: any = guild?.id
        const queue = player.getQueue(guildId)
        
		if (!queue) return "There are no songs in the queue 🤷‍♂️"
        if (!member.voice.channel) return "❌ You must be in a voice channel to use this command"
        
        const currentSong = queue.current

		queue.skip()

        const embed = new MessageEmbed()
        .setTitle(`${currentSong.title}`)
        .setURL(`${currentSong.url}`)
        .setDescription(`By ${currentSong.author}\n Duration: ${currentSong.duration}`)
        .setThumbnail(currentSong.thumbnail)
        .setAuthor({
            name: `Skipped! ⏭️`,
        })
        .setTimestamp()
        .setFooter({
            text: "Cozmo",
            iconURL: "attachment://pfp-png.png",
        })
        .setColor('#F28FAD')

        interaction.reply({ embeds: [embed], files: ['./assets/pfp-png.png'] })
        return
    },
} as ICommand