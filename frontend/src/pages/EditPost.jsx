import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import base_url from "../context/context";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

axios.defaults.withCredentials = true;

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(`${base_url}post/${id}`);
        const post = data?.post;
        if (post) {
          setFormData({ title: post.title, content: post.content });
        } else {
          toast.error("Post not found.");
          navigate("/"); 
        }
      } catch(err) {
        console.log(err);
        
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { title, content } = formData;
    if (!title.trim() || !content.trim()) {
      toast.error("Both title and content are required.");
      return;
    }

    setUpdating(true);
    try {
      await axios.put(`${base_url}post/${id}`, formData);
      toast.success("Post updated successfully!");
      navigate("/");
    } catch {
      toast.error("Update failed. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  return (
   <div className="min-h-auto mt-20 px-4 sm:px-6 py-10 bg-white rounded-3xl shadow-2xl border border-gray-200 max-w-3xl mx-auto">
  <h2 className="text-2xl sm:text-4xl font-extrabold text-center text-purple-700 mb-8 sm:mb-10">
    ✏️ Edit Your Post
  </h2>

  {loading ? (
    <div className="flex justify-center items-center text-gray-500 text-sm sm:text-base">
      <Loader2 className="animate-spin mr-2" />
      Loading post data...
    </div>
  ) : (
    <form onSubmit={handleUpdate} className="space-y-6 sm:space-y-8">
      {/* Title */}
      <div>
        <label
          htmlFor="title"
          className="block text-base sm:text-lg font-semibold text-gray-800 mb-2"
        >
          Title <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          placeholder="Edit your post title"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 outline-none text-gray-900 text-sm sm:text-base"
          required
        />
      </div>

      {/* Content */}
      <div>
        <label
          htmlFor="content"
          className="block text-base sm:text-lg font-semibold text-gray-800 mb-2"
        >
          Content <span className="text-red-500">*</span>
        </label>
        <textarea
          id="content"
          name="content"
          rows="6"
          value={formData.content}
          onChange={handleChange}
          placeholder="Update your post content"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm resize-none focus:ring-2 focus:ring-purple-500 outline-none text-gray-900 text-sm sm:text-base"
          required
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          type="submit"
          disabled={updating}
          className="w-full sm:w-auto flex justify-center items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-sm sm:text-base font-semibold py-3 px-6 rounded-xl shadow-md transition disabled:opacity-50"
        >
          {updating ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" />
              Updating...
            </>
          ) : (
            "Update Post"
          )}
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-full sm:w-auto bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm sm:text-base font-semibold py-3 px-6 rounded-xl shadow-sm transition"
        >
          Cancel
        </button>
      </div>
    </form>
  )}
</div>

  );
};

export default EditPost;
