import express from "express"
const router = express.Router()

import queueRouter from "./routes/queue";
import lyricsRouter from "./routes/lyrics";
import skipRouter from "./routes/skip";
import leaveRouter from "./routes/leave";
import pauseRouter from "./routes/pause";
import shuffleRouter from "./routes/shuffle";
import playRouter from "./routes/play";

router.get('/', (_req, res) => {
    res.json({ message: 'Cozmo bot API' })
})

router.use('/queue', queueRouter)
router.use('/lyrics', lyricsRouter)
router.use('/skip', skipRouter)
router.use('/leave', leaveRouter)
router.use('/pause', pauseRouter)
router.use('/shuffle', shuffleRouter)
router.use('/play', playRouter)

export default router
