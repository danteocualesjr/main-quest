"use client";

import { useCallback, useState } from "react";
import { Check, Link2, Share2 } from "lucide-react";
import { QuestButton } from "@/components/quest-button";

type ShareCareerButtonProps = {
  title: string;
  tagline: string;
};

export function ShareCareerButton({ title, tagline }: ShareCareerButtonProps) {
  const [copied, setCopied] = useState(false);

  const getShareText = useCallback(() => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    return `${title} — ${tagline}\n\n${url}`;
  }, [title, tagline]);

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(getShareText());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  }, [getShareText]);

  const share = useCallback(async () => {
    const url = window.location.href;
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({
          title: `${title} | Main Quest`,
          text: tagline,
          url,
        });
        return;
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
      }
    }
    await copyLink();
  }, [copyLink, title, tagline]);

  const canNativeShare =
    typeof navigator !== "undefined" && typeof navigator.share === "function";

  return (
    <div className="flex flex-wrap gap-2">
      <QuestButton type="button" variant="ghost" size="sm" onClick={copyLink}>
        {copied ? (
          <>
            <Check className="h-4 w-4 text-moss" />
            Copied
          </>
        ) : (
          <>
            <Link2 className="h-4 w-4" />
            Copy link
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
  );
}
