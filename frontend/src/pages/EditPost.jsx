import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import base_url from "../context/context";
import { toast } from "react-toastify";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${base_url}post/${id}`);
        setFormData({
          title: res.data.post.title,
          content: res.data.post.content,
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${base_url}post/${id}`, formData);
      toast.success("Post updated successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
  };

  return (
    <div className="min-h-[500px] mt-24 bg-white rounded-3xl shadow-2xl border border-gray-200 p-10 max-w-3xl mx-auto">
      <h2 className="text-4xl font-extrabold text-center text-purple-700 mb-10">
        ✏️ Edit Your Post
      </h2>

      <form onSubmit={handleUpdate} className="space-y-8">
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
            placeholder="Edit your post title"
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
            rows="6"
            value={formData.content}
            onChange={handleChange}
            placeholder="Update your post content"
            className="w-full px-5 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 shadow-md resize-none focus:ring-2 focus:ring-purple-500 outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white text-2xl font-semibold py-3 rounded-xl shadow-lg transition duration-300"
        >
           Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPost;
