"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { CareerCard } from "@/components/career-card";
import { SectionLabel } from "@/components/section-label";
import { getCareerById } from "@/lib/careers";
import { getRecentCareerIds } from "@/lib/career-storage";
import type { Career } from "@/lib/types";

export function RecentCareers() {
  const [careers, setCareers] = useState<Career[]>([]);

  useEffect(() => {
    const ids = getRecentCareerIds();
    const loaded = ids
      .map((id) => getCareerById(id))
      .filter((c): c is Career => c !== undefined);
    setCareers(loaded);
  }, []);

  if (careers.length === 0) return null;

  return (
    <section className="space-y-6 border-b border-ink/10 pb-12">
      <SectionLabel>
        <span className="inline-flex items-center gap-2">
          <Clock className="h-3.5 w-3.5" />
          Recently viewed
        </span>
      </SectionLabel>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 [&>li]:list-none">
        {careers.map((career) => (
          <li key={career.id}>
            <CareerCard career={career} compact />
          </li>
        ))}
      </ul>
    </section>
  );
}
