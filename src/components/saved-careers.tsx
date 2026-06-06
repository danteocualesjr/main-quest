"use client";

import { useCallback, useEffect, useState } from "react";
import { Bookmark } from "lucide-react";
import { CareerCard } from "@/components/career-card";
import { SectionLabel } from "@/components/section-label";
import { getCareerById } from "@/lib/careers";
import { getSavedCareerIds } from "@/lib/career-storage";
import type { Career } from "@/lib/types";

export function SavedCareers() {
  const [careers, setCareers] = useState<Career[]>([]);

  const refresh = useCallback(() => {
    const ids = getSavedCareerIds();
    const loaded = ids
      .map((id) => getCareerById(id))
      .filter((c): c is Career => c !== undefined);
    setCareers(loaded);
  }, []);

  useEffect(() => {
    refresh();
    window.addEventListener("main-quest:saved-careers-changed", refresh);
    return () =>
      window.removeEventListener("main-quest:saved-careers-changed", refresh);
  }, [refresh]);

  if (careers.length === 0) return null;

  return (
    <section className="space-y-6 border-b border-ink/10 pb-12">
      <SectionLabel>
        <span className="inline-flex items-center gap-2">
          <Bookmark className="h-3.5 w-3.5" />
          Saved for later
        </span>
      </SectionLabel>
      <p className="max-w-xl text-sm text-smoke">
        Careers you bookmarked on this device. Use them to shortlist options before
        talking with a counselor or parent.
      </p>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 [&>li]:list-none">
        {careers.map((career) => (
          <li key={career.id}>
            <CareerCard career={career} compact showSave />
          </li>
        ))}
      </ul>
    </section>
  );
}
