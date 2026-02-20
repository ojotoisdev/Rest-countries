"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { FaMoon, FaSun } from "react-icons/fa";

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      className="relative w-12 h-12 flex items-center justify-center"
    >
      <FaSun
        style={{ color: "var(--color-accent)" }}
        className={`absolute w-6 h-6
          transition-all duration-300
          ${currentTheme === "light" ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"}
        `}
      />
      <FaMoon
        style={{ color: "var(--color-text)" }}
        className={`absolute w-6 h-6
          transition-all duration-300
          ${currentTheme === "dark" ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-0"}
        `}
      />
    </Button>
  );
}
