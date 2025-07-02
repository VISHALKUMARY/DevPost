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
      await axios.post(`${base_url}users/signup`, formData);
      toast.success("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-200 via-purple-100 to-pink-100 px-4 py-10">
      <h1 className="text-5xl font-extrabold text-purple-700 mb-2 animate-fade-in-down drop-shadow">
        Join DevPost 🚀
      </h1>
      <p className="text-base sm:text-lg text-gray-600 italic mb-8 text-center max-w-lg animate-fade-in-up">
        “Empower your voice, inspire the world. Create. Share. Connect.”
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-lg border border-purple-200 animate-fade-in space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-purple-700">
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
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition pr-12"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="role"
                value="user"
                checked={formData.role === "user"}
                onChange={handleChange}
                className="accent-purple-600"
              />
              <span className="text-gray-700 font-medium">User</span>
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
              <span className="text-gray-700 font-medium">Admin</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 rounded-xl shadow-lg transition-transform hover:scale-105"
        >
          Sign Up
        </button>

        <p className="text-sm mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <span
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
