"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { GitCompare, X } from "lucide-react";
import { QuestButton } from "@/components/quest-button";
import { formatSalaryRange, getCareerById } from "@/lib/careers";
import {
  clearCompareCareers,
  getCompareCareerIds,
  toggleCompareCareer,
} from "@/lib/career-storage";
import { EDUCATION_LABELS, GROWTH_LABELS } from "@/lib/types";
import type { Career } from "@/lib/types";

const ROWS: { key: keyof Career | "growthLabel"; label: string; fmt: (c: Career) => string }[] = [
  { key: "salaryMedian", label: "Salary", fmt: (c) => formatSalaryRange(c) },
  { key: "education", label: "Education", fmt: (c) => EDUCATION_LABELS[c.education] },
  { key: "timeToEntry", label: "Time to entry", fmt: (c) => c.timeToEntry },
  { key: "growthLabel", label: "Outlook", fmt: (c) => GROWTH_LABELS[c.growthOutlook] },
];

export function CareerCompareTray() {
  const [careers, setCareers] = useState<Career[]>([]);

  const refresh = useCallback(() => {
    const loaded = getCompareCareerIds()
      .map((id) => getCareerById(id))
      .filter((c): c is Career => c !== undefined);
    setCareers(loaded);
  }, []);

  useEffect(() => {
    refresh();
    window.addEventListener("main-quest:compare-changed", refresh);
    return () => window.removeEventListener("main-quest:compare-changed", refresh);
  }, [refresh]);

  if (careers.length === 0) return null;

  function remove(id: string) {
    toggleCompareCareer(id);
    window.dispatchEvent(new CustomEvent("main-quest:compare-changed"));
  }

  function clearAll() {
    clearCompareCareers();
    window.dispatchEvent(new CustomEvent("main-quest:compare-changed"));
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 animate-fade-up border-t border-ink/15 bg-paper/95 shadow-[var(--shadow-sticky)] backdrop-blur-lg print:hidden">
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          <p className="inline-flex items-center gap-2 text-sm font-medium text-ink">
            <GitCompare className="h-4 w-4 text-tomato" />
            Compare ({careers.length}/2)
          </p>
          <button
            type="button"
            onClick={clearAll}
            className="rounded-full px-2 py-1 text-xs font-medium text-smoke transition hover:bg-tomato/5 hover:text-tomato focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tomato/30"
          >
            Clear all
          </button>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {careers.map((career) => (
            <div
              key={career.id}
              className="relative rounded-2xl border border-ink/10 bg-cream p-4"
            >
              <button
                type="button"
                onClick={() => remove(career.id)}
                className="absolute right-3 top-3 text-smoke transition hover:text-tomato"
                aria-label={`Remove ${career.title} from compare`}
              >
                <X className="h-4 w-4" />
              </button>
              <Link href={`/explore/${career.id}`} className="block pr-8">
                <p className="label-accent">{career.category}</p>
                <p className="mt-1 font-display text-xl font-light text-ink hover:text-tomato">
                  {career.title}
                </p>
              </Link>
            </div>
          ))}
          {careers.length < 2 && (
            <div className="flex items-center justify-center rounded-2xl border border-dashed border-ink/15 px-4 py-6 text-sm text-smoke">
              Add another career to compare side by side
            </div>
          )}
        </div>

        {careers.length === 2 && (
          <div className="mt-4 overflow-x-auto rounded-2xl border border-ink/10">
            <table className="w-full min-w-[320px] text-left text-sm">
              <thead>
                <tr className="border-b border-ink/10 bg-cream/80">
                  <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-widest text-smoke">
                    Signal
                  </th>
                  {careers.map((c) => (
                    <th
                      key={c.id}
                      className="px-4 py-3 font-display text-base font-light text-ink"
                    >
                      {c.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr key={row.label} className="border-b border-ink/10 last:border-0">
                    <td className="px-4 py-3 font-mono text-[10px] uppercase tracking-widest text-smoke">
                      {row.label}
                    </td>
                    {careers.map((c) => (
                      <td key={c.id} className="px-4 py-3 text-graphite">
                        {row.fmt(c)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {careers.length === 2 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {careers.map((c) => (
              <QuestButton key={c.id} href={`/path?goal=${encodeURIComponent(c.title)}`} size="sm">
                Roadmap: {c.title}
              </QuestButton>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
