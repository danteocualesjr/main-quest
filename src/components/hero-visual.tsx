import { Briefcase, Sparkles, TrendingUp } from "lucide-react";

export function HeroVisual() {
  return (
    <div className="relative mx-auto h-[420px] w-full max-w-md lg:max-w-none">
      <div className="absolute inset-4 rounded-[2rem] bg-gradient-to-br from-quest-lavender/20 via-quest-coral/10 to-quest-mint/15 ring-1 ring-quest-border/60" />

      <div className="animate-float absolute left-0 top-8 z-10 w-[85%] max-w-[280px] rounded-2xl border border-quest-border bg-quest-surface p-4 shadow-lift">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-quest-lavender">
              Top match
            </p>
            <p className="mt-1 font-display text-lg font-semibold text-quest-ink">
              UX Designer
            </p>
            <p className="mt-0.5 text-xs text-quest-muted">Creative · People-focused</p>
          </div>
          <div className="rounded-xl bg-quest-coral/10 px-2.5 py-1.5 text-center ring-1 ring-quest-coral/20">
            <p className="text-lg font-bold text-quest-coral">92%</p>
            <p className="text-[9px] font-semibold uppercase text-quest-muted">fit</p>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {["You like creating", "Strong communicator"].map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-quest-card px-2 py-0.5 text-[10px] font-medium text-quest-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="animate-float-delayed absolute bottom-16 right-0 z-20 w-[78%] max-w-[260px] rounded-2xl border border-quest-border bg-quest-navy p-4 text-white shadow-lift">
        <div className="flex items-center gap-2 text-quest-mint">
          <Briefcase className="h-4 w-4" />
          <p className="text-[10px] font-bold uppercase tracking-wider">Your path</p>
        </div>
        <p className="mt-2 font-display text-base font-semibold">AI Researcher</p>
        <ol className="mt-3 space-y-2 text-xs text-white/75">
          <li className="flex gap-2">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/15 text-[10px] font-bold">
              1
            </span>
            AP Calc + CS in high school
          </li>
          <li className="flex gap-2">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/15 text-[10px] font-bold">
              2
            </span>
            CS undergrad + research lab
          </li>
        </ol>
      </div>

      <div className="absolute bottom-4 left-8 z-30 rounded-xl border border-quest-border bg-quest-surface px-3 py-2 shadow-card">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-quest-mint" />
          <div>
            <p className="text-xs font-bold text-quest-ink">$118k median</p>
            <p className="text-[10px] text-quest-muted">Registered Nurse · Fast growth</p>
          </div>
        </div>
      </div>

      <div className="absolute right-6 top-2 z-0 flex items-center gap-1.5 rounded-full border border-quest-border bg-quest-surface/90 px-3 py-1.5 text-xs font-medium text-quest-muted shadow-soft backdrop-blur-sm">
        <Sparkles className="h-3.5 w-3.5 text-quest-gold" />
        32+ career paths
      </div>
    </div>
  );
}
