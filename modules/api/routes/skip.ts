import express from "express"
const router = express.Router()
import getQueue from '../getQueue'

router.get('/', (_req, res) => {
    res.status(400).json({ error: 'No id provided', code: 400 })
})

router.get('/:id', (req, res) => {
    const guildId: any = req.params.id
    const queue = getQueue(guildId)
    if (!queue || !queue.current) {
        res.status(404).json({ error: 'No queue in this server or server not found', code: 404 })
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
