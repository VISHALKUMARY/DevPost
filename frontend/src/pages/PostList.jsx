import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import base_url from "../context/context";
import { ThumbsUp, ThumbsDown, UserPlus, Plus } from "lucide-react";

axios.defaults.withCredentials = true;

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [following, setFollowing] = useState([]);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsRes, userRes] = await Promise.all([
          axios.get(`${base_url}post`),
          axios.get(`${base_url}users/profile`),
        ]);
        setPosts(postsRes.data.posts);
        setCurrentUserId(userRes.data.user._id);
        setFollowing(userRes.data.user.following || []);
      } catch (err) {
        toast.error("Please log in to view posts.");
        navigate("/login");
      }
    };
    fetchData();
  }, [navigate]);

  const updatePostReaction = (postId, type) => {
    setPosts((prev) =>
      prev.map((post) =>
        post._id === postId
          ? {
              ...post,
              likes:
                type === "like"
                  ? post.likes.includes(currentUserId)
                    ? post.likes.filter((id) => id !== currentUserId)
                    : [...post.likes, currentUserId]
                  : post.likes.filter((id) => id !== currentUserId),
              dislikes:
                type === "dislike"
                  ? post.dislikes.includes(currentUserId)
                    ? post.dislikes.filter((id) => id !== currentUserId)
                    : [...post.dislikes, currentUserId]
                  : post.dislikes.filter((id) => id !== currentUserId),
            }
          : post
      )
    );
  };

  const handleLike = async (postId) => {
    try {
      await axios.post(`${base_url}post/${postId}/like`);
      updatePostReaction(postId, "like");
    } catch {
      toast.error("Failed to like post");
    }
  };

  const handleDislike = async (postId) => {
    try {
      await axios.post(`${base_url}post/${postId}/dislike`);
      updatePostReaction(postId, "dislike");
    } catch {
      toast.error("Failed to dislike post");
    }
  };

  const handleFollow = async (authorId) => {
    try {
      await axios.post(`${base_url}users/${authorId}/follow`);
      setFollowing((prev) =>
        prev.includes(authorId)
          ? prev.filter((id) => id !== authorId)
          : [...prev, authorId]
      );
    } catch {
      toast.error("Failed to follow user");
    }
  };

  const filteredPosts = (() => {
    if (filter === "trending")
      return [...posts].sort((a, b) => b.likes.length - a.likes.length);
    if (filter === "latest")
      return [...posts].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    return posts;
  })();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 mt-16">
      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {["all", "trending", "latest"].map((key) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition duration-300 ease-in-out ${
              filter === key
                ? "bg-purple-700 text-white shadow-md scale-105"
                : "bg-gray-200 text-gray-800 hover:bg-purple-100"
            }`}
          >
            {key === "all" && "All Posts"}
            {key === "trending" && "🔥 Trending"}
            {key === "latest" && "🕒 Latest"}
          </button>
        ))}
      </div>

      {/* Floating Create Button */}
      <button
        onClick={() => navigate("/create")}
        className="fixed bottom-20 right-5 sm:right-10 bg-purple-700 hover:bg-purple-800 text-white p-4 rounded-full shadow-lg z-50 transition-transform transform hover:scale-110"
        aria-label="Create Post"
      >
        <Plus size={24} />
      </button>

      {/* Inspirational Quote */}
      <p className="text-center text-lg text-gray-700 font-medium italic mb-10">
        “Share your thoughts, inspire the world.”
      </p>

      {/* Posts Grid */}
      {filteredPosts.length === 0 ? (
        <p className="text-center text-gray-500 text-base">No posts found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => {
            const isLiked = post.likes.includes(currentUserId);
            const isDisliked = post.dislikes.includes(currentUserId);
            const isFollowing = following.includes(post.author._id);

            return (
              <div
                key={post._id}
                className="bg-white border border-gray-200 rounded-2xl p-5 shadow-md hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1"
              >
                {/* Author Info */}
                <div
                  className="flex items-center gap-4 mb-4 cursor-pointer"
                  onClick={() =>
                    navigate(
                      post.author._id === currentUserId
                        ? "/myposts"
                        : `/users/${post.author._id}`
                    )
                  }
                >
                  <img
                    src={
                      post.author.image?.startsWith("http")
                        ? post.author.image
                        : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            post.author.name
                          )}&background=6b21a8&color=fff`
                    }
                    alt="User"
                    className="w-10 h-10 rounded-full border-2 border-purple-600 object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {post.author.name}
                    </p>
                    <p className="text-xs text-gray-500">Shared publicly</p>
                  </div>

                  {post.author._id !== currentUserId && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFollow(post.author._id);
                      }}
                      className={`ml-auto px-3 py-1 rounded-full text-xs flex items-center gap-1 transition ${
                        isFollowing
                          ? "bg-gray-200 text-gray-600"
                          : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                      }`}
                    >
                      <UserPlus size={14} />
                      {isFollowing ? "Following" : "Follow"}
                    </button>
                  )}
                </div>

                {/* Post Content */}
                <div>
                  <h3 className="text-lg font-bold text-purple-700 line-clamp-1 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-700 mb-3">
                    {post.content.split(" ").slice(0, 15).join(" ")}
                    {post.content.split(" ").length > 15 && "... "}
                    {post.content.split(" ").length > 15 && (
                      <button
                        onClick={() => navigate(`/posts/${post._id}`)}
                        className="text-purple-600 hover:underline text-sm"
                      >
                        Read more
                      </button>
                    )}
                  </p>
                </div>

                {/* Post Footer */}
                <div className="flex justify-between items-center text-xs text-gray-500 mt-4 pt-3">
  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
  <div className="flex gap-4">
    <button
      onClick={() => handleLike(post._id)}
      className={`flex items-center gap-1 transition ${
        isLiked ? "text-green-600" : "text-gray-500"
      } hover:text-green-600`}
    >
      <ThumbsUp size={16} />
      {post.likes.length}
    </button>
    <button
      onClick={() => handleDislike(post._id)}
      className={`flex items-center gap-1 transition ${
        isDisliked ? "text-red-600" : "text-gray-500"
      } hover:text-red-600`}
    >
      <ThumbsDown size={16} />
      {post.dislikes.length}
    </button>
  </div>
</div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PostList;
