import Link from "next/link";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { formatSalaryRange } from "@/lib/careers";
import type { Career } from "@/lib/types";
import { GROWTH_LABELS } from "@/lib/types";
import { QuestButton } from "@/components/quest-button";

type PathSuggestionCardProps = {
  career: Career;
  onBuildPath: (career: Career) => void;
  building: boolean;
};

export function PathSuggestionCard({ career, onBuildPath, building }: PathSuggestionCardProps) {
  return (
    <article className="flex flex-col border border-ink/10 bg-cream p-5">
      <p className="label-accent">{career.category}</p>
      <h3 className="mt-4 font-display text-2xl font-light tracking-tight text-ink">
        {career.title}
      </h3>
      <p className="mt-2 text-[14px] leading-relaxed text-graphite">{career.tagline}</p>

      <div className="mt-5 grid grid-cols-2 gap-y-3 border-t border-ink/10 pt-5">
        <div>
          <p className="label">Salary</p>
          <p className="mt-1 font-display text-base tabular text-ink">{formatSalaryRange(career)}</p>
        </div>
        <div>
          <p className="label">Outlook</p>
          <p className="mt-1 font-display text-base text-ink">
            {GROWTH_LABELS[career.growthOutlook].replace(" than average", "")}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <QuestButton
          type="button"
          size="sm"
          disabled={building}
          onClick={() => onBuildPath(career)}
        >
          {building ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Building…
            </>
          ) : (
            "Build this path"
          )}
        </QuestButton>
        <Link
          href={`/explore/${career.id}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-ink"
        >
          <span className="underline-link">Explore role</span>
          <ArrowUpRight className="h-4 w-4 text-tomato" />
        </Link>
      </div>
    </article>
  );
}
