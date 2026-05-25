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
    <p className="mt-4 inline-flex max-w-2xl items-start gap-2 rounded-xl border border-ink/10 bg-cream/80 px-4 py-3 text-sm leading-relaxed text-smoke">
      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-tomato/70" aria-hidden />
      <span>{message}</span>
    </p>
  );
}
