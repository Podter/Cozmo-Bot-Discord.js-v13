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
            new MessageEmbed()
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
                iconURL: "https://media.discordapp.net/attachments/959692896720797736/959693526092906506/pfp-png.png",
            })
            .setColor('#F28FAD')
        ]
    },
} as ICommand