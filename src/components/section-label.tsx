import { cn } from "@/lib/utils";

type SectionLabelProps = {
  number?: string;
  children: React.ReactNode;
  variant?: "default" | "accent" | "ink";
  className?: string;
};

export function SectionLabel({
  number,
  children,
  variant = "default",
  className,
}: SectionLabelProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 backdrop-blur",
        variant === "default" && "text-graphite",
        variant === "accent" && "text-ink",
        variant === "ink" && "text-ink",
        className
      )}
    >
      {variant === "accent" && (
        <span
          aria-hidden
          className="relative inline-flex h-1.5 w-1.5"
        >
          <span className="absolute inset-0 animate-pulse-soft rounded-full bg-magenta" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-magenta shadow-[0_0_8px_rgba(236,72,153,0.9)]" />
        </span>
      )}
      {number && (
        <span
          className={cn(
            "font-mono text-[10px] font-medium tabular tracking-tight",
            variant === "accent" ? "text-electric" : "text-smoke"
          )}
        >
          {number}
        </span>
      )}
      {number && variant !== "accent" && (
        <span className="h-px w-6 bg-current opacity-30" />
      )}
      <span
        className={cn(
          "font-mono text-[11px] font-medium uppercase tracking-[0.22em]",
          variant === "accent" && "aurora-text"
        )}
      >
        {children}
      </span>
    </div>
  );
}
