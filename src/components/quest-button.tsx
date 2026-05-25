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
  const styles = cn(
    "group/btn inline-flex items-center justify-center gap-2 font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
    variant !== "link" && "rounded-full",
    size === "sm" && variant !== "link" && "px-4 py-2 text-sm",
    size === "default" && variant !== "link" && "px-6 py-3 text-[15px]",
    size === "lg" && variant !== "link" && "px-7 py-3.5 text-base",
    variant === "primary" &&
      "bg-tomato text-cream shadow-paper hover:bg-ember hover:shadow-soft focus-visible:outline-tomato",
    variant === "ink" && "bg-ink text-cream hover:bg-graphite focus-visible:outline-ink",
    variant === "ghost" &&
      "border border-ink/15 bg-transparent text-ink hover:bg-ink hover:text-cream hover:shadow-paper focus-visible:outline-ink",
    variant === "link" && "text-ink underline-offset-4 hover:text-tomato",
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
