import Link from "next/link";
import { cn } from "@/lib/utils";

type QuestButtonProps = {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "ink" | "link";
  size?: "default" | "sm" | "lg";
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
};

export function QuestButton({
  href,
  onClick,
  variant = "primary",
  size = "default",
  className,
  children,
  type = "button",
  disabled,
}: QuestButtonProps) {
  const isPrimary = variant === "primary";

  const styles = cn(
    "group/btn relative inline-flex items-center justify-center gap-2 font-medium transition will-change-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 disabled:opacity-50",
    variant !== "link" && "rounded-full",
    size === "sm" && variant !== "link" && "px-4 py-2 text-sm",
    size === "default" && variant !== "link" && "px-6 py-3 text-[15px]",
    size === "lg" && variant !== "link" && "px-7 py-3.5 text-base",

    isPrimary &&
      "text-ink shadow-glow hover:shadow-glow-rose focus-visible:outline-electric hover:-translate-y-0.5 active:translate-y-0",

    variant === "ink" &&
      "bg-white text-paper hover:bg-white/90 focus-visible:outline-white shadow-paper",

    variant === "ghost" &&
      "glass text-ink hover:bg-white/[0.08] hover:border-white/20 focus-visible:outline-electric",

    variant === "link" && "text-ink underline-offset-4 hover:text-magenta",
    className
  );

  const inner = (
    <>
      {isPrimary && (
        <>
          {/* Aurora gradient fill */}
          <span
            aria-hidden
            className="absolute inset-0 -z-10 rounded-full bg-aurora"
          />
          {/* Hover shine */}
          <span
            aria-hidden
            className="absolute inset-0 -z-10 rounded-full bg-gradient-to-t from-white/0 via-white/15 to-white/30 opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100"
          />
          {/* Outer aura blur */}
          <span
            aria-hidden
            className="absolute -inset-1 -z-20 rounded-full bg-aurora opacity-50 blur-lg transition-opacity duration-300 group-hover/btn:opacity-80"
          />
        </>
      )}
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={styles}>
        {inner}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={styles}>
      {inner}
    </button>
  );
}
