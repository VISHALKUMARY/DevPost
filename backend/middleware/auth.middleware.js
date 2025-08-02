const jwt = require("jsonwebtoken");
const User = require("../Model/user.model");

const protect = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Not authorized, token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded JWT:", decoded);

    const user = await User.findById(decoded.id).select("_id name image role"); // Include necessary fields

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; // Attach full user object for use in controllers
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = { protect };
