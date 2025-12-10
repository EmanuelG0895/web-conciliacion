"use client";
import { type FC } from "react";
import { useTheme } from "../theme-provider/theme-provider";
import { Moon, Sun } from "lucide-react";

const ThemeToggle: FC = () => {
  return (
    <button
      className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
      aria-label="Toggle theme"
    >
      <Sun className="w-5 h-5 text-foreground" />
    </button>
  );
};

export default ThemeToggle;
