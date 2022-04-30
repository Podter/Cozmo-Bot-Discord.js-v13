import express from "express"
const router = express.Router()
import { player } from "../../../index"
import { getVc } from "../getFunctions"

router.get('/', (_req, res) => {
    res.status(400).json({ error: 'No id provided', code: 400 })
})

router.get('/:id', async (req, res) => {
    const guildId: any = req.params.id
    if (!req.query.userid) {
        res.status(400).json({ error: 'No user id provided', code: 400 })
        return
    } else if (!getVc(guildId, req.query.userid)) {
        res.status(400).json({ error: 'User is not in a voice channel', code: 400 })
        return
    }
    const queue = player.createQueue(guildId)
    const vc: any = getVc(guildId, req.query.userid)
    if (!queue.connection) await queue.connect(vc)
    res.status(200).json({ message: 'Joined', code: 200 })
})

export default router
