import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import base_url from "../context/context";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
  
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${base_url}user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { name, email, image } = res.data.user;
        setName(name);
        setEmail(email);
        setImage(image);
      } catch (err) {
        console.error("Error loading profile:", err);
      }
    };
    if (!name && !email && !image && !loading) {
  return <div className="mt-24 text-center">Loading profile...</div>;
}


    if (user && token) fetchProfile();
  }, [token]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_upload_preset"); 
    setLoading(true);
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", 
        formData
      );
      setImage(res.data.secure_url);
      toast.success("Image uploaded");
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    const updatedData = { name, email, image };

    try {
      const res = await axios.put(`${base_url}user/profile`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Profile updated!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-24 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl text-center space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
        Edit Profile
      </h2>

      <div className="relative inline-block">
        <img
          src={image || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-purple-500"
        />
        <label className="absolute bottom-0 right-0 bg-purple-600 text-white p-1 rounded-full cursor-pointer hover:bg-purple-700 transition">
          📷
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>
      </div>
      {loading && <p className="text-purple-600">Uploading...</p>}

      <div className="space-y-4 text-left">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Name
          </label>
          <input
            type="text"
            className="w-full mt-1 px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            className="w-full mt-1 px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-full transition"
      >
        Save Changes
      </button>
    </div>
  );
};

export default Profile;
