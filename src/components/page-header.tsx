import { SectionLabel } from "@/components/section-label";

type PageHeaderProps = {
  number?: string;
  eyebrow: string;
  title: string;
  accent?: string;
  description: string;
  meta?: string;
  highlights?: { label: string; value: string }[];
};

export function PageHeader({
  number,
  eyebrow,
  title,
  accent,
  description,
  meta,
  highlights,
}: PageHeaderProps) {
  return (
    <header className="page-wash relative overflow-hidden border-b border-ink/10 pb-14 pt-8 md:pb-16 md:pt-12">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-6 hidden h-px w-32 bg-gradient-to-l from-tomato/40 to-transparent md:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-28 -top-28 hidden h-72 w-72 rounded-full bg-tomato/10 blur-3xl lg:block"
      />

      <div className="relative grid gap-10 lg:grid-cols-[1fr_320px] lg:items-end">
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

        {highlights && highlights.length > 0 && (
          <div
            className="glass-panel relative animate-scale-in overflow-hidden p-5"
            style={{ animationDelay: "180ms" }}
          >
            <div
              aria-hidden
              className="absolute inset-x-5 top-0 h-0.5 rounded-full bg-gradient-to-r from-tomato via-clay to-moss"
            />
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="label-accent">What you get</p>
                <p className="mt-2 text-sm leading-relaxed text-smoke">
                  A focused result you can use in your next counselor, parent, or
                  self-check conversation.
                </p>
              </div>
              <span className="rounded-full border border-ink/10 bg-paper px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-tomato">
                Free
              </span>
            </div>
            <dl className="mt-5 grid gap-2.5">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-ink/10 bg-paper/70 px-4 py-3"
                >
                  <dt className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-smoke">
                    {item.label}
                  </dt>
                  <dd className="mt-1 font-display text-2xl font-light tracking-tight text-ink">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
    </header>
  );
}
