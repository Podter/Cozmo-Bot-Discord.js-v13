import express from "express"
const router = express.Router()
import { getQueue, getVc } from '../apiFunctions'

router.get('/', (_req, res) => {
    res.status(400).json({ error: 'No id or action provided', code: 400 })
})

router.get('/:id/nowplaying', (req, res) => {
    const guildId: any = req.params.id
    const queue = getQueue(guildId)
    if (!queue || !queue.tracks) {
        res.status(404).json({ error: 'No queue in this server or server not found', code: 404 })
        return
    } else if (!req.query.userid) {
        res.status(400).json({ error: 'No user id provided', code: 400 })
        return
    } else if (!getVc(guildId, req.query.userid)) {
        res.status(400).json({ error: 'User is not in a voice channel', code: 400 })
        return
    }
    res.status(200).json({ json: queue.current, code: 200 })
    return
})

router.get('/:id/tracks', (req, res) => {
    const guildId: any = req.params.id
    const queue = getQueue(guildId)
    if (!queue || !queue.tracks) {
        res.status(404).json({ error: 'No queue in this server or server not found', code: 404 })
        return
    } else if (!req.query.userid) {
        res.status(400).json({ error: 'No user id provided', code: 400 })
        return
    } else if (!getVc(guildId, req.query.userid)) {
        res.status(400).json({ error: 'User is not in a voice channel', code: 400 })
        return
    }
    res.status(200).json({ json: queue.tracks, code: 200 })
    return
})

export default router
