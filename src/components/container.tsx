import { cn } from "@/lib/utils";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  size?: "edge" | "prose";
};

export function Container({ children, className, size = "edge" }: ContainerProps) {
  return (
    <div className={cn(size === "edge" ? "container-edge" : "container-prose", className)}>
      {children}
    </div>
  );
}
