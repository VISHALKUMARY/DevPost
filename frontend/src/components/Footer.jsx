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
    <footer className="w-full bg-gradient-to-r from-indigo-800 via-purple-700 to-purple-800 text-white py-10 shadow-inner z-40">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-6 text-center sm:text-left">

        <div className="flex items-center gap-3">
          <Rocket size={32} />
          <span className="text-lg sm:text-4xl font-bold tracking-wide">
            DevPost
          </span>
        </div>


        <div className="flex gap-4">
          <a href="https://github.com/VISHALKUMARY" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition">
            <Github size={28} />
          </a>
          <a href="https://www.facebook.com/share/1AebAJuQTs/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition">
            <Facebook size={28} />
          </a>
          <a href="https://www.linkedin.com/in/vishal-kumar-71a2a5251" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition">
            <Linkedin size={28} />
          </a>
          <a href="https://www.instagram.com/vixhal_.10x" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition">
            <Instagram size={28} />
          </a>
        </div>


        <div className="text-sm sm:text-base font-medium text-gray-200">
          Built with <span className="font-semibold text-white">MERN Stack</span>
        </div>
      </div>


      <div className="mt-10 flex flex-wrap justify-center sm:justify-end items-center gap-6 text-sm text-white px-6">
        {[
          {
            href: "https://developer.mozilla.org/en-US/docs/Web/HTML",
            icon: <SiHtml5 size={24} className="text-orange-500" />,
            label: "HTML",
          },
          {
            href: "https://developer.mozilla.org/en-US/docs/Web/CSS",
            icon: <SiCss3 size={24} className="text-blue-500" />,
            label: "CSS",
          },
          {
            href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
            icon: <SiJavascript size={24} className="text-yellow-400" />,
            label: "JavaScript",
          },
          {
            href: "https://reactjs.org",
            icon: <SiReact size={24} className="text-cyan-400" />,
            label: "React",
          },
          {
            href: "https://tailwindcss.com",
            icon: <SiTailwindcss size={24} className="text-sky-400" />,
            label: "Tailwind",
          },
          {
            href: "https://nodejs.org",
            icon: <SiNodedotjs size={24} className="text-green-500" />,
            label: "Node.js",
          },
          {
            href: "https://expressjs.com",
            icon: <SiExpress size={24} className="text-gray-300" />,
            label: "Express",
          },
          {
            href: "https://mongodb.com",
            icon: <SiMongodb size={24} className="text-green-400" />,
            label: "MongoDB",
          },
        ].map((tech, index) => (
          <a
            key={index}
            href={tech.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center hover:scale-105 transition"
          >
            {tech.icon}
            <span className="mt-1">{tech.label}</span>
          </a>
        ))}
      </div>

      <div className="mt-6 text-center text-md text-gray-100">
        © 2025 <span className="font-semibold text-white">DevPost</span>. Crafted using React & TailwindCSS.
        <br />
        <span className="font-semibold text-white">by Vishal Kumar</span>
      </div>
    </footer>
  );
};

export default Footer;
