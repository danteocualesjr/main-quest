import { cn } from "@/lib/utils";

type FormProgressProps = {
  total: number;
  filled: number;
  label: string;
  className?: string;
};

export function FormProgress({ total, filled, label, className }: FormProgressProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-2xl border border-ink/10 bg-cream/55 px-4 py-3",
        className
      )}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={filled}
    >
      <div className="flex flex-1 gap-1.5">
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className={cn(
              "h-2 flex-1 rounded-full transition-all duration-500 ease-out motion-reduce:transition-none",
              i < filled
                ? "bg-gradient-to-r from-tomato to-ember shadow-[0_0_12px_-2px_rgb(var(--c-tomato)/0.55)]"
                : "bg-ink/10"
            )}
          />
        ))}
      </div>
      <p className="label shrink-0 tabular">
        {filled}/{total}
      </p>
    </div>
  );
}
