const express = require("express");
const {
  getAllPosts,
  getSinglePost,
  createPost,
  deletePost,
  updatePost,
  getPostsByUser,
  getMyPosts,
  likePost,
  dislikePost,
  addComment,
} = require("../Controllers/post.controllers");

const { protect } = require("../middleware/auth.middleware");
const router = express.Router();

// ======== Public Routes ========
router.get("/", getAllPosts); // GET all posts
router.get("/user/:id", getPostsByUser); // Posts by any user ID
// router.get("/post/:id", getPostById);
router.get("/post/:id", getSinglePost); // Single post details

// ======== Protected Routes ========
router.get("/myposts", protect, getMyPosts); // Logged-in user's posts
router.post("/", protect, createPost); // Create post
router.put("/:id", protect, updatePost); // Update post
router.delete("/:id", protect, deletePost); // Delete post
router.post("/:id/like", protect, likePost); // Like post
router.post("/:id/dislike", protect, dislikePost); // Dislike post
router.post("/post/:postId/comment", protect, addComment); // Comment on post

module.exports = router;
