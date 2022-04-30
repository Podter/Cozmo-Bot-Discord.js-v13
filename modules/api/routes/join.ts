import express from "express"
const router = express.Router()
import { client, player } from "../../../index"

router.get('/', (_req, res) => {
    res.status(400).json({ error: 'No id provided', code: 400 })
})

router.get('/:id', async (req, res) => {
    if (!req.query.userid) {
        res.status(400).json({ error: 'No user id provided', code: 400 })
        return
    }
    const guildId: any = req.params.id
    const queue = player.createQueue(guildId)
    const userId = req.query.userid
    const guild = client.guilds.cache.get(`${guildId}`)
    const member = guild.members.cache.get(`${userId}`)
    if (!member.voice.channel) {
        res.status(400).json({ error: 'User is not in a voice channel', code: 400 })
        return
    }
    const vc: any = member.voice.channel
    if (!queue.connection) await queue.connect(vc)
    res.status(200).json({ message: 'Joined', code: 200 })
})

export default router
