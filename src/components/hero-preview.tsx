import { ArrowUpRight, TrendingUp } from "lucide-react";

export function HeroPreview() {
  return (
    <div className="relative">
      {/* Faint stacked card behind for depth */}
      <div
        aria-hidden
        className="absolute inset-x-3 -bottom-3 top-3 rounded-xl border border-ink/10 bg-cream/60 shadow-paper"
      />
      <div className="absolute inset-x-1.5 -bottom-1.5 top-1.5 rounded-xl border border-ink/10 bg-cream/80 shadow-paper" />

      <div className="group corner-ticks relative rounded-2xl border border-ink/12 bg-cream p-7 text-ink/20 shadow-lift transition duration-300 hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-soft md:p-8">
        <div className="flex items-center justify-between">
          <p className="label-accent">Discover Me · Match</p>
          <span className="font-mono text-[10px] uppercase tracking-widest text-ash">
            Result 01 / 04
          </span>
        </div>

        <div className="mt-6 flex items-baseline justify-between gap-4 border-b border-ink/10 pb-6">
          <div>
            <p className="label">Creative · People-focused</p>
            <h3 className="mt-2 font-display text-4xl font-light tracking-tight text-ink md:text-5xl">
              UX Designer
            </h3>
          </div>
          <div className="text-right">
            <p className="font-display text-5xl font-light tabular text-tomato md:text-6xl">
              92
            </p>
            <p className="label-accent">% fit</p>
          </div>
        </div>

        {/* Salary visualization, entry / median / top markers */}
        <div className="mt-6">
          <div className="flex items-baseline justify-between">
            <p className="label">Salary range</p>
            <p className="font-display text-sm text-smoke tabular">
              <span className="text-ink">$80k</span> median
            </p>
          </div>
          <div className="relative mt-3 h-1.5 rounded-full bg-ink/10">
            <span
              className="absolute inset-y-0 left-[15%] right-[10%] rounded-full bg-tomato"
              aria-hidden
            />
            {/* Median marker */}
            <span
              aria-hidden
              className="absolute -top-1 h-3.5 w-0.5 -translate-x-1/2 rounded bg-ink"
              style={{ left: "55%" }}
            />
          </div>
          <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-widest tabular text-ash">
            <span>$55k entry</span>
            <span>$130k top</span>
          </div>
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-y-5 border-t border-ink/10 pt-6">
          <div>
            <dt className="label">Outlook</dt>
            <dd className="mt-1 flex items-center gap-1.5 font-display text-xl text-ink">
              <TrendingUp className="h-4 w-4 text-moss" /> +8%
            </dd>
          </div>
          <div>
            <dt className="label">Education</dt>
            <dd className="mt-1 font-display text-lg text-ink">Bachelor&apos;s</dd>
          </div>
          <div>
            <dt className="label">Entry</dt>
            <dd className="mt-1 font-display text-lg text-ink">~4 yrs</dd>
          </div>
          <div>
            <dt className="label">Remote-friendly</dt>
            <dd className="mt-1 font-display text-lg text-ink">High</dd>
          </div>
        </dl>

        <div className="mt-6 border-t border-ink/10 pt-6">
          <p className="label">Why this matched you</p>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-graphite">
            <li className="flex gap-3">
              <span className="font-mono text-tomato">→</span>
              You like drawing and design
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-tomato">→</span>
              You&apos;re empathetic and communicative
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-tomato">→</span>
              You wanted to avoid heavy math, this role doesn&apos;t need it
            </li>
          </ul>
        </div>

        <div className="mt-7 flex items-center justify-between border-t border-ink/10 pt-6">
          <p className="text-sm text-smoke">Tap to explore the full profile</p>
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink text-cream transition group-hover:bg-tomato">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>

      {/* Floating accents */}
      <div
        aria-hidden
        className="absolute -bottom-6 -right-6 hidden h-32 w-32 rounded-full bg-tomato/15 blur-3xl md:block"
      />
      <div
        aria-hidden
        className="absolute -top-8 -left-6 hidden h-24 w-24 rounded-full bg-moss/20 blur-3xl md:block"
      />

      <div className="absolute -bottom-3 right-8 rotate-1 rounded-md border border-ink/15 bg-paper px-3 py-1.5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift">
        <p className="font-mono text-[10px] uppercase tracking-widest text-ink">
          + 3 more matches
        </p>
      </div>

    </div>
  );
}
