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
        "flex items-center gap-3",
        variant === "default" && "text-smoke",
        variant === "accent" && "text-tomato",
        variant === "ink" && "text-ink",
        className
      )}
    >
      {number && (
        <span className="font-mono text-xs font-medium tabular tracking-tight">{number}</span>
      )}
      {number && <span className="h-px w-8 bg-current opacity-30" />}
      <span className="font-mono text-[11px] font-medium uppercase tracking-[0.22em]">
        {children}
      </span>
    </div>
  );
}
