const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");
const {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  updateUserProfile,
  deleteUser,
  getProfile,
  followUser,
} = require("../Controllers/user.controllers");

// Auth routes
router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateUserProfile);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, deleteUser);
router.post("/:id/follow", protect, followUser);



module.exports = router;
