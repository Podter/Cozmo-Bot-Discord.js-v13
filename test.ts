import { Lyrics } from "@discord-player/extractor";
import dotenv from "dotenv";
dotenv.config();
const lyricsClient = Lyrics.init(process.env.GENIUS_ACCESS_TOKEN);

lyricsClient.search("asdasdasdasdasdasjdfkhkasldfj")
    .then(x => console.log(x))
    .catch(console.error);