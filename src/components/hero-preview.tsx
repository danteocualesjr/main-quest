import { ArrowUpRight, TrendingUp } from "lucide-react";

export function HeroPreview() {
  return (
    <div className="relative">
      <div className="relative rounded-xl border border-ink/12 bg-cream p-8 shadow-lift">
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

        <dl className="mt-6 grid grid-cols-2 gap-y-5">
          <div>
            <dt className="label">Salary</dt>
            <dd className="mt-1 font-display text-xl text-ink tabular">$55k – $130k</dd>
          </div>
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
              You wanted to avoid heavy math — this role doesn&apos;t need it
            </li>
          </ul>
        </div>

        <div className="mt-7 flex items-center justify-between border-t border-ink/10 pt-6">
          <p className="text-sm text-smoke">Tap to explore the full profile</p>
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink text-cream">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>

      <div className="absolute -bottom-6 -right-6 hidden h-32 w-32 rounded-full bg-tomato/15 blur-3xl md:block" />
      <div className="absolute -top-8 -left-6 hidden h-24 w-24 rounded-full bg-moss/20 blur-3xl md:block" />

      <div className="absolute -bottom-3 right-8 rotate-2 rounded-md border border-ink/15 bg-paper px-3 py-1.5 shadow-soft">
        <p className="font-mono text-[10px] uppercase tracking-widest text-ink">
          + 3 more matches
        </p>
      </div>
    </div>
  );
}
