import { ICommand } from "wokcommands";
import { Lyrics } from "@discord-player/extractor";
import dotenv from "dotenv";
import * as index from "../../index"
import { QueryType } from "discord-player";
import { MessageEmbed } from "discord.js";
dotenv.config();
const lyricsClient = Lyrics.init(process.env.GENIUS_ACCESS_TOKEN);

export default {
    name: 'Lyrics',
    category: "Voice Channel",
    description: "Get the lyrics of the song",
    expectedArgs: '[song]',
    maxArgs: 1,
    slash: true,
    callback: async ({ interaction, args, user, guild }) => {
        await interaction.deferReply()
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const guildId: any = guild?.id
        const queue = index.player.getQueue(guildId)

        const joinedArgs = args.join(' ')
        let embed = new MessageEmbed()

        if (joinedArgs.startsWith("https://open.spotify.com/playlist") || joinedArgs.startsWith("http://open.spotify.com/playlist") || joinedArgs.startsWith("open.spotify.com/playlist") || joinedArgs.includes("/playlist/")) {
            interaction.editReply("❌ Playlists are not supported")
            return
        } else if (joinedArgs.startsWith("https://open.spotify.com/album") || joinedArgs.startsWith("http://open.spotify.com/album") || joinedArgs.startsWith("open.spotify.com/album") || joinedArgs.includes("/album/")) {
            interaction.editReply("❌ Playlists are not supported")
            return
        } else if (joinedArgs.startsWith("https://www.youtube.com/playlist?") || joinedArgs.startsWith("http://www.youtube.com/playlist?") || joinedArgs.startsWith("https://youtube.com/playlist?") || joinedArgs.startsWith("http://youtube.com/playlist?") || joinedArgs.startsWith("youtube.com/playlist?") || joinedArgs.startsWith("www.youtube.com/playlist?") || joinedArgs.includes("playlist?") || joinedArgs.includes("&list")) {
            interaction.editReply("❌ Playlists are not supported")
            return
        } else if (joinedArgs.startsWith("https://www.youtube.com/watch") || joinedArgs.startsWith("http://www.youtube.com/watch") || joinedArgs.startsWith("https://youtube.com/watch") || joinedArgs.startsWith("http://youtube.com/watch") || joinedArgs.startsWith("youtube.com/watch") || joinedArgs.startsWith("www.youtube.com/watch") || joinedArgs.includes("/watch") || joinedArgs.includes("https://open.spotify.com/track") || joinedArgs.includes("http://open.spotify.com/track") || joinedArgs.includes("open.spotify.com/track")) {
            const result = await index.player.search(joinedArgs, {
                requestedBy: user,
                searchEngine: QueryType.AUTO
            })
            if (result.tracks.length === 0) {
                interaction.editReply("❌ No results")
                return
            } else {
                const song = result.tracks[0]
                const lyrics = await lyricsClient.search(song.title);
                embed
                .setTitle(`${lyrics.title}`)
                .setURL(`${lyrics.url}`)
                .setDescription(`By ${lyrics.artist.name}\n\n**Lyrics:**\n${lyrics.lyrics}`)
                .setThumbnail(lyrics.thumbnail)
            }
        } else if (joinedArgs !== "") {
            const lyrics = await lyricsClient.search(joinedArgs);
            if (lyrics) {
                embed
                .setTitle(`${lyrics.title}`)
                .setURL(`${lyrics.url}`)
                .setDescription(`By ${lyrics.artist.name}\n\n**Lyrics:**\n${lyrics.lyrics}`)
                .setThumbnail(lyrics.thumbnail)
            } else {
                interaction.editReply("❌ No results")
                return
            }
        } else if (queue) {
            const song = queue.current
            const lyrics = await lyricsClient.search(song.title);
            if (lyrics) {
                embed
                .setTitle(`${lyrics.title}`)
                .setURL(`${lyrics.url}`)
                .setDescription(`By ${lyrics.artist.name}\n\n**Lyrics:**\n${lyrics.lyrics}`)
                .setThumbnail(lyrics.thumbnail)
            } else {
                interaction.editReply("❌ No results")
                return
            }
        } else {
            interaction.editReply("There are no songs in the queue 🤷‍♂️\nor specify a song to get the lyrics using the command `/lyrics [song]`")
            return
        }

        embed
        .setColor('#96cdfb')
        .setAuthor({
            name: `Lyrics 📃`,
        })
        .setTimestamp()
        .setFooter({
            text: "Cozmo",
            iconURL: "https://media.discordapp.net/attachments/959692896720797736/959693526092906506/pfp-png.png",
        })
        interaction.editReply({ embeds: [embed] })
    },
} as ICommand