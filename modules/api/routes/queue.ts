import express from "express"
const router = express.Router()
import getQueue from '../getQueue'

router.get('/', (_req, res) => {
    res.status(400).json({ error: 'No id provided', code: 400 })
})

router.get('/:id', (req, res) => {
    const guildId: any = req.params.id
    const queue = getQueue(guildId)
    if (!queue) {
        res.status(404).json({ error: 'No queue in this server or server not found', code: 404 })
        return
    } 
    res.json(queue.tracks)
})

export default router
