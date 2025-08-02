const PostModel = require("../Model/post.model");

// ======================= GET ALL POSTS =======================
const getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("author", "name image");
    res.status(200).json({ success: true, message: "Posts fetched successfully", posts });
  } catch {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ======================= GET SINGLE POST =======================
const getSinglePost = async (req, res) => {
  const { id } = req.params;

  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid post ID" });
  }

  try {
    const post = await PostModel.findById(id).populate("author", "name image").populate("comments.user", "name image");
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }
    res.status(200).json({ success: true, message: "Post fetched successfully", post });
  } catch {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ======================= CREATE POST =======================
const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const { id } = req.user;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const newPost = new PostModel({ title, content, author: id });
    await newPost.save();

    res.status(201).json({
      success: true,
      message: "Post uploaded successfully",
      post: newPost,
    });
  } catch (error) {
    console.error("Error creating post:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ======================= UPDATE POST =======================
const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const updatedPost = await PostModel.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }
    res.status(200).json({ success: true, message: "Post updated successfully", post: updatedPost });
  } catch {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ======================= DELETE POST =======================
const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Post deleted successfully" });
  } catch {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ======================= GET POSTS BY USER =======================
const getPostsByUser = async (req, res) => {
  try {
    const posts = await PostModel.find({ author: req.params.id }).populate("author", "name image");
    res.status(200).json({ success: true, posts });
  } catch {
    res.status(500).json({ success: false, message: "Error fetching user posts" });
  }
};

const getMyPosts = async (req, res) => {
  try {
    const posts = await PostModel.find({ author: req.user.id }).populate("author", "name image");
    res.status(200).json({ success: true, posts });
  } catch {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ======================= LIKE / DISLIKE =======================
const likePost = async (req, res) => {
  const post = await PostModel.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });

  const userId = req.user._id.toString();
  if (post.likes.includes(userId)) {
    post.likes.pull(userId);
  } else {
    post.likes.push(userId);
    post.dislikes.pull(userId);
  }
  await post.save();
  res.status(200).json({ message: "Post liked", likes: post.likes });
};

const dislikePost = async (req, res) => {
  const post = await PostModel.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });

  const userId = req.user._id.toString();
  if (post.dislikes.includes(userId)) {
    post.dislikes.pull(userId);
  } else {
    post.dislikes.push(userId);
    post.likes.pull(userId);
  }
  await post.save();
  res.status(200).json({ message: "Post disliked", dislikes: post.dislikes });
};

// ======================= ADD COMMENT =======================
const addComment = async (req, res) => {
  const { postId } = req.params;
  const { text } = req.body;

  try {
    const post = await PostModel.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const newComment = {
      user: req.user._id,
      text,
    };

    post.comments.push(newComment);
    await post.save();

    res.status(201).json({ success: true, comment: newComment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding comment" });
  }
};

// ======================= EXPORTS =======================
module.exports = {
  getAllPosts,
  getSinglePost,
  createPost,
  updatePost,
  deletePost,
  getPostsByUser,
  getMyPosts,
  likePost,
  dislikePost,
  addComment,
};
