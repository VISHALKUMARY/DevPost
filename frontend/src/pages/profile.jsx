import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import base_url from "../context/context";
import { User, Mail, Lock, Info, Edit, Save, X } from "lucide-react";

axios.defaults.withCredentials = true;

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [role, setRole] = useState("");
  const [bio, setBio] = useState("");
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [posts, setPosts] = useState([]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("user"))?._id;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(`${base_url}users/profile`);
        const { name, email, image, role, bio, followers, following, posts } = res.data.user;
        setName(name);
        setEmail(email);
        setImage(image);
        setRole(role);
        setBio(bio || "");
        setFollowers(followers || []);
        setFollowing(following || []);
        setPosts(posts || []);
      } catch (err) {
        toast.error("Failed to load user details.");
        if (!userId) {
          toast.warning("Please log in first.");
          navigate("/login");
        }
      } finally {
        setIsFetching(false);
      }
    };
    if (userId) fetchUserProfile();
    else setIsFetching(false);
  }, [userId, navigate]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "first_time_using_cloudinary");
    setLoading(true);
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dw40dxjwf/image/upload",
        formData,
        {
          withCredentials: false,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setImage(res.data.secure_url);
      toast.success("Image uploaded successfully!");
    } catch {
      toast.error("Image upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (password && password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    const updatedData = {
      name: name.trim(),
      email: email.trim(),
      image,
      bio: bio.trim(),
    };
    if (password.trim()) updatedData.password = password.trim();
    setLoading(true);
    try {
      const res = await axios.put(`${base_url}users/profile`, updatedData);
      if (res.data?.success) {
        toast.success("Profile updated successfully!");
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setPassword("");
        setConfirmPassword("");
        setEditMode(false);
      } else {
        toast.error("Update failed.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Profile update failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully.");
    navigate("/login");
  };

  if (isFetching) {
    return (
      <div className="h-screen flex items-center justify-center text-lg text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 via-purple-100 to-white flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="w-full max-w-3xl bg-white/90 backdrop-blur-md border border-purple-200 rounded-3xl shadow-2xl p-6 sm:p-10 relative">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-purple-800 mb-6">
          👤 My Profile
        </h2>

        <div className="flex justify-center mb-6 relative">
          <img
            src={
              image ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                name || "User"
              )}&background=6b21a8&color=fff`
            }
            alt="Profile"
            className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover border-8 border-purple-600 shadow-lg"
          />
          {editMode && (
            <label
              title="Upload new image"
              className="absolute bottom-2 right-[calc(50%-56px)] bg-purple-700 hover:bg-purple-800 p-2 rounded-full cursor-pointer shadow-md"
            >
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              <Edit size={16} className="text-white" />
            </label>
          )}
        </div>

        <p className="text-center font-medium text-sm text-purple-600 mb-4">
          Role: {role?.toUpperCase() || "USER"}
        </p>

        {loading && (
          <p className="text-center text-purple-700 font-semibold mb-4 animate-pulse">
            Processing...
          </p>
        )}

        {!editMode ? (
          <>
            <div className="text-center space-y-3">
              <p className="text-xl sm:text-2xl font-semibold text-gray-800">
                {name}
              </p>
              <p className="text-gray-500 italic whitespace-pre-wrap mt-3 text-sm flex justify-center items-start gap-2">
                <Info size={18} className="mt-0.5" />
                {bio || "No bio added."}
              </p>
            </div>
            <div className="mt-6 flex justify-center gap-6 sm:gap-10 text-center">
              <Count label="Followers" value={followers.length} />
              <Count label="Following" value={following.length} />
              <Count label="Posts" value={posts.length} />
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField label="Full Name" value={name} setValue={setName} icon={<User />} />
              <InputField label="Email" value={email} setValue={setEmail} icon={<Mail />} />
              <InputField label="New Password" type="password" icon={<Lock />} value={password} setValue={setPassword} placeholder="Leave blank to keep current" />
              <InputField label="Confirm Password" type="password" icon={<Lock />} value={confirmPassword} setValue={setConfirmPassword} placeholder="Re-type new password" />
            </div>
            <div className="mt-6">
              <label className="block mb-2 text-gray-700 font-medium">Bio</label>
              <textarea
                rows="4"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us something about you..."
                className="w-full px-5 py-3 rounded-xl border text-black bg-white border-purple-300 focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>
          </>
        )}

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl text-sm sm:text-base font-semibold shadow-md flex items-center gap-2"
            >
              <Edit size={20} /> Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl text-sm sm:text-base font-semibold shadow-md flex items-center gap-2"
              >
                <Save size={20} /> Save Changes
              </button>
              <button
                onClick={() => {
                  setEditMode(false);
                  setPassword("");
                  setConfirmPassword("");
                }}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-3 rounded-xl text-sm sm:text-base font-semibold shadow-md flex items-center gap-2"
              >
                <X size={20} /> Cancel
              </button>
            </>
          )}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={handleLogout}
            className="text-sm text-red-600 hover:underline"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, type = "text", value, setValue, placeholder = "", icon }) => (
  <div>
    <label className="block mb-2 text-gray-700 font-medium">{label}</label>
    <div className="flex items-center border rounded-xl text-black bg-white border-purple-300 focus-within:ring-2 focus-within:ring-purple-500">
      {icon && <div className="pl-4 text-purple-600">{icon}</div>}
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 outline-none rounded-xl text-black"
      />
    </div>
  </div>
);

const Count = ({ label, value }) => (
  <div>
    <p className="text-xl font-bold text-purple-700 ">{value}</p>
    <p className="text-sm text-gray-600">{label}</p>
  </div>
);

export default Profile;
