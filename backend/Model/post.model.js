const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author:{
      type: String,
    },
    authorId:{
      type: String,
    }
  },
  { timestamps: true }
);

const PostModel = mongoose.model("Post", postSchema);
module.exports = PostModel;
