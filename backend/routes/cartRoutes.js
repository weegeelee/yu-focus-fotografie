import express from "express";
import jwt from "jsonwebtoken";
import Cart from "../models/Cart.js";
import PhotoAlbum from "../models/PhotoAlbum.js";
import User from "../models/User.js";
import authenticateJWT from "../middleware/authenticateJWT.js";

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;
console.log("JWT_SECRET:", JWT_SECRET);

router.post("/cart", async (req, res) => {
    const { albumId, selectedPhotos = [], shippingAddress = [] } = req.body;

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'You need to log in first' });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId;

        const album = await PhotoAlbum.findOne({ id: albumId });
        if (!album) {
            return res.status(404).json({ message: 'Album not found' });
        }

        const cart = new Cart({
            userId,
            albumId: album.id,
            albumObjectId: album._id,
            selectedPhotos,
            shippingAddress, 
            date: new Date(),
        });
        await cart.save();
        res.json({ message: 'Cart submitted successfully', cart });
    } catch (err) {
        res.status(500).json({ message: 'Error submitting cart' });
    }
});

router.get("/customers", authenticateJWT, async (req, res) => {
    try {
        if (!req.user.isAdmin) {
            return res.status(403).json({ success: false, message: 'Access denied' });
        }
        const usersWithCarts = await User.aggregate([
            {
                $match: { isAdmin: false }
            },
            {
                $lookup: {
                    from: "carts",
                    localField: "_id",
                    foreignField: "userId",
                    as: "cart"
                }
            },
        ]);
        res.json(usersWithCarts);
    } catch (error) {
        res.status(500).json({ error: "Error fetching customers" });
    }
});

router.get("/customers/:id", authenticateJWT, async (req, res) => {
    try {
        const userIdFromToken = req.user.id
        const customerId = req.params.id;
        const isAdmin = req.user.isAdmin;
        
        if (!isAdmin && userIdFromToken.toString() !== customerId) {
            return res.status(403).json({ message: "Access denied" });
        }

        const customer = await User.findById(customerId).lean();
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        const cart = await Cart.find({ userId: customerId })
            .populate({
                path: "albumObjectId",
                model: "PhotoAlbum"
            })
            .populate({
                path: "selectedPhotos",
                model: "Photo",
                select: "imageUrl name"
            });
        res.json({ ...customer, cart });
    } catch (error) {
        res.status(500).json({ message: "Error fetching customer details", error: error.message });
    }
});

router.delete("/customers/:id", authenticateJWT, async (req, res) => {
    const { id } = req.params;
    try {
        await Promise.all([
            Cart.deleteMany({ userId: id }),
            User.findByIdAndDelete(id)
        ]);
        res.json({ message: "User and all their orders deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete user and their orders", error });
    }
});

export default router;
