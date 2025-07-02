import React, { useState, useRef, useEffect } from "react";
import {
  Rocket,
  User,
  Moon,
  Sun,
  LogOut,
  FileText,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const dropdownRef = useRef();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleToggleMode = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-gradient-to-r from-purple-700 to-indigo-700 text-white shadow-lg py-3 sm:py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer hover:scale-105 hover:opacity-90 transition-transform duration-300"
        >
          <Rocket size={28} className="text-white" />
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight antialiased">
            DevPost
          </h1>
        </div>

        <div className="relative" ref={dropdownRef}>
          <button onClick={() => setDropdownOpen(!dropdownOpen)}>
            <img
              src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlLzdUsfKOKHovAkUWdTOMdDuZgpVE9T_PTw&s`}
              alt="avatar"
              className="w-12 h-12 rounded-full cursor-pointer"
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-gray-700 rounded-lg shadow-lg py-2 z-50 animate-fade-in">
              {isLoggedIn ? (
                <>
     
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border-b border-purple-200 transition cursor-pointer flex items-center gap-2"
                  >
                    <User size={16} className="text-purple-600" />
                    Profile
                  </button>

    
                  <button
                    onClick={() => {
                      navigate("/myposts");
                      setDropdownOpen(false);
                    }}
                    className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100 transition cursor-pointer"
                  >
                    <FileText size={16} />
                    My Posts
                  </button>
                </>
              ) : null}

  
              <button
                onClick={handleToggleMode}
                className="flex justify-between items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 transition cursor-pointer"
              >
                {darkMode ? (
                  <span className="flex items-center gap-2">
                    <Sun size={16} />
                    Light Mode
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Moon size={16} />
                    Dark Mode
                  </span>
                )}
              </button>

              {isLoggedIn ? (
            
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 transition cursor-pointer"
                >
                  <LogOut size={16} />
                  Log Out
                </button>
              ) : (
  
                <button
                  onClick={() => {
                    navigate("/login");
                    setDropdownOpen(false);
                  }}
                  className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-green-100 text-green-700 transition cursor-pointer"
                >
                  <LogOut size={16} />
                  Login
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
