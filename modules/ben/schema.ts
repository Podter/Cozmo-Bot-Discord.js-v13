import mongoose from "mongoose";

const schema = new mongoose.Schema({
    guildId: {
        type: String,
        required: true,
    },
    channelId: {
        type: String,
        required: true,
    }
})

export default mongoose.model('ben', schema, 'ben');