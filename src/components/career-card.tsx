import Link from "next/link";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { formatSalaryRange } from "@/lib/careers";
import type { Career } from "@/lib/types";
import { GROWTH_LABELS } from "@/lib/types";
import { cn } from "@/lib/utils";

type CareerCardProps = {
  career: Career;
  matchScore?: number;
  reasons?: string[];
  index?: number;
  dark?: boolean;
  compact?: boolean;
};

export function CareerCard({
  career,
  matchScore,
  reasons,
  index,
  dark,
  compact,
}: CareerCardProps) {
  if (dark) {
    return (
      <li>
        <Link
          href={`/explore/${career.id}`}
          className="group grid grid-cols-[auto_1fr_auto_auto] items-center gap-6 py-7 transition hover:bg-cream/5 md:gap-10"
        >
          {index !== undefined && (
            <span className="font-mono text-sm font-medium tabular text-cream/40 md:text-base">
              {String(index).padStart(2, "0")}
            </span>
          )}
          <div>
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-clay">
              {career.category}
            </p>
            <h3 className="mt-1 font-display text-2xl font-light tracking-tight text-cream md:text-3xl">
              {career.title}
            </h3>
            <p className="mt-1 hidden text-sm text-cream/60 md:block">{career.tagline}</p>
          </div>
          <div className="hidden text-right md:block">
            <p className="font-display text-xl font-light tabular text-cream">
              {formatSalaryRange(career)}
            </p>
            <p className="font-mono text-[10px] uppercase tracking-widest text-cream/50">
              per year
            </p>
          </div>
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream transition group-hover:border-tomato group-hover:bg-tomato">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </Link>
      </li>
    );
  }

  return (
    <Link
      href={`/explore/${career.id}`}
      className={cn(
        "group relative flex flex-col border border-ink/10 bg-cream p-6 transition hover:border-ink/30 hover:shadow-soft",
        compact && "p-5"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="label-accent">{career.category}</p>
        {matchScore !== undefined ? (
          <div className="text-right">
            <p className="font-display text-3xl font-light tabular text-tomato">{matchScore}</p>
            <p className="font-mono text-[9px] uppercase tracking-widest text-smoke">% fit</p>
          </div>
        ) : (
          <ArrowUpRight className="h-4 w-4 text-ink/40 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-tomato" />
        )}
      </div>

      <h3
        className={cn(
          "mt-4 font-display font-light tracking-tight text-ink",
          compact ? "text-2xl" : "text-3xl"
        )}
      >
        {career.title}
      </h3>
      <p className="mt-2 text-[14px] leading-relaxed text-graphite">{career.tagline}</p>

      <div className="mt-5 grid grid-cols-2 gap-y-3 border-t border-ink/10 pt-5">
        <div>
          <p className="label">Salary</p>
          <p className="mt-1 font-display text-base text-ink tabular">
            {formatSalaryRange(career)}
          </p>
        </div>
        <div>
          <p className="label">Outlook</p>
          <p className="mt-1 flex items-center gap-1.5 font-display text-base text-ink">
            <TrendingUp className="h-3.5 w-3.5 text-moss" />
            {GROWTH_LABELS[career.growthOutlook].replace(" than average", "")}
          </p>
        </div>
      </div>

      {reasons && reasons.length > 0 && (
        <ul className="mt-5 space-y-1.5 border-t border-ink/10 pt-5 text-sm text-graphite">
          {reasons.map((r) => (
            <li key={r} className="flex gap-2">
              <span className="font-mono text-tomato">→</span>
              {r}
            </li>
          ))}
        </ul>
      )}

      <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink">
        <span className="underline-link">Explore role</span>
        <ArrowUpRight className="h-4 w-4 text-tomato transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
