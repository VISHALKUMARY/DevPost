import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import base_url from "../context/context";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${base_url}users/login`, formData);
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-200 via-purple-100 to-pink-100 px-4 py-10">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-purple-700 mb-2 animate-fade-in-down drop-shadow">
        Welcome Back 👋
      </h1>
      <p className="text-base sm:text-lg text-gray-600 italic mb-8 text-center max-w-lg animate-fade-in-up">
        “Continue your journey of creativity and connection.”
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-lg border border-purple-200 animate-fade-in space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-purple-700">
          Login to DevPost
        </h2>

        <div className="space-y-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
            className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 rounded-xl  "
        >
          Login
        </button>

        <p className="text-sm mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <span
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
