import { ICommand } from "wokcommands";
const { MessageEmbed } = require("discord.js")
const { QueryType } = require("discord-player")
import * as index from "../../index"

export default {
    name: 'Play',
    category: "Voice Channel",
    description: "Add a song to the queue",
    expectedArgs: '[song]',
    minArgs: 1,
    slash: true,
    callback: async ({ interaction, guild, member, args, user }) => {
        await interaction.deferReply()
        await new Promise((resolve) => setTimeout(resolve, 1000))
        if (!member.voice.channel) interaction.editReply("You need to be in a VC to use this command 🤷‍♂️")

        const guildId: any = guild?.id
        const queue = index.player.createQueue(guildId)
        const vc: any = member.voice.channel
        if (!queue.connection) await queue.connect(vc)

        let embed = new MessageEmbed()

        const joinedArgs = args.join(' ')
        const result = await index.player.search(joinedArgs, {
            requestedBy: user,
            searchEngine: QueryType.YOUTUBE_VIDEO
        })
        if (result.tracks.length === 0)
            interaction.editReply("❌ No results")
        
        const song = result.tracks[0]
        queue.addTrack(song)
        embed
        .setColor('#abe9b3')
        .setTitle(`${song.title}`)
        .setURL(`${song.url}`)
        .setAuthor({
            name: `Added to Queue! 🎶`,
        })
        .setDescription(`By ${song.author}\nDuration: ${song.duration}`)
        .setImage(song.thumbnail)
        .setTimestamp()
        .setFooter({
            text: "Cozmo",
            iconURL: "https://media.discordapp.net/attachments/959692896720797736/959693526092906506/pfp-png.png",
        })
        
        if (!queue.playing) await queue.play()
        interaction.editReply({ embeds: [embed] })
    },
} as ICommand