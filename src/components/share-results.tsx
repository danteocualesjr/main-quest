"use client";

import { useCallback, useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";
import { QuestButton } from "@/components/quest-button";
import { cn } from "@/lib/utils";

type ShareResultsProps = {
  /** Accessible label for the action group, e.g. "Share roadmap" */
  label: string;
  getText: () => string;
  shareTitle?: string;
  className?: string;
};

export function ShareResults({
  label,
  getText,
  shareTitle = "Main Quest results",
  className,
}: ShareResultsProps) {
  const [copied, setCopied] = useState(false);
  const [shareError, setShareError] = useState<string | null>(null);

  const copy = useCallback(async () => {
    setShareError(null);
    const text = getText();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setShareError("Could not copy — try selecting the text manually.");
    }
  }, [getText]);

  const share = useCallback(async () => {
    setShareError(null);
    const text = getText();
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title: shareTitle, text });
        return;
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
      }
    }
    await copy();
  }, [copy, getText, shareTitle]);

  const canNativeShare =
    typeof navigator !== "undefined" && typeof navigator.share === "function";

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <p className="label w-full sm:w-auto">{label}</p>
      <div className="flex flex-wrap gap-2">
        <QuestButton
          type="button"
          variant="ghost"
          size="sm"
          onClick={copy}
          aria-label={copied ? "Copied to clipboard" : "Copy results to clipboard"}
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-moss" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy
            </>
          )}
        </QuestButton>
        {canNativeShare && (
          <QuestButton type="button" variant="ghost" size="sm" onClick={share}>
            <Share2 className="h-4 w-4" />
            Share
          </QuestButton>
        )}
      </div>
      {shareError && (
        <p className="w-full text-xs text-tomato" role="status">
          {shareError}
        </p>
      )}
    </div>
  );
}
