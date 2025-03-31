import mongoose from "mongoose";

const PhotoAlbumSchema = new mongoose.Schema({
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    photos: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Photo',
    }],
    date: {
      type: Date,
      default: Date.now,
    },
  });

  export default mongoose.model("PhotoAlbum", PhotoAlbumSchema);

