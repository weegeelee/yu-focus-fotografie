import express from "express";
import PhotoAlbum from "../models/PhotoAlbum.js";

const router = express.Router();

router.post('/addalbum', async (req, res) => {
    try {
        const { id, name } = req.body;
        const photoAlbum = new PhotoAlbum({ id, name });
        await photoAlbum.save();
        res.json({ success: true, name });
    } catch (error) {
        res.status(500).json({ message: "Failed to create album", error });
    }
});

router.put('/albums/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const updatedAlbum = await PhotoAlbum.findOneAndUpdate(
            { id },
            { name },
            { new: true }
        );

        if (!updatedAlbum) {
            return res.status(404).json({ message: "Album not found" });
        }
        res.json({ success: true, album: updatedAlbum });
    } catch (error) {
        res.status(500).json({ message: "Failed to update album", error });
    }
});

router.get('/allalbums', async (req, res) => {
    try {
        const albums = await PhotoAlbum.find({});
        console.log("All Albums Fetched");
        res.json(albums);
    } catch (error) {
        res.status(500).json({ message: "Error fetching albums", error });
    }
});

router.get('/albums/:id', async (req, res) => {
    try {
        const albumId = req.params.id;
        const album = await PhotoAlbum.findOne({ id: albumId }).populate('photos'); 
        if (!album) {
            return res.status(404).json({ message: 'Album not found' });
        }
        res.json(album);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});

router.delete('/deletealbum/:id', async (req, res) => {
    try {
        const album = await PhotoAlbum.findOne({ id: req.params.id });
        if (!album) {
            return res.status(404).json({ message: "Album not found" });
        }
        await Photo.deleteMany({ album: album._id }); 
        await PhotoAlbum.findOneAndDelete({ id: req.params.id });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting album', error });
    }
});

export default router;