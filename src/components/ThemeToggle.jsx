import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext.jsx";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-50 p-2.5 rounded-full border border-jobcard-border bg-secondary/80 backdrop-blur-md text-text shadow-lg shadow-black/5 hover:scale-110 hover:shadow-xl active:scale-95 transition-all cursor-pointer flex items-center justify-center"
      aria-label={`Toggle theme to ${
        theme === "light" ? "dark" : "light"
      } mode`}
    >
      <span className="transition-opacity duration-500 text-xl">
        {theme === "light" ? "🌙" : "☀️"}
      </span>
    </button>
  );
}
