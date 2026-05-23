import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
import { formatSalaryRange } from "@/lib/careers";
import type { Career } from "@/lib/types";
import { GROWTH_LABELS } from "@/lib/types";
import { cn } from "@/lib/utils";

type CareerCardProps = {
  career: Career;
  matchScore?: number;
  reasons?: string[];
  compact?: boolean;
};

export function CareerCard({ career, matchScore, reasons, compact }: CareerCardProps) {
  return (
    <Link
      href={`/explore/${career.id}`}
      className={cn(
        "group block rounded-2xl border border-quest-border bg-quest-surface p-5 shadow-card transition hover:-translate-y-0.5 hover:border-quest-indigo/25 hover:shadow-lift",
        compact && "p-4"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-quest-purple">
            {career.category}
          </p>
          <h3 className="mt-1 font-display text-lg font-bold text-quest-ink group-hover:text-quest-indigo">
            {career.title}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-quest-muted">{career.tagline}</p>
        </div>
        {matchScore !== undefined && (
          <div className="shrink-0 rounded-xl bg-quest-indigo/10 px-2.5 py-1.5 text-center ring-1 ring-quest-indigo/15">
            <p className="text-lg font-bold text-quest-indigo">{matchScore}%</p>
            <p className="text-[10px] font-medium uppercase text-quest-muted">match</p>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        <span className="rounded-full bg-quest-teal/10 px-2.5 py-1 font-medium text-quest-teal">
          {formatSalaryRange(career)} / yr
        </span>
        <span className="flex items-center gap-1 rounded-full bg-quest-card px-2.5 py-1 font-medium text-quest-muted">
          <TrendingUp className="h-3 w-3 text-quest-gold" />
          {GROWTH_LABELS[career.growthOutlook]}
        </span>
      </div>

      {reasons && reasons.length > 0 && (
        <ul className="mt-4 space-y-1.5 border-t border-quest-border pt-4 text-sm text-quest-muted">
          {reasons.map((r) => (
            <li key={r} className="flex gap-2">
              <span className="text-quest-indigo">•</span>
              {r}
            </li>
          ))}
        </ul>
      )}

      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-quest-indigo">
        View details
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
