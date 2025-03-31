import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    shippingAddress: {
        firstname: String,
        lastname: String,
        street: String,
        postal: String,
        city: String,
    },
    albumId: {
        type: String,
        required: true,
    },
    albumObjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PhotoAlbum",
        required: true,
    },
    selectedPhotos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Photo',
        required: true,
    }],
    date: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("Cart", CartSchema);