import { ICommand } from "wokcommands";
import * as musicFunctions from "../../modules/music/musicFunctions";
const spotifyToYT = require("spotify-to-yt")
const youtubedl = require('youtube-dl-exec')

export default {
    name: 'Play',
    category: "Music",
    description: "Add a song to the queue",
    expectedArgs: '[song]',
    minArgs: 1,
    slash: true,
    callback: async ({interaction, args, member}) => {
        await interaction.deferReply()
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const joinedArgs = args.join(' ')
        if (joinedArgs.startsWith("https://open.spotify.com/track") || joinedArgs.startsWith("http://open.spotify.com/track") || joinedArgs.startsWith("open.spotify.com/track") || joinedArgs.includes("/track/")) {
            spotifyToYT.trackGet(joinedArgs).then(async (youtubeInfo: any) => {
                await musicFunctions.play(interaction, youtubeInfo.url, "Spotify", member)
            })
        } else if (joinedArgs.startsWith("https://open.spotify.com/playlist") || joinedArgs.startsWith("http://open.spotify.com/playlist") || joinedArgs.startsWith("open.spotify.com/playlist") || joinedArgs.includes("/playlist/")) {
            musicFunctions.playlistSpotify(interaction, joinedArgs,)
        } else if (joinedArgs.startsWith("https://www.youtube.com/playlist?") || joinedArgs.startsWith("http://www.youtube.com/playlist?") || joinedArgs.startsWith("https://youtube.com/playlist?") || joinedArgs.startsWith("http://youtube.com/playlist?") || joinedArgs.startsWith("youtube.com/playlist?") || joinedArgs.startsWith("www.youtube.com/playlist?") || joinedArgs.includes("playlist?") || joinedArgs.includes("&list")) {
            musicFunctions.playlist(interaction, joinedArgs,)
        } else if (joinedArgs.startsWith("https://www.youtube.com/watch?") || joinedArgs.startsWith("http://www.youtube.com/watch?") || joinedArgs.startsWith("https://youtube.com/watch?") || joinedArgs.startsWith("http://youtube.com/watch?") || joinedArgs.startsWith("youtube.com/watch?") || joinedArgs.startsWith("www.youtube.com/watch?") || joinedArgs.includes("watch?")) {
            musicFunctions.play(interaction, joinedArgs, "Youtube", member)
        } else {
            const url = await youtubedl(joinedArgs, {
                defaultSearch: "auto",
                getId: "",
              }).then((output: any) => {
                return `https://www.youtube.com/watch?v=${output}`
              })
            musicFunctions.play(interaction, url, "Youtube", member)
        }
    },
} as ICommand