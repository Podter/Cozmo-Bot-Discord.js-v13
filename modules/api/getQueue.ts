import * as index from "../../index"

function getQueue(guildId: any) {
    try {
        return index.player.getQueue(guildId)
    } catch (err) {
        return null
    }
}

export default getQueue
