const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(process.env.MongoDB_URL)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection failed:", err));
};

module.exports = connectDB;
