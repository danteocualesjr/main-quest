"use client";

import { useEffect, useState } from "react";
import { RotateCcw, X } from "lucide-react";

type SessionResumeBannerProps = {
  message: string;
  storageKey: string;
};

export function SessionResumeBanner({ message, storageKey }: SessionResumeBannerProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(storageKey);
    if (!dismissed) setVisible(true);
  }, [storageKey]);

  if (!visible) return null;

  function dismiss() {
    sessionStorage.setItem(storageKey, "1");
    setVisible(false);
  }

  return (
    <div
      role="status"
      className="mb-8 flex flex-col gap-3 rounded-2xl border border-moss/25 bg-moss/5 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <p className="inline-flex items-start gap-2 text-sm text-ink">
        <RotateCcw className="mt-0.5 h-4 w-4 shrink-0 text-moss" />
        <span>{message}</span>
      </p>
      <button
        type="button"
        onClick={dismiss}
        className="inline-flex items-center gap-1.5 self-start rounded-full border border-ink/15 px-3 py-1.5 text-xs font-medium text-smoke transition hover:border-ink/30 hover:text-ink sm:self-center"
      >
        <X className="h-3.5 w-3.5" />
        Dismiss
      </button>
    </div>
  );
}
