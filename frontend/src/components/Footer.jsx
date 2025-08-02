import React from "react";
import {
  Rocket,
  Github,
  Facebook,
  Linkedin,
  Instagram,
} from "lucide-react";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiMongodb,
  SiExpress,
  SiNodedotjs,
} from "react-icons/si";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-indigo-800 via-purple-700 to-purple-800 text-white py-10 px-4 shadow-inner z-40">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6 text-center sm:text-left">
        {/* Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Rocket size={28} />
          <span className="text-xl sm:text-3xl font-bold tracking-wide">
            DevPost
          </span>
        </div>

        {/* Social Links */}
        <div className="flex gap-4 justify-center">
          <a href="https://github.com/VISHALKUMARY" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition">
            <Github size={26} />
          </a>
          <a href="https://www.facebook.com/share/1AebAJuQTs/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition">
            <Facebook size={26} />
          </a>
          <a href="https://www.linkedin.com/in/vishal-kumar-71a2a5251" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition">
            <Linkedin size={26} />
          </a>
          <a href="https://www.instagram.com/vixhal_.10x" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition">
            <Instagram size={26} />
          </a>
        </div>

        {/* Tech Stack Label */}
        <div className="text-sm sm:text-base font-medium text-gray-200">
          Built with <span className="font-semibold text-white">MERN Stack</span>
        </div>
      </div>

      {/* Tech Stack Icons */}
      <div className="mt-10 flex flex-wrap justify-center sm:justify-end items-center gap-4 sm:gap-6 text-sm px-2">
        {[
          { href: "https://developer.mozilla.org/en-US/docs/Web/HTML", icon: <SiHtml5 size={22} className="text-orange-500" />, label: "HTML" },
          { href: "https://developer.mozilla.org/en-US/docs/Web/CSS", icon: <SiCss3 size={22} className="text-blue-500" />, label: "CSS" },
          { href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", icon: <SiJavascript size={22} className="text-yellow-400" />, label: "JS" },
          { href: "https://reactjs.org", icon: <SiReact size={22} className="text-cyan-400" />, label: "React" },
          { href: "https://tailwindcss.com", icon: <SiTailwindcss size={22} className="text-sky-400" />, label: "Tailwind" },
          { href: "https://nodejs.org", icon: <SiNodedotjs size={22} className="text-green-500" />, label: "Node" },
          { href: "https://expressjs.com", icon: <SiExpress size={22} className="text-gray-300" />, label: "Express" },
          { href: "https://mongodb.com", icon: <SiMongodb size={22} className="text-green-400" />, label: "MongoDB" },
        ].map((tech, i) => (
          <a
            key={i}
            href={tech.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center hover:scale-105 transition"
          >
            {tech.icon}
            <span className="mt-1 text-xs">{tech.label}</span>
          </a>
        ))}
      </div>

      {/* Bottom Copyright */}
      <div className="mt-8 text-center text-sm sm:text-md text-gray-100 leading-relaxed">
        © 2025 <span className="font-semibold text-white">DevPost</span>. Crafted with React & TailwindCSS.<br />
        <span className="font-semibold text-white">by Vishal Kumar</span>
      </div>
    </footer>
  );
};

export default Footer;
