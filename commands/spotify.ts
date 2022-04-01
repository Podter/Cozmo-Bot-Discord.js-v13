import { ICommand } from "wokcommands";
import * as musicFunctions from "../modules/music/musicFunctions";
import dotenv from "dotenv"
dotenv.config()
const spotifyToYT = require("spotify-to-yt")
spotifyToYT.setCredentials(process.env.SPOTIFY_CLIENT_ID, process.env.SPOTIFY_CLIENT_SECRET)

export default {
    name: 'Spotify',
    category: "Music",
    description: "Add a song to the queue using Spotify search",
    expectedArgs: '[song]',
    minArgs: 1,
    slash: true,
    callback: async ({interaction, args, member}) => {
        await interaction.deferReply()
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const joinedArgs = args.join(' ')
        spotifyToYT.trackSearch(joinedArgs).then(async (spotifyInfo: any) => {
            spotifyToYT.trackGet(spotifyInfo.url).then(async (youtubeInfo: any) => {
                await musicFunctions.play(interaction, youtubeInfo.url, "Spotify", member)
            })
        })
    },
} as ICommand