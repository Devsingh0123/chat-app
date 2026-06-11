import jwt from "jsonwebtoken";
import User from "../models/User.js";


export const isAuthenticated = async (req, res, next) => {
  try {
    // 1. cookie se token lo
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not logged in" });
    }

    // 2. verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. user find karo
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // 4. request me user attach karo
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};