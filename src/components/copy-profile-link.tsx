"use client";

import { useState } from "react";
import { Link2 } from "lucide-react";

export function CopyProfileLink() {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-cream px-4 py-2 text-sm font-medium text-ink transition hover:border-tomato hover:text-tomato active:scale-95"
    >
      <Link2 className="h-4 w-4" />
      {copied ? "Copied link" : "Copy profile link"}
    </button>
  );
}
