const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");

const postRoutes = require("./routes/post.routes");
const userRoutes = require("./routes/user.routes");

dotenv.config();

const app = express();

// ✅ 1. Define CORS options
const corsOptions = {
  origin: "https://devpost.onrender.com", // Your frontend
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// ✅ 2. Apply CORS middleware BEFORE routes/middleware
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle preflight with same config

// ✅ 3. Apply other middleware
app.use(express.json());
app.use(cookieParser());

// ✅ 4. Connect to MongoDB
connectDB();

// ✅ 5. Routes
app.use("/api/users", userRoutes);
app.use("/api/post", postRoutes);

// ✅ 6. Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ 7. Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
