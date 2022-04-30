import { player, client } from "../../index"

export function getQueue(guildId: any) {
    try {
        return player.getQueue(guildId)
    } catch (err) {
        return null
    }
}

export function getVc(guildId: any, userId: any) {
    try {
        const guild = client.guilds.cache.get(`${guildId}`)
        const member = guild.members.cache.get(`${userId}`)
        return member.voice.channel
    } catch (err) {
        return null
    }
}
