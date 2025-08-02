import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import base_url from "../context/context";
import { ArrowLeft, Loader2, User } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const SinglePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchPost = async () => {
      try {
        const res = await axios.get(`${base_url}post/${id}`);
        setPost(res.data.post);
        setComments(res.data.post.comments || []);
      } catch (err) {
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, navigate]);

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return;
    try {
      const res = await axios.post(`${base_url}post/${id}/comment`, { text: comment });

      setComments((prev) => [...prev, res.data.comment]);
      setComment("");
    } catch (err) {
      console.error("Failed to post comment");
    }
  };

  const renderContent = (content) => {
    const codeRegex = /```(\w+)?\n([\s\S]*?)```/g;

    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeRegex.exec(content)) !== null) {
      const [block, lang, code] = match;
      const start = match.index;

      if (start > lastIndex) {
        parts.push(<p key={lastIndex}>{content.slice(lastIndex, start)}</p>);
      }

      parts.push(
        <SyntaxHighlighter
          key={start + 1}
          language={lang || "javascript"}
          style={oneDark}
          className="rounded-lg my-4"
        >
          {code.trim()}
        </SyntaxHighlighter>
      );

      lastIndex = codeRegex.lastIndex;
    }

    if (lastIndex < content.length) {
      parts.push(<p key={lastIndex + 2}>{content.slice(lastIndex)}</p>);
    }

    return parts;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="animate-spin w-8 h-8 text-purple-600" />
      </div>
    );
  }

  if (!post) {
    return <p className="text-center text-red-500 mt-20">Post not found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
  {/* Back Button */}
  <button
    onClick={() => navigate(-1)}
    className="mb-6 sm:mb-8 flex items-center gap-2 text-purple-600 hover:text-purple-800 transition text-sm sm:text-base"
  >
    <ArrowLeft size={18} />
    <span className="font-medium">Back</span>
  </button>

  {/* Post Container */}
  <div className="bg-white shadow-md rounded-2xl p-4 sm:p-6 md:p-10 border border-purple-100">
    {/* Title */}
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-900 mb-4 break-words">
      {post.title}
    </h1>

    {/* Author Info */}
    <div className="flex items-center gap-3 mb-4 sm:mb-6 text-gray-600 text-sm">
      {post.author?.image ? (
        <img
          src={post.author.image}
          alt="Author"
          className="w-8 h-8 rounded-full object-cover"
        />
      ) : (
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
          <User size={16} className="text-gray-500" />
        </div>
      )}
      <span>
        <span className="font-semibold">{post.author?.name || "Anonymous"}</span>{" "}
        • {new Date(post.createdAt).toLocaleDateString()}
      </span>
    </div>

    <hr className="mb-6 border-gray-200" />

    {/* Content */}
    <div className="prose max-w-none text-gray-800 leading-relaxed whitespace-pre-wrap text-sm sm:text-base">
      {renderContent(post.content)}
    </div>

    {/* Comments Section */}
    <div className="mt-10 sm:mt-12">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-purple-800">
        Comments
      </h2>

      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((c, index) => (
            <div
              key={index}
              className="bg-gray-100 p-3 rounded-lg text-sm shadow-sm break-words"
            >
              {c.text}
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No comments yet.</p>
        )}
      </div>

      {/* Comment Input */}
      <div className="mt-6">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
          className="w-full border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm sm:text-base"
          rows={3}
        />
        <button
          onClick={handleCommentSubmit}
          className="mt-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition text-sm sm:text-base"
        >
          Post Comment
        </button>
      </div>
    </div>
  </div>
</div>

  );
};

export default SinglePost;
