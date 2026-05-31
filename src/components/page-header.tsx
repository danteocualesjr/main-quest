import { SectionLabel } from "@/components/section-label";

type PageHeaderProps = {
  number?: string;
  eyebrow: string;
  title: string;
  accent?: string;
  description: string;
  meta?: string;
};

const headerSignals = ["No sign-up", "Student-first", "US salary data"];

export function PageHeader({
  number,
  eyebrow,
  title,
  accent,
  description,
  meta,
}: PageHeaderProps) {
  return (
    <header className="page-wash relative overflow-hidden border-b border-ink/10 pb-14 pt-8 md:pb-16 md:pt-12">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-6 hidden h-px w-32 bg-gradient-to-l from-tomato/40 to-transparent md:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-10 hidden h-64 w-64 rounded-full bg-tomato/8 blur-3xl lg:block"
      />

      <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end">
        <div>
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
                <em className="relative italic text-tomato">
                  {accent}
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 right-0 h-[2px] origin-left animate-draw-line rounded-full bg-tomato/30"
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
              className="mt-8 inline-flex animate-fade-up items-center gap-2 rounded-full border border-ink/15 bg-cream px-3 py-1.5 text-xs font-medium text-smoke"
              style={{ animationDelay: "200ms" }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-moss" />
              {meta}
            </div>
          )}
        </div>

        <div
          className="surface-card-soft animate-fade-up p-5"
          style={{ animationDelay: "220ms" }}
        >
          <p className="label-accent">Built for deciding</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {headerSignals.map((signal) => (
              <span
                key={signal}
                className="rounded-full border border-ink/10 bg-paper px-3 py-1 text-xs font-medium text-graphite"
              >
                {signal}
              </span>
            ))}
          </div>
          <p className="mt-5 text-sm leading-relaxed text-smoke">
            Start with rough answers, then use the roadmap and career profiles to
            make the next step concrete.
          </p>
        </div>
      </div>
    </header>
  );
}
