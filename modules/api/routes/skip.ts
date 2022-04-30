import express from "express"
const router = express.Router()
import { getQueue, getVc } from '../apiFunctions'

router.get('/', (_req, res) => {
    res.status(400).json({ error: 'No id provided', code: 400 })
})

router.get('/:id', (req, res) => {
    const guildId: any = req.params.id
    const queue = getQueue(guildId)
    if (!queue || !queue.current) {
        res.status(404).json({ error: 'No queue in this server or server not found', code: 404 })
        return
    } else if (!req.query.userid) {
        res.status(400).json({ error: 'No user id provided', code: 400 })
        return
    } else if (!getVc(guildId, req.query.userid)) {
        res.status(400).json({ error: 'User is not in a voice channel', code: 400 })
        return
    } else if (req.query.skipto) {
        const trackNum: number = +req.query.skipto
        if (isNaN(trackNum) || trackNum > queue.tracks.length) {
            res.status(400).json({ error: 'Invalid track number', code: 400 })
            return
        }
        queue.skipTo(trackNum - 1)
        res.status(200).json({ message: 'Skipped', code: 200 })
        return
    } else {
        queue.skip()
        res.status(200).json({ message: 'Skipped', code: 200 })
        return
    }
})

export default router
