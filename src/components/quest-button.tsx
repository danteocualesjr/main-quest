import Link from "next/link";
import { cn } from "@/lib/utils";

type QuestButtonProps = {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "navy";
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
  const styles = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50",
    size === "sm" && "px-4 py-2 text-sm",
    size === "default" && "px-6 py-3 text-sm",
    size === "lg" && "px-8 py-4 text-base",
    variant === "primary" &&
      "bg-quest-coral text-white shadow-glow hover:bg-quest-coral-dark focus-visible:outline-quest-coral",
    variant === "secondary" &&
      "bg-quest-mint/10 text-quest-mint ring-1 ring-quest-mint/25 hover:bg-quest-mint/15",
    variant === "navy" &&
      "bg-quest-navy text-white shadow-soft hover:bg-quest-navy/90 focus-visible:outline-quest-navy",
    variant === "ghost" &&
      "border border-quest-border bg-quest-surface text-quest-ink shadow-sm hover:border-quest-coral/25 hover:bg-quest-card",
    className
  );

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={styles}>
      {children}
    </button>
  );
}
