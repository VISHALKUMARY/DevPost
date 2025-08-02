import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import base_url from "../context/context";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${base_url}users/signup`, formData, {
        withCredentials: true,
      });

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem(
        "avatarUrl",
        user.avatar ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6b21a8&color=fff`
      );

      toast.success("Signup successful!");
      window.dispatchEvent(new Event("login"));
      navigate("/");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Signup failed. Try again later."
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-200 via-purple-100 to-pink-100 px-4 py-12">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-purple-700 mb-2 drop-shadow">
        Join DevPost 🚀
      </h1>
      <p className="text-center text-gray-600 text-sm sm:text-base italic mb-8 max-w-xs sm:max-w-md">
        “Empower your voice, inspire the world. Create. Share. Connect.”
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-8 sm:p-10 rounded-3xl shadow-xl border border-purple-200 space-y-6"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-center text-purple-700">
          Create Your Account
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="w-full px-4 py-3 border border-gray-300  text-black rounded-xl shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
            className="w-full px-4 py-3 border border-gray-300 text-black rounded-xl shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full px-4 py-3 border border-gray-300 text-black rounded-xl pr-12 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          <div className="flex gap-4 items-center justify-center text-sm text-gray-700 font-medium">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="role"
                value="user"
                checked={formData.role === "user"}
                onChange={handleChange}
                className="accent-purple-600"
              />
              User
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="role"
                value="admin"
                checked={formData.role === "admin"}
                onChange={handleChange}
                className="accent-purple-600"
              />
              Admin
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition hover:scale-[1.02]"
        >
          Sign Up
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
