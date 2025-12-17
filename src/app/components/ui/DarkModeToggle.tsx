"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("theme");
    if (savedMode === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    } else if (savedMode === "light") {
      setDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDark(prefersDark);
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);

  const toggleDarkMode = () => {
    setDark((prev) => {
      const newMode = !prev;
      document.documentElement.classList.toggle("dark", newMode);
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="relative w-14 h-7 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center p-1 cursor-pointer transition-all duration-300"
      aria-label="Toggle Dark Mode"
    >
      {/* Slider */}
      <span
        className={`absolute left-1 top-1 w-5 h-5 rounded-full bg-white dark:bg-gray-900 shadow-md transition-all duration-300 transform ${
          dark ? "translate-x-7" : "translate-x-0"
        }`}
      />
      {/* Icons */}
      <Sun className="absolute left-1 w-4 h-4 text-yellow-400" />
      <Moon className="absolute right-1 w-4 h-4 text-gray-200" />
    </button>
  );
}
