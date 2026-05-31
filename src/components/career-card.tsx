import Link from "next/link";
import { ArrowUpRight, GraduationCap, TrendingUp } from "lucide-react";
import { formatSalary, formatSalaryRange } from "@/lib/careers";
import type { Career } from "@/lib/types";
import { EDUCATION_LABELS, GROWTH_LABELS } from "@/lib/types";
import { cn } from "@/lib/utils";

type CareerCardProps = {
  career: Career;
  matchScore?: number;
  reasons?: string[];
  index?: number;
  dark?: boolean;
  compact?: boolean;
};

// Anchor the salary scale to a generous US ceiling so cards stay visually comparable.
const SALARY_CEILING = 220_000;

function salaryPct(value: number) {
  return Math.min(100, Math.max(2, Math.round((value / SALARY_CEILING) * 100)));
}

function SalaryBar({ career, dark = false }: { career: Career; dark?: boolean }) {
  const minPct = salaryPct(career.salaryMin);
  const maxPct = salaryPct(career.salaryMax);
  const medianPct = salaryPct(career.salaryMedian);

  return (
    <div
      className="w-full"
      aria-label={`Salary range ${formatSalaryRange(career)}, median ${formatSalary(career.salaryMedian)}`}
    >
      <div
        className={cn(
          "relative h-1 rounded-full",
          dark ? "bg-cream/15" : "bg-ink/10"
        )}
        aria-hidden
      >
        <span
          className={cn(
            "absolute inset-y-0 rounded-full",
            dark ? "bg-clay" : "bg-tomato"
          )}
          style={{ left: `${minPct}%`, width: `${Math.max(2, maxPct - minPct)}%` }}
        />
        <span
          className={cn(
            "absolute -top-1 h-3 w-0.5 -translate-x-1/2 rounded",
            dark ? "bg-cream" : "bg-ink"
          )}
          style={{ left: `${medianPct}%` }}
          title={`Median ${formatSalary(career.salaryMedian)}`}
        />
      </div>
    </div>
  );
}

function MatchScoreRing({ score }: { score: number }) {
  const radius = 26;
  const size = 64;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(100, Math.max(0, score)) / 100) * circumference;

  return (
    <div
      className="relative flex h-16 w-16 shrink-0 items-center justify-center"
      aria-label={`${score}% match`}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
        aria-hidden
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          className="text-ink/10"
          strokeWidth="3"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          className="text-tomato transition-[stroke-dashoffset] duration-700 ease-out"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute text-center">
        <p className="font-display text-xl font-light tabular leading-none text-tomato">{score}</p>
        <p className="mt-0.5 font-mono text-[8px] uppercase tracking-widest text-smoke">fit</p>
      </div>
    </div>
  );
}

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
          className="group relative grid grid-cols-[auto_1fr_auto_auto] items-center gap-6 rounded-lg py-7 transition duration-300 hover:bg-cream/[0.06] md:gap-10 md:px-4"
        >
          {/* Hover accent rail, matches the light-theme list pattern */}
          <span
            aria-hidden
            className="absolute inset-y-3 left-0 w-0.5 origin-top scale-y-0 rounded-full bg-tomato transition duration-300 group-hover:scale-y-100"
          />
          {index !== undefined && (
            <span className="font-mono text-sm font-medium tabular text-cream/40 transition group-hover:text-clay md:text-base">
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
            <p className="mt-2 font-display text-base font-light tabular text-cream/90 md:hidden">
              {formatSalaryRange(career)}
              <span className="ml-1.5 font-mono text-[10px] uppercase tracking-widest text-cream/40">
                /yr
              </span>
            </p>
          </div>
          <div className="hidden text-right md:block">
            <p className="font-display text-xl font-light tabular text-cream">
              {formatSalaryRange(career)}
            </p>
            <p className="font-mono text-[10px] uppercase tracking-widest text-cream/50">
              per year
            </p>
            <div className="mt-3 w-40">
              <SalaryBar career={career} dark />
            </div>
            <p className="mt-2.5 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest tabular text-cream/60">
              <TrendingUp className="h-3 w-3 text-moss" />
              +{career.growthPercent}% by 2032
            </p>
          </div>
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream transition group-hover:border-tomato group-hover:bg-tomato active:scale-95">
            <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </Link>
      </li>
    );
  }

  return (
    <Link
      href={`/explore/${career.id}`}
      className={cn(
        "group card-lift relative flex min-h-full flex-col overflow-hidden rounded-3xl border border-ink/10 bg-cream p-6 transition hover:border-tomato/25 hover:shadow-lift",
        compact && "p-5"
      )}
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-tomato via-clay to-moss opacity-55 transition group-hover:opacity-100"
      />

      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <p className="label-accent">{career.category}</p>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-paper px-2.5 py-1 text-[11px] font-medium text-smoke">
            <GraduationCap className="h-3 w-3 text-tomato" />
            {EDUCATION_LABELS[career.education]}
          </span>
        </div>
        {matchScore !== undefined ? (
          <MatchScoreRing score={matchScore} />
        ) : (
          <ArrowUpRight className="h-4 w-4 text-ink/40 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-tomato" />
        )}
      </div>

      <h3
        className={cn(
          "mt-4 font-display font-light tracking-tight text-ink transition group-hover:text-tomato",
          compact ? "text-2xl" : "text-3xl"
        )}
      >
        {career.title}
      </h3>
      <p className="mt-2 text-[14px] leading-relaxed text-graphite">{career.tagline}</p>

      <div className="mt-5 border-t border-ink/10 pt-5">
        <div className="flex items-baseline justify-between">
          <p className="label">Salary</p>
          <p className="font-display text-base text-ink tabular">
            {formatSalaryRange(career)}
          </p>
        </div>
        <div className="mt-3">
          <SalaryBar career={career} />
        </div>
        <div className="mt-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest tabular text-ash">
          <span>Entry</span>
          <span>Median {formatSalary(career.salaryMedian)}</span>
          <span>Top</span>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-ink/10 pt-4 text-[13px] text-graphite">
        <span className="inline-flex items-center gap-1.5">
          <TrendingUp className="h-3.5 w-3.5 text-moss" />
          {GROWTH_LABELS[career.growthOutlook].replace(" than average", "")}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest tabular text-smoke">
          +{career.growthPercent}% by 2032
        </span>
      </div>

      {reasons && reasons.length > 0 && (
        <ul className="mt-5 space-y-1.5 border-t border-ink/10 pt-5 text-sm text-graphite">
          {reasons.map((r, i) => (
            <li key={`${r}-${i}`} className="flex gap-2">
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
