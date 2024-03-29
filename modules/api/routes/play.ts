import { QueryType } from "discord-player"
import express from "express"
const router = express.Router()
import { getQueue, getVc, play } from '../apiFunctions'
import { player, client } from "../../../index"

router.get('/', (_req, res) => {
    res.status(400).json({ error: 'No id provided', code: 400 })
})

router.get('/:id', async (req, res) => {
    const guildId: any = req.params.id
    if (!req.query.song) {
        res.status(400).json({ error: 'No song provided', code: 400 })
        return
    } else if (!req.query.userid) {
        res.status(400).json({ error: 'No user id provided', code: 400 })
        return
    } else if (!getVc(guildId, req.query.userid)) {
        res.status(400).json({ error: 'User is not in a voice channel', code: 400 })
        return
    } else if (!client.voice.channel) {
        const queue = player.createQueue(guildId)
        const vc: any = getVc(guildId, req.query.userid)
        if (!queue.connection) await queue.connect(vc)
        const song = `${req.query.song}`
        const requestedUser = `${req.query.userid}`
        await play(song, requestedUser, res, queue)
        if (!queue.playing) await queue.play()
    } else {
        const queue = getQueue(guildId)
        const song = `${req.query.song}`
        const requestedUser = `${req.query.userid}`
        play(song, requestedUser, res, queue)
    }
})

export default router
