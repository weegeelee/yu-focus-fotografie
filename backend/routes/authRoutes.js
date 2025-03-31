import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import authenticateJWT from "../middleware/authenticateJWT.js";

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = '3h';  
const JWT_REFRESH_EXPIRATION = '1d';

router.post("/signup", async (req, res) => {
    try {
        const { firstname, lastname, email, password, street, postal, city } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, errors: "Existing user found with same email address." })
        }
        if (!password || password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters." });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ firstname, lastname, email, password: hashedPassword, street, postal, city });

        await user.save();

        const data = {
            user: {
                id: user.id
            }
        };
        const token = jwt.sign(data, JWT_SECRET);
        res.status(200).json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        const isAdmin = user.isAdmin;

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
        const refreshToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_REFRESH_EXPIRATION });

        res.status(200).json({
            userId: user._id.toString(),
            firstname: user.firstname,
            email: user.email,
            token: token,
            refreshToken: refreshToken,
            isAdmin: isAdmin
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

router.get("/admin/status", authenticateJWT, (req, res) => {
    console.log("Checking admin status for user:", req.user);
    res.json({ isAdmin: req.user.isAdmin });
});

router.get("/users/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        console.log("Requested User ID:", userId);
  
        const user = await User.findById(userId).lean();
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user details", error: error.message });
    }
});

export default router;
