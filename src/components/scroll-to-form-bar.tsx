"use client";

import { ArrowUp } from "lucide-react";

type ScrollToFormBarProps = {
  label: string;
  targetId?: string;
};

export function ScrollToFormBar({ label, targetId = "page-form" }: ScrollToFormBarProps) {
  return (
    <div
      className="fixed inset-x-0 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-40 flex animate-fade-in justify-center px-4"
      role="complementary"
      aria-label={label}
    >
      <button
        type="button"
        onClick={() => {
          document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
        className="sticky-pill active:scale-[0.98]"
      >
        <ArrowUp className="h-4 w-4" />
        {label}
      </button>
    </div>
  );
}
