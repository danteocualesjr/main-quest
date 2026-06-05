"use client";

import { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";
import {
  isCareerSaved,
  SAVED_CAREERS_CHANGED_EVENT,
  toggleSavedCareer,
} from "@/lib/saved-careers";
import { cn } from "@/lib/utils";

type SaveCareerButtonProps = {
  careerId: string;
  className?: string;
};

export function SaveCareerButton({ careerId, className }: SaveCareerButtonProps) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(isCareerSaved(careerId));

    const refresh = () => setSaved(isCareerSaved(careerId));
    window.addEventListener(SAVED_CAREERS_CHANGED_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(SAVED_CAREERS_CHANGED_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [careerId]);

  return (
    <button
      type="button"
      onClick={() => setSaved(toggleSavedCareer(careerId))}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition active:scale-95",
        saved
          ? "border-tomato bg-tomato text-cream shadow-soft"
          : "border-ink/15 bg-cream text-ink hover:border-tomato hover:text-tomato",
        className
      )}
      aria-pressed={saved}
    >
      <Bookmark className={cn("h-4 w-4", saved && "fill-current")} />
      {saved ? "Saved" : "Save career"}
    </button>
  );
}
