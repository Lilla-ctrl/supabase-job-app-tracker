import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext.jsx";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-50 p-2.5 rounded-full border border-jobcard-border bg-secondary text-text shadow-sm hover:scale-110 active:scale-95 transition-all cursor-pointer flex items-center justify-center "
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
