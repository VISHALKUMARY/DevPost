import { useEffect, useState } from "react";
import axios from "axios";
import base_url from "../context/context";
import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../app.css";

function PostList() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${base_url}post`);
        setPosts(response.data.posts);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${base_url}post/${id}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
      toast.success(res.data.message);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">

      <div className="flex justify-between items-center mt-16 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-600">
          All Posts
        </h2>
        <button
          onClick={() => navigate("/create")}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-full shadow-md transition duration-300 cursor-pointer flex items-center gap-2"
        >
          <span className="text-2xl leading-none font-bold">+</span>
          Create Post
        </button>
      </div>

 
      <p className="text-center text-xl text-gray-600 font-semibold italic mt-4 mb-10 tracking-wide animate-fade-in">
        “Share your thoughts, inspire the world.”
      </p>

     
      {error ? (
        <p className="text-center text-red-600 text-lg">{error}</p>
      ) : posts.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          No posts yet. Be the first to create one!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition duration-300 flex flex-col justify-between"
            >
              <div>
                <h4 className="text-xl font-bold text-purple-700 mb-2">
                  {post.title}
                </h4>
                <p className="text-gray-700 text-sm whitespace-pre-wrap">
                  {post.content}
                </p>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  onClick={() => navigate(`/edit/${post._id}`)}
                  className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white py-1.5 px-4 rounded-md text-sm transition cursor-pointer"
                >
                  <Pencil size={16} /> Edit
                </button>
                <button
                  onClick={() =>
                    window.confirm(
                      "Are you sure you want to delete this post?"
                    ) && handleDelete(post._id)
                  }
                  className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white py-1.5 px-4 rounded-md text-sm transition cursor-pointer"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PostList;
