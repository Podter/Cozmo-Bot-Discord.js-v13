import { QueryType } from "discord-player"
import express from "express"
const router = express.Router()
import { getQueue, getVc } from '../getFunctions'
import { player } from "../../../index"

router.get('/', (_req, res) => {
    res.status(400).json({ error: 'No id provided', code: 400 })
})

router.get('/:id', async (req, res) => {
    const guildId: any = req.params.id
    const queue = getQueue(guildId)
    if (!queue || !queue.current) {
        res.status(404).json({ error: 'No queue in this server or server not found', code: 404 })
        return
    } else if (!req.query.song) {
        res.status(400).json({ error: 'No song provided', code: 400 })
        return
    } else if (!req.query.userid) {
        res.status(400).json({ error: 'No user id provided', code: 400 })
        return
    } else if (!getVc(guildId, req.query.userid)) {
        res.status(400).json({ error: 'User is not in a voice channel', code: 400 })
        return
    }
    const song = `${req.query.song}`
    const requestedUser = `${req.query.userid}`
    if (song.startsWith("https://open.spotify.com/playlist") || song.startsWith("http://open.spotify.com/playlist") || song.startsWith("open.spotify.com/playlist") || song.includes("/playlist/")) {
        const result = await player.search(song, {
            requestedBy: requestedUser,
            searchEngine: QueryType.SPOTIFY_PLAYLIST
        })
        if (result.tracks.length === 0) {
            res.status(404).json({ error: 'No results', code: 404 })
            return
        } else {
            queue.addTracks(result.tracks)
            res.status(200).json({ error: 'Added to queue', code: 200 })
            return
        }
    } else if (song.startsWith("https://open.spotify.com/album") || song.startsWith("http://open.spotify.com/album") || song.startsWith("open.spotify.com/album") || song.includes("/album/")) {
        const result = await player.search(song, {
            requestedBy: requestedUser,
            searchEngine: QueryType.SPOTIFY_ALBUM
        })
        if (result.tracks.length === 0) {
            res.status(404).json({ error: 'No results', code: 404 })
            return
        } else {
            queue.addTracks(result.tracks)
            res.status(200).json({ error: 'Added to queue', code: 200 })
            return
        }
    } else if (song.startsWith("https://www.youtube.com/playlist?") || song.startsWith("http://www.youtube.com/playlist?") || song.startsWith("https://youtube.com/playlist?") || song.startsWith("http://youtube.com/playlist?") || song.startsWith("youtube.com/playlist?") || song.startsWith("www.youtube.com/playlist?") || song.includes("playlist?") || song.includes("&list")) {
        const result = await player.search(song, {
            requestedBy: requestedUser,
            searchEngine: QueryType.YOUTUBE_PLAYLIST
        })
        if (result.tracks.length === 0) {
            res.status(404).json({ error: 'No results', code: 404 })
            return
        } else {
            queue.addTracks(result.tracks)
            res.status(200).json({ error: 'Added to queue', code: 200 })
            return
        }
    } else {
        const result = await player.search(song, {
            requestedBy: requestedUser,
            searchEngine: QueryType.AUTO
        })
        if (result.tracks.length === 0) {
            res.status(404).json({ error: 'No results', code: 404 })
            return
        } else {
            queue.addTracks(result.tracks)
            res.status(200).json({ error: 'Added to queue', code: 200 })
            return
        }
    }
})

export default router
