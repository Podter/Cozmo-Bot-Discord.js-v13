import { ICommand } from "wokcommands";
import benDb from '../modules/ben/schema'

export default {
    name: 'Ben',
    category: "Fun",
    description: "Make a call and invite Ben to the chat!",
    slash: true,
    cooldown: '5s',
    testOnly: true,
    callback: async ({ interaction, channel, guild }) => {
        if (await benDb.findOne({ guildId: guild?.id, channelId: channel?.id })) {
            interaction.reply('☎️ Ben hangs up!')
            await benDb.deleteOne({ guildId: guild?.id, channelId: channel?.id })
        } else {
            interaction.reply('☎️ Calling Ben...\nType `/ben` again to hang up.')
            await new Promise((resolve) => setTimeout(resolve, 3000))
            await new benDb({
                guildId: guild?.id,
                channelId: channel?.id
            }).save()
            channel.send('🐶 **Ben:** Ben? 😐')
        }
    },
} as ICommand