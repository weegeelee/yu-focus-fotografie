import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET;
console.log("JWT_SECRET:", JWT_SECRET); 

const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  jwt.verify(token, JWT_SECRET, async (error, decoded) => {
    if (error) {
      return res.status(403).json({ message: "Forbidden: Invalid token" });
    }

    console.log("Decoded JWT:", decoded);

    try {
      const user = await User.findById(decoded.userId).select("isAdmin"); 
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      req.user = { id: user._id, isAdmin: user.isAdmin }; 
      next();
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  });
};

export default authenticateJWT;