import type { DiscoverSource } from "@/lib/discover-ai";
import type { PathSource } from "@/lib/path-ai";

const DISCOVER_MESSAGES: Record<DiscoverSource, string> = {
  ai: "Matched from your answers, salary and growth data come from our career catalog.",
  keyword: "Matched by keywords, add more detail to your answers for better results.",
};

const PATH_MESSAGES: Record<PathSource, string> = {
  ai: "Roadmap tailored to your goal, education and salary facts come from our career catalog.",
  template: "Built from our career catalog, steps follow the standard path for this role.",
  keyword: "Closest roles by keyword, pick one below to build a path, or refine your goal.",
};

type SourceNoteProps =
  | { flow: "discover"; source: DiscoverSource }
  | { flow: "path"; source: PathSource };

export function SourceNote(props: SourceNoteProps) {
  const message =
    props.flow === "discover"
      ? DISCOVER_MESSAGES[props.source]
      : PATH_MESSAGES[props.source];

  return (
    <details className="mt-4 max-w-2xl rounded-xl border border-ink/10 bg-cream/80 px-4 py-3 text-sm leading-relaxed text-smoke shadow-paper">
      <summary className="flex cursor-pointer list-none items-start gap-2 text-smoke marker:hidden">
        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-tomato/70" aria-hidden />
        <span>
          {message} <span className="font-medium text-ink">About the data</span>
        </span>
      </summary>
      <div className="mt-3 border-t border-ink/10 pt-3 text-[13px] leading-relaxed text-graphite">
        <p>
          Career profiles use a static, curated US catalog with salary ranges,
          education expectations, growth outlook, interests, skills, and related
          roles. When AI is enabled, it can help interpret your words; salary,
          education, and growth facts still come from the catalog.
        </p>
        <p className="mt-2 text-smoke">
          Treat every match as a starting point for counselor conversations,
          shadowing, course planning, and local research.
        </p>
      </div>
    </details>
  );
}
