import { QueryType } from "discord-player"
import { player, client } from "../../index"

export function getQueue(guildId: any) {
    try {
        return player.getQueue(guildId)
    } catch (err) {
        return null
    }
}

export function getVc(guildId: any, userId: any) {
    try {
        const guild = client.guilds.cache.get(`${guildId}`)
        const member = guild.members.cache.get(`${userId}`)
        return member.voice.channel
    } catch (err) {
        return null
    }
}

export async function play(song: any, requestedUser: any, res: any, queue: any) {
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
}