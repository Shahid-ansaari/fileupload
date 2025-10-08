const mongoose = require('mongoose')


const videoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String },
    tags: { type: String },
    public_id: { type: String, required: true },
    url: { type: String, required: true },
    duration: { type: Number },
    size: { type: Number },
    createdAt: { type: Date, default: Date.now }
});

const Video = mongoose.model("Video", videoSchema);
module.exports = Video;
