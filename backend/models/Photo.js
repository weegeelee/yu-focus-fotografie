import mongoose from "mongoose";

const PhotoSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
    },
    imageUrl: {
        type: String,
        required: true
    },
    album: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PhotoAlbum',
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("Photo", PhotoSchema);