import { SectionLabel } from "@/components/section-label";

type PageHeaderProps = {
  number?: string;
  eyebrow: string;
  title: string;
  accent?: string;
  description: string;
  meta?: string;
};

export function PageHeader({
  number,
  eyebrow,
  title,
  accent,
  description,
  meta,
}: PageHeaderProps) {
  return (
    <header className="relative border-b border-white/10 pb-12 pt-10 md:pb-16 md:pt-14">
      {/* Corner accent line */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-6 hidden h-px w-40 bg-gradient-to-l from-electric/60 via-magenta/30 to-transparent md:block"
      />

      <div className="animate-fade-up">
        <SectionLabel number={number} variant="accent">
          {eyebrow}
        </SectionLabel>
      </div>

      <h1
        className="mt-6 max-w-3xl animate-fade-up font-display text-display-2 font-light tracking-tight text-ink"
        style={{ animationDelay: "60ms" }}
      >
        {title}
        {accent && (
          <>
            {" "}
            <em className="relative inline-block italic">
              <span className="aurora-text">{accent}</span>
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 right-0 h-[3px] origin-left animate-draw-line rounded-full bg-aurora opacity-80"
                style={{ animationDelay: "650ms" }}
              />
            </em>
          </>
        )}
      </h1>

      <p
        className="mt-6 max-w-2xl animate-fade-up text-lg leading-relaxed text-graphite"
        style={{ animationDelay: "140ms" }}
      >
        {description}
      </p>

      {meta && (
        <div
          className="mt-8 inline-flex animate-fade-up items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-graphite backdrop-blur"
          style={{ animationDelay: "200ms" }}
        >
          <span className="relative inline-flex h-1.5 w-1.5">
            <span className="absolute inset-0 animate-pulse-soft rounded-full bg-moss" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-moss shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
          </span>
          {meta}
        </div>
      )}
    </header>
  );
}
