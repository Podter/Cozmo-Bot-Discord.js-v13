import { player } from "../../index"

function getQueue(guildId: any) {
    try {
        return player.getQueue(guildId)
    } catch (err) {
        return null
    }
}

export default getQueue
