import Link from "next/link";
import { cn } from "@/lib/utils";

type QuestButtonProps = {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  size?: "default" | "sm";
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
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50",
    size === "default" && "px-5 py-3 text-sm",
    size === "sm" && "px-4 py-2 text-sm",
    variant === "primary" &&
      "bg-quest-indigo text-white shadow-soft hover:bg-indigo-700 focus-visible:outline-quest-indigo",
    variant === "secondary" &&
      "bg-quest-teal/10 text-quest-teal ring-1 ring-quest-teal/20 hover:bg-quest-teal/15",
    variant === "ghost" &&
      "border border-quest-border bg-quest-surface text-quest-ink shadow-sm hover:border-quest-muted/30 hover:bg-quest-card",
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
