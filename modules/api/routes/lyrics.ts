import express from "express"
const router = express.Router()
import { getQueue, getVc } from '../getFunctions'
import { Lyrics } from "@discord-player/extractor";
const lyricsClient = Lyrics.init(process.env.GENIUS_ACCESS_TOKEN);

router.get('/', (_req, res) => {
    res.status(400).json({ error: 'No id provided', code: 400 })
})

router.get('/:id', async (req, res) => {
    const guildId: any = req.params.id
    const queue = getQueue(guildId)
    if (!queue) {
        res.status(404).json({ error: 'No queue in this server or server not found', code: 404 })
        return
    } else if (!req.query.userid) {
        res.status(400).json({ error: 'No user id provided', code: 400 })
        return
    } else if (!getVc(guildId, req.query.userid)) {
        res.status(400).json({ error: 'User is not in a voice channel', code: 400 })
        return
    }
    const lyrics = await lyricsClient.search(queue.current.title)
    if (!lyrics) {
        res.status(404).json({ error: 'No lyrics found', code: 404 })
        return
    }
    res.status(200).json({ lyrics: lyrics.lyrics, code: 200 })
})

export default router
