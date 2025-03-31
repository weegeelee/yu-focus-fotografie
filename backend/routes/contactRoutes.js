import express from "express";
import Contact from "../models/Contact.js";
import authenticateJWT from "../middleware/authenticateJWT.js";

const router = express.Router();

router.post('/contact', async (req, res) => {
    try {
        const { firstname, lastname, email, phone = "", message } = req.body;
        const contact = new Contact({firstname, lastname, email, phone, message});
        await contact.save();
        res.json({ success: true, message: "Contact form submitted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error saving contact form" });
    }
});

router.get('/contact', authenticateJWT, async (req, res) => {
    try {
        if (!req.user.isAdmin) {
            return res.status(403).json({ success: false, message: 'Access denied' });
        }
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});

router.delete('/contact/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Contact.findByIdAndDelete(id);
        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete", error });
    }
});

router.post('/contact/batch-delete', async (req, res) => {
    try {
        const { ids } = req.body;
        await Contact.deleteMany({ _id: { $in: ids } });
        res.status(200).json({ message: "Batch delete successful" });
    } catch (error) {
        res.status(500).json({ message: "Failed to batch delete", error });
    }
});

export default router;