"use client";

import { useCallback, useEffect, useState } from "react";
import { Bookmark } from "lucide-react";
import { isCareerSaved, toggleSavedCareer } from "@/lib/career-storage";
import { cn } from "@/lib/utils";

type SaveCareerButtonProps = {
  careerId: string;
  className?: string;
  /** Compact icon-only style for cards. */
  compact?: boolean;
};

export function SaveCareerButton({
  careerId,
  className,
  compact = false,
}: SaveCareerButtonProps) {
  const [saved, setSaved] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setSaved(isCareerSaved(careerId));
  }, [careerId]);

  const toggle = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const next = toggleSavedCareer(careerId);
      setSaved(next);
      window.dispatchEvent(new CustomEvent("main-quest:saved-careers-changed"));
    },
    [careerId]
  );

  if (!mounted) {
    return (
      <span
        className={cn(
          compact
            ? "inline-flex h-8 w-8 items-center justify-center rounded-full border border-ink/10"
            : "inline-flex h-10 items-center gap-2 rounded-full border border-ink/15 px-4",
          className
        )}
        aria-hidden
      />
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        "inline-flex items-center justify-center transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tomato",
        compact
          ? "h-8 w-8 rounded-full border border-ink/15 bg-paper text-smoke hover:border-tomato hover:text-tomato"
          : "gap-2 rounded-full border border-ink/15 bg-paper px-4 py-2 text-sm font-medium text-ink hover:border-tomato hover:text-tomato",
        saved && "border-tomato/40 bg-tomato/5 text-tomato",
        className
      )}
      aria-pressed={saved}
      aria-label={saved ? "Remove from saved careers" : "Save career"}
    >
      <Bookmark className={cn("h-4 w-4", saved && "fill-current")} />
      {!compact && (saved ? "Saved" : "Save")}
    </button>
  );
}
