import express from "express"
const router = express.Router()

import npRouter from "./routes/nowplaying";
import queueRouter from "./routes/queue";
import lyricsRouter from "./routes/lyrics";

router.get('/', (_req, res) => {
    res.json({ message: 'Cozmo bot API' })
})

router.use('/nowplaying', npRouter)
router.use('/queue', queueRouter)
router.use('/lyrics', lyricsRouter)

router.get('/:any', (_req, res) => {
    res.status(404).json({ error: 'Not found', code: 404 })
})

export default router
