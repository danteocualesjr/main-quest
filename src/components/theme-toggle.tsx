"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, mounted, toggleTheme } = useTheme();

  const isDark = theme === "dark";
  const label = mounted
    ? isDark
      ? "Switch to light mode"
      : "Switch to dark mode"
    : "Toggle color theme";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      aria-pressed={mounted ? isDark : undefined}
      className={cn(
        "group relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink transition hover:border-tomato hover:text-tomato focus-visible:ring-2 focus-visible:ring-tomato/40 focus-visible:ring-offset-2 focus-visible:ring-offset-paper active:scale-95 motion-reduce:active:scale-100",
        className
      )}
    >
      <Sun
        className={cn(
          "h-4 w-4 transition-all duration-300",
          mounted && isDark
            ? "scale-0 -rotate-90 opacity-0"
            : "scale-100 rotate-0 opacity-100"
        )}
      />
      <Moon
        className={cn(
          "absolute h-4 w-4 transition-all duration-300",
          mounted && isDark
            ? "scale-100 rotate-0 opacity-100"
            : "scale-0 rotate-90 opacity-0"
        )}
      />
    </button>
  );
}
