"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FaMoon } from "react-icons/fa";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.classList.add("light");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      setTheme("light");
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="flex items-center justify-center gap-2 w-36 h-12"
    >
      {/* Icon container */}
      <div className="flex items-center justify-center w-6 h-6 relative">
        <FaMoon
          className={`absolute w-6 h-6  transition-all duration-300 ${
            theme === "light" ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-75 -rotate-45"
          }`}
        />
        <FaMoon
          className={`absolute w-6 h-6 text-gray-800 dark:text-gray-200 transition-all duration-300 ${
            theme === "dark" ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-75 rotate-45"
          }`}
        />
      </div>

      
      <span className="text-sm font-medium">
        {theme === "light" ? "Light Mode" : "Dark Mode"}
      </span>
    </Button>
  );
};

export default ThemeToggle;
