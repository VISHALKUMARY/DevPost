const PostModel = require("../Model/post.model");
const mongoose = require("mongoose");

// Get all posts
const getPost = async (req, res) => {
  try {
    const posts = await PostModel.find();
    res
      .status(200)
      .json({ success: true, message: "Posts fetched successfully", posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Create a new post
const createPost = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res
      .status(400)
      .json({ success: false, message: "Title and content are required" });
  }

  try {
    const newPost = new PostModel({ title, content });
    await newPost.save();
    res
      .status(201)
      .json({
        success: true,
        message: "Post uploaded successfully",
        post: newPost,
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete post by ID
const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid post ID" });
  }

  try {
    const post = await PostModel.findByIdAndDelete(id);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Post deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update post by ID
const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid post ID" });
  }

  if (!title || !content) {
    return res
      .status(400)
      .json({ success: false, message: "Title and content are required" });
  }

  try {
    const updatedPost = await PostModel.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );

    if (!updatedPost) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get post by ID
const getPostById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid post ID" });
  }

  try {
    const post = await PostModel.findById(id);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    res.status(200).json({
      success: true,
      message: "Post fetched successfully",
      post,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getPostsByUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const posts = await PostModel.find({ author: userId });
    res.status(200).json({ success: true, posts });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Error fetching user posts" });
  }
};

module.exports = {
  getPostById,
  getPost,
  createPost,
  deletePost,
  updatePost,
  getPostsByUser,
};
