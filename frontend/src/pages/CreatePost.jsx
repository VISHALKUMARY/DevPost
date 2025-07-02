import React, { useState } from "react";
import axios from "axios";
import base_url from "../context/context";
import { toast } from "react-toastify";

const CreatePost = ({ onPostCreated }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.title.length > 100) {
      toast.error("Title must be under 100 characters.");
      return;
    }

    try {
      const res = await axios.post(`${base_url}post`, formData);
      toast.success("Post created successfully!");

      if (onPostCreated) {
        onPostCreated(res.data.post);
      }

      setFormData({ title: "", content: "" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-[500px] mt-24 bg-white rounded-3xl shadow-2xl border border-gray-200 p-10 max-w-3xl mx-auto">
      <h2 className="text-4xl font-extrabold text-center text-purple-700 mb-10">
        📝 Create a New Post
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label htmlFor="title" className="block text-lg font-semibold text-gray-800 mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter an eye-catching title"
            className="w-full px-5 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 shadow-md focus:ring-2 focus:ring-purple-500 outline-none"
            required
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-lg font-semibold text-gray-800 mb-2">
            Content <span className="text-red-500">*</span>
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="What's on your mind?"
            rows="6"
            className="w-full px-5 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 shadow-md resize-none focus:ring-2 focus:ring-purple-500 outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white text-2xl font-semibold py-3 rounded-xl shadow-lg transition duration-300"
        >
           Submit Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
