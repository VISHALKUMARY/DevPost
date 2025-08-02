import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import base_url from "../context/context";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

const CreatePost = () => {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const contentRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${base_url}users/profile`);
        setUser(res.data.user);
      } catch {
        toast.error("Failed to load user profile");
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${base_url}post`, formData);
      toast.success("Post created successfully!");
      setFormData({ title: "", content: "" });
      navigate(-1);
    } catch {
      toast.error("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  const avatarUrl = user?.image?.startsWith("http")
    ? user.image
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
        user?.name || "User"
      )}&background=6b21a8&color=fff`;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 mt-16 sm:mt-24 bg-white border border-gray-200 shadow-xl rounded-2xl sm:rounded-3xl">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-purple-700 mb-8 sm:mb-10">
        📝 Create a Post
      </h1>

      {user && (
        <div className="flex items-center gap-4 mb-6 sm:mb-8">
          <img
            src={avatarUrl}
            alt="User avatar"
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-purple-600 shadow-md object-cover"
          />
          <div>
            <p className="text-base sm:text-lg font-semibold text-gray-800">
              {user.name}
            </p>
            <p className="text-sm text-gray-500">
              What's on your mind today?
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-base sm:text-lg font-medium text-gray-700 mb-1 sm:mb-2"
          >
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="Give your post a title..."
            className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none shadow-sm text-gray-800 text-sm sm:text-base"
            required
          />
        </div>

        {/* Content */}
        <div>
          <label
            htmlFor="content"
            className="block text-base sm:text-lg font-medium text-gray-700 mb-1 sm:mb-2"
          >
            Content <span className="text-red-500">*</span>
          </label>
          <textarea
            ref={contentRef}
            id="content"
            name="content"
            rows="6"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your thoughts here... Markdown supported!"
            className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-purple-500 outline-none shadow-sm text-gray-800 text-sm sm:text-base"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-base sm:text-lg font-semibold py-2.5 sm:py-3 rounded-xl shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" />
              Posting...
            </>
          ) : (
            "Publish Post"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
