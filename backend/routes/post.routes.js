const express = require('express');
const {
  getPost,
  createPost,
  deletePost,
  updatePost,
  getPostById,
  getPostsByUser,
} = require('../Controllers/post.controllers');

const router = express.Router();

router.get("/", getPost);                
router.post("/", createPost);           
router.get("/user/:id", getPostsByUser); 
router.get("/:id", getPostById);        
router.put("/:id", updatePost);   
router.delete("/:id", deletePost);

module.exports = router;
