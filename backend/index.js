const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");

const postRoutes = require("./routes/post.routes");
const userRoutes = require("./routes/user.routes");

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// ✅ CORS setup
const corsOptions = {
  origin: "https://devpost.onrender.com",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// ✅ Handle preflight CORS for all routes
app.options("*", cors(corsOptions));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/post", postRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
