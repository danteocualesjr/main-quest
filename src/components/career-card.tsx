import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
import { formatSalaryRange } from "@/lib/careers";
import type { Career } from "@/lib/types";
import { GROWTH_LABELS } from "@/lib/types";
import { cn } from "@/lib/utils";

const categoryAccent: Record<string, string> = {
  Technology: "from-quest-sky to-quest-lavender",
  Healthcare: "from-quest-mint to-emerald-500",
  Creative: "from-quest-coral to-quest-gold",
  Business: "from-quest-navy to-quest-sky",
  Science: "from-quest-lavender to-quest-sky",
  Education: "from-quest-gold to-quest-coral",
  Trades: "from-amber-600 to-quest-gold",
};

type CareerCardProps = {
  career: Career;
  matchScore?: number;
  reasons?: string[];
  compact?: boolean;
  featured?: boolean;
};

export function CareerCard({
  career,
  matchScore,
  reasons,
  compact,
  featured,
}: CareerCardProps) {
  const accent = categoryAccent[career.category] ?? "from-quest-coral to-quest-gold";

  return (
    <Link
      href={`/explore/${career.id}`}
      className={cn(
        "group relative block overflow-hidden rounded-2xl border border-quest-border bg-quest-surface shadow-card transition hover:-translate-y-1 hover:shadow-lift",
        compact ? "p-4" : "p-5",
        featured && "md:p-6"
      )}
    >
      <div className={cn("absolute inset-x-0 top-0 h-1 bg-gradient-to-r", accent)} />

      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-quest-muted">
            {career.category}
          </p>
          <h3
            className={cn(
              "mt-1 font-display font-semibold text-quest-ink group-hover:text-quest-coral",
              featured ? "text-2xl" : "text-lg"
            )}
          >
            {career.title}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-quest-muted">{career.tagline}</p>
        </div>
        {matchScore !== undefined && (
          <div className="shrink-0 rounded-2xl bg-quest-coral/10 px-3 py-2 text-center ring-1 ring-quest-coral/20">
            <p className="text-xl font-bold text-quest-coral">{matchScore}%</p>
            <p className="text-[10px] font-bold uppercase text-quest-muted">match</p>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        <span className="rounded-full bg-quest-mint/10 px-3 py-1 font-semibold text-quest-mint">
          {formatSalaryRange(career)} / yr
        </span>
        <span className="flex items-center gap-1 rounded-full bg-quest-card px-3 py-1 font-medium text-quest-muted">
          <TrendingUp className="h-3 w-3 text-quest-gold" />
          {GROWTH_LABELS[career.growthOutlook]}
        </span>
      </div>

      {reasons && reasons.length > 0 && (
        <ul className="mt-4 space-y-1.5 border-t border-quest-border pt-4 text-sm text-quest-muted">
          {reasons.map((r) => (
            <li key={r} className="flex gap-2">
              <span className="font-bold text-quest-coral">·</span>
              {r}
            </li>
          ))}
        </ul>
      )}

      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-quest-coral">
        Explore role
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
