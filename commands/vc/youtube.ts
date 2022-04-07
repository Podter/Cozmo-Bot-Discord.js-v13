import { ICommand } from "wokcommands";
import * as musicFunctions from "../../modules/vc/vcFunctions";
import dotenv from "dotenv"
dotenv.config()
const youtubedl = require('youtube-dl-exec')


export default {
    name: 'Youtube',
    category: "Voice Channel",
    description: "Add a song to the queue using youtube search",
    expectedArgs: '[song]',
    minArgs: 1,
    slash: true,
    callback: async ({interaction, args, member}) => {
        await interaction.deferReply()
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const joinedArgs = args.join(' ')
        const url = await youtubedl(joinedArgs, {
            defaultSearch: "auto",
            getId: "",
          }).then((output: any) => {
            return `https://www.youtube.com/watch?v=${output}`
          })
        musicFunctions.play(interaction, url, "Youtube", member)
    },
} as ICommand