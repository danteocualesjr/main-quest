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
        className="inline-flex max-w-full items-center gap-2 rounded-full border border-ink/15 bg-paper/95 px-5 py-2.5 text-sm font-medium text-ink shadow-lift backdrop-blur-lg transition hover:border-tomato hover:text-tomato hover:shadow-soft active:scale-[0.98]"
      >
        <ArrowUp className="h-4 w-4" />
        {label}
      </button>
    </div>
  );
}
