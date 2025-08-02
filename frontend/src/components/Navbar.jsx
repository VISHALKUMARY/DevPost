import React, { useState, useRef, useEffect } from "react";
import {
  Rocket,
  User,
  Moon,
  Sun,
  LogOut,
  FileText,
  HelpCircle,
  Menu,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const dropdownRef = useRef();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    window.dispatchEvent(new Event("logout"));
    navigate("/login");
    toast.success("Logged out successfully");
  };

  const handleToggleMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
    document.documentElement.classList.toggle("dark", newMode);
  };

  const syncLoginState = () => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    setIsLoggedIn(!!token);
    setUser(storedUser ? JSON.parse(storedUser) : null);
  };

  useEffect(() => {
    syncLoginState();
    const dark = localStorage.getItem("darkMode") === "true";
    setDarkMode(dark);
    document.documentElement.classList.toggle("dark", dark);

    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("login", syncLoginState);
    window.addEventListener("logout", syncLoginState);
    window.addEventListener("storage", syncLoginState);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("login", syncLoginState);
      window.removeEventListener("logout", syncLoginState);
      window.removeEventListener("storage", syncLoginState);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const avatarUrl =
    user?.image && user?.image.startsWith("http")
      ? user.image
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
          user?.name || "User"
        )}&background=6b21a8&color=fff`;

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-gradient-to-r from-purple-700 to-indigo-700 text-white shadow-xl py-3 sm:py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
        {/* === Logo === */}
        <div
          onClick={() =>
            isLoggedIn ? navigate("/") : toast.error("Please login first")
          }
          className="flex items-center gap-2 cursor-pointer hover:scale-105 transition duration-300"
        >
          <Rocket size={26} className="text-white drop-shadow" />
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            DevPost
          </h1>
        </div>

        {/* === Mobile Menu Button === */}
        {!isLoggedIn && (
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden text-white"
          >
            <Menu size={28} />
          </button>
        )}

        {/* === Desktop Right Buttons === */}
        {!isLoggedIn && (
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 rounded-full bg-white text-purple-700 font-semibold hover:bg-purple-100 transition shadow-sm flex items-center gap-2"
            >
              <LogOut size={16} />
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-4 py-2 rounded-full bg-white text-purple-700 font-semibold hover:bg-purple-100 transition shadow-sm flex items-center gap-2"
            >
              <User size={16} />
              Sign Up
            </button>
          </div>
        )}

        {/* === Mobile Menu === */}
        {!isLoggedIn && mobileMenuOpen && (
          <div className="absolute top-16 right-4 w-44 bg-white text-purple-800 rounded-xl shadow-lg z-50 p-4 flex flex-col gap-2 sm:hidden">
            <button
              onClick={() => {
                navigate("/login");
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded hover:bg-purple-100 flex items-center gap-2"
            >
              <LogOut size={16} />
              Login
            </button>
            <button
              onClick={() => {
                navigate("/signup");
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded hover:bg-purple-100 flex items-center gap-2"
            >
              <User size={16} />
              Sign Up
            </button>
          </div>
        )}

        {/* === Logged In User Avatar Dropdown === */}
        {isLoggedIn && (
          <div className="flex items-center gap-4 relative" ref={dropdownRef}>
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <div className="rounded-full border-2 border-white relative">
                <img
                  src={avatarUrl}
                  alt="User avatar"
                  className="w-11 h-11 rounded-full object-cover cursor-pointer"
                />
                <Menu
                  size={20}
                  className="cursor-pointer absolute -bottom-0.5 -right-1 bg-white text-purple-700 rounded-full p-0.5 shadow"
                />
              </div>

              {dropdownOpen && (
                <div className="absolute right-0 w-52 bg-white text-gray-800 rounded-lg shadow-xl py-2 z-50 animate-fade-in mr-3">
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border-b border-purple-200 flex items-center gap-2"
                  >
                    <User size={16} />
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      navigate("/MyPosts");
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <FileText size={16} />
                    My Posts
                  </button>
                  {/* <button
                    onClick={handleToggleMode}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                  >
                    {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                    {darkMode ? "Light Mode" : "Dark Mode"}
                  </button> */}
                  <button
                    onClick={() => {
                      navigate("/help");
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <HelpCircle size={16} />
                    Help
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 flex items-center gap-2 cursor-pointer"
                  >
                    <LogOut size={16} />
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
