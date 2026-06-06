"use client";

import { useCallback, useEffect, useState } from "react";
import { GitCompare } from "lucide-react";
import { isInCompare, toggleCompareCareer } from "@/lib/career-storage";
import { cn } from "@/lib/utils";

type CompareCareerButtonProps = {
  careerId: string;
  className?: string;
};

export function CompareCareerButton({ careerId, className }: CompareCareerButtonProps) {
  const [active, setActive] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [atCapacity, setAtCapacity] = useState(false);

  useEffect(() => {
    setMounted(true);
    setActive(isInCompare(careerId));
  }, [careerId]);

  const refresh = useCallback(() => {
    setActive(isInCompare(careerId));
    setAtCapacity(false);
  }, [careerId]);

  useEffect(() => {
    window.addEventListener("main-quest:compare-changed", refresh);
    return () => window.removeEventListener("main-quest:compare-changed", refresh);
  }, [refresh]);

  const toggle = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const result = toggleCompareCareer(careerId);
      if (result === null) {
        setAtCapacity(true);
        window.setTimeout(() => setAtCapacity(false), 2000);
        return;
      }
      setActive(result);
      window.dispatchEvent(new CustomEvent("main-quest:compare-changed"));
    },
    [careerId]
  );

  if (!mounted) {
    return (
      <span
        className={cn(
          "inline-flex h-8 w-8 items-center justify-center rounded-full border border-ink/10",
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
      title={atCapacity ? "Compare tray is full (2 max)" : active ? "Remove from compare" : "Add to compare"}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-full border border-ink/15 bg-paper text-smoke transition hover:border-tomato hover:text-tomato focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tomato",
        active && "border-tomato/40 bg-tomato/5 text-tomato",
        atCapacity && "animate-pulse border-ember text-ember",
        className
      )}
      aria-pressed={active}
      aria-label={active ? "Remove from compare tray" : "Add to compare tray"}
    >
      <GitCompare className="h-4 w-4" />
    </button>
  );
}
