import { QueryType } from "discord-player";
import { ICommand } from "wokcommands";
const { MessageEmbed } = require("discord.js")
import { player } from "../../index"

export default {
    name: 'Play',
    category: "Voice Channel",
    description: "Add a song to the queue",
    expectedArgs: '[song]',
    minArgs: 1,
    slash: true,
    cooldown: '5s',
    callback: async ({ interaction, guild, member, args, user }) => {
        await interaction.deferReply()
        await new Promise((resolve) => setTimeout(resolve, 1000))
        if (!member.voice.channel) {
            interaction.editReply("❌ You need to be in a VC to use this command")
            return
        }

        const guildId: any = guild?.id
        const queue = player.createQueue(guildId)
        const vc: any = member.voice.channel
        if (!queue.connection) await queue.connect(vc)

        const joinedArgs = args.join(' ')
        let embed = new MessageEmbed()

        if (joinedArgs.startsWith("https://open.spotify.com/playlist") || joinedArgs.startsWith("http://open.spotify.com/playlist") || joinedArgs.startsWith("open.spotify.com/playlist") || joinedArgs.includes("/playlist/")) {
            const result = await player.search(joinedArgs, {
                requestedBy: user,
                searchEngine: QueryType.SPOTIFY_PLAYLIST
            })
            if (result.tracks.length === 0) {
                interaction.editReply("❌ No results")
                return
            } else {
                const playlist = result.playlist
                queue.addTracks(result.tracks)
                embed
                .setTitle(`${playlist?.title}`)
                .setURL(`${playlist?.url}`)
                .setDescription(`Songs: ${playlist?.tracks.length}`)
                .setImage(playlist?.thumbnail)
            }
        } else if (joinedArgs.startsWith("https://open.spotify.com/album") || joinedArgs.startsWith("http://open.spotify.com/album") || joinedArgs.startsWith("open.spotify.com/album") || joinedArgs.includes("/album/")) {
            const result = await player.search(joinedArgs, {
                requestedBy: user,
                searchEngine: QueryType.SPOTIFY_ALBUM
            })
            if (result.tracks.length === 0) {
                interaction.editReply("❌ No results")
                return
            } else {
                const playlist = result.playlist
                queue.addTracks(result.tracks)
                embed
                .setTitle(`${playlist?.title}`)
                .setURL(`${playlist?.url}`)
                .setDescription(`Songs: ${playlist?.tracks.length}`)
                .setImage(playlist?.thumbnail)
            }
        } else if (joinedArgs.startsWith("https://www.youtube.com/playlist?") || joinedArgs.startsWith("http://www.youtube.com/playlist?") || joinedArgs.startsWith("https://youtube.com/playlist?") || joinedArgs.startsWith("http://youtube.com/playlist?") || joinedArgs.startsWith("youtube.com/playlist?") || joinedArgs.startsWith("www.youtube.com/playlist?") || joinedArgs.includes("playlist?") || joinedArgs.includes("&list")) {
            const result = await player.search(joinedArgs, {
                requestedBy: user,
                searchEngine: QueryType.YOUTUBE_PLAYLIST
            })
            if (result.tracks.length === 0) {
                interaction.editReply("❌ No results")
                return
            } else {
                const playlist = result.playlist
                queue.addTracks(result.tracks)
                embed
                .setTitle(`${playlist?.title}`)
                .setURL(`${playlist?.url}`)
                .setDescription(`Songs: ${playlist?.tracks.length}`)
                .setImage(playlist?.thumbnail)
            }
        } else {
            const result = await player.search(joinedArgs, {
                requestedBy: user,
                searchEngine: QueryType.AUTO
            })
            if (result.tracks.length === 0) {
                interaction.editReply("❌ No results")
                return
            } else {
                const song = result.tracks[0]
                queue.addTrack(song)
                embed
                .setTitle(`${song.title}`)
                .setURL(`${song.url}`)
                .setDescription(`By ${song.author}\nDuration: ${song.duration}`)
                .setImage(song.thumbnail)
            }
        }

        embed
        .setColor('#abe9b3')
        .setAuthor({
            name: `Added to Queue! 🎶`,
        })
        .setTimestamp()
        .setFooter({
            text: "Cozmo",
            iconURL: "attachment://pfp-png.png",
        })
        
        if (!queue.playing) await queue.play()
        interaction.editReply({ embeds: [embed], files: ['./assets/pfp-png.png'] })
    },
} as ICommand