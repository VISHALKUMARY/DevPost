const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");

const postRoutes = require("./routes/post.routes");
const userRoutes = require("./routes/user.routes");

dotenv.config();

const app = express();

// Connect to DB
connectDB();

// ✅ CORS fix for Render (temporary open config — refine later)
app.use(cors({
  origin: true, // ✅ Reflects request origin
  credentials: true,
}));

// ✅ Also handle OPTIONS preflight for all routes
app.options("*", cors({
  origin: true,
  credentials: true,
}));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/post", postRoutes);

// Health check route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
