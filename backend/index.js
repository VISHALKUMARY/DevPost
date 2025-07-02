const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const postRoutes =require("./routes/post.routes")
const userRoutes = require("./routes/user.routes");

const app = express();
dotenv.config();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/post", postRoutes);


app.listen(process.env.PORT || 8000, () => {
  console.log(`Server running at http://localhost:${process.env.PORT || 8000}`);
});
