"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

let themeTransitionTimer: ReturnType<typeof setTimeout> | undefined;

function applyTheme(theme: Theme) {
  const root = document.documentElement;

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  // Ease the palette change instead of snapping. The class is removed once the
  // tween finishes so it never interferes with ordinary hover transitions.
  if (!prefersReducedMotion) {
    root.classList.add("theme-transition");
    clearTimeout(themeTransitionTimer);
    themeTransitionTimer = setTimeout(() => {
      root.classList.remove("theme-transition");
    }, 450);
  }

  root.classList.toggle("dark", theme === "dark");
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // Ignore storage failures (private mode, disabled storage, etc.).
  }
}

export function ThemeToggle({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setTheme(getInitialTheme());
    setMounted(true);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  }

  const isDark = theme === "dark";
  const label = mounted
    ? isDark
      ? "Switch to light mode"
      : "Switch to dark mode"
    : "Toggle color theme";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      aria-pressed={mounted ? isDark : undefined}
      className={cn(
        "group relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink transition hover:border-tomato hover:text-tomato active:scale-95",
        className
      )}
    >
      {/* Render both icons and cross-fade so layout is stable before hydration. */}
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
