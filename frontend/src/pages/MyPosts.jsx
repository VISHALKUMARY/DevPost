import { useEffect, useState } from "react";
import axios from "axios";
import base_url from "../context/context";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

axios.defaults.withCredentials = true;

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [expandedPosts, setExpandedPosts] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const res = await axios.get(`${base_url}post/myposts`);
        setPosts(res.data.posts);
      } catch (err) {
        console.error(err);
        if (err.response?.status === 401) {
          toast.error("Unauthorized. Please log in.");
          navigate("/login");
        } else {
          toast.error("Failed to load your posts.");
        }
      }
    };

    fetchMyPosts();
  }, [navigate]);

  const handleDelete = (id) => {
    confirmAlert({
      title: "Are you sure?",
      message: "This will permanently delete your post.",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              const res = await axios.delete(`${base_url}post/${id}`);
              setPosts((prev) => prev.filter((post) => post._id !== id));
              toast.success(res.data.message || "Post deleted");
            } catch (err) {
              toast.error("Delete failed.");
            }
          },
        },
        { label: "No" },
      ],
    });
  };

  const toggleExpand = (id) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-4">
        <h2 className="text-4xl font-extrabold text-purple-800">My Posts</h2>
        <button
          onClick={() => navigate("/create")}
          className="fixed bottom-20 right-6 sm:right-10 z-50 bg-purple-700 hover:bg-purple-800 text-white p-4 rounded-full shadow-lg transition"
          aria-label="Create Post"
        >
          <Plus size={24} />
        </button>
      </div>

      {/* No Posts */}
      {posts.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          You haven&apos;t created any posts yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => {
            const isExpanded = expandedPosts[post._id];
            const contentToShow = isExpanded
              ? post.content
              : post.content.slice(0, 200);

            return (
              <div
                key={post._id}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl hover:scale-[1.01] transition-all duration-300 flex flex-col"
              >
                {/* Author */}
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={
                      post.author?.image?.startsWith("http")
                        ? post.author.image
                        : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            post.author?.name || "User"
                          )}&background=6b21a8&color=fff`
                    }
                    alt="Author avatar"
                    className="w-12 h-12 rounded-full border-2 border-purple-600 object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {post.author?.name || "Unknown"}
                    </p>
                    <p className="text-xs text-gray-500">Author</p>
                  </div>
                </div>

                {/* Title & Content */}
                <div className="flex-grow">
                  <h4 className="text-lg font-bold text-purple-700 mb-2 truncate">
                    {post.title}
                  </h4>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">
                    {contentToShow}
                    {post.content.length > 200 && (
                      <button
                        onClick={() => toggleExpand(post._id)}
                        className="ml-1 text-purple-600 hover:underline text-xs"
                      >
                        {isExpanded ? " Show Less" : "...Read More"}
                      </button>
                    )}
                  </p>
                </div>

                {/* Date */}
                <div className="mt-4 text-xs text-gray-400">
                  {new Date(post.createdAt).toLocaleString()}
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2 mt-6">
                  <button
                    onClick={() => navigate(`/edit/${post._id}`)}
                    className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm shadow transition"
                  >
                    <Pencil size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm shadow transition"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyPosts;
