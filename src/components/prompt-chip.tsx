import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type PromptChipProps = {
  label: string;
  href: string;
};

export function PromptChip({ label, href }: PromptChipProps) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 rounded-full border border-quest-border bg-quest-surface px-4 py-2 text-sm text-quest-ink shadow-sm transition hover:border-quest-coral/30 hover:bg-quest-coral/5 hover:shadow-soft"
    >
      <span className="text-quest-muted">&ldquo;</span>
      {label}
      <span className="text-quest-muted">&rdquo;</span>
      <ArrowUpRight className="h-3.5 w-3.5 text-quest-coral opacity-0 transition group-hover:opacity-100" />
    </Link>
  );
}
