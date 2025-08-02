// tailwind.config.js
export default {
  darkMode: "class", // <- this is crucial
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
