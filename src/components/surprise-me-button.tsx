"use client";

import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import { getRandomCareer } from "@/lib/careers";
import { QuestButton } from "@/components/quest-button";

export function SurpriseMeButton() {
  const router = useRouter();

  return (
    <QuestButton
      type="button"
      variant="ghost"
      size="sm"
      onClick={() => {
        const career = getRandomCareer();
        router.push(`/explore/${career.id}`);
      }}
    >
      <Sparkles className="h-4 w-4" />
      Surprise me
    </QuestButton>
  );
}
