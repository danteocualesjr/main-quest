"use client";

import { Printer } from "lucide-react";
import { QuestButton } from "@/components/quest-button";

export function PrintCareerButton() {
  return (
    <QuestButton
      type="button"
      variant="ghost"
      size="sm"
      onClick={() => window.print()}
    >
      <Printer className="h-4 w-4" />
      Print profile
    </QuestButton>
  );
}
