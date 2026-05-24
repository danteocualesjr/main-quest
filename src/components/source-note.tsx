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

  return <p className="mt-3 label text-smoke">{message}</p>;
}
