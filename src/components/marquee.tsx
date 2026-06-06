type MarqueeProps = {
  items: string[];
  speed?: "default" | "slow";
};

export function Marquee({ items, speed = "default" }: MarqueeProps) {
  const animation = speed === "slow" ? "animate-marquee-slow" : "animate-marquee";
  const sequence = [...items, ...items];
  return (
    <div className="group/marquee relative overflow-hidden" aria-hidden>
      <div
        className={`flex w-max items-center gap-12 md:gap-14 ${animation} group-hover/marquee:[animation-play-state:paused] motion-reduce:animate-none`}
      >
        {sequence.map((item, i) => (
          <div key={`${item}-${i}`} className="flex items-center gap-12 shrink-0">
            <span className="font-display text-2xl font-light tracking-tight text-ink transition hover:scale-[1.02] hover:text-tomato md:text-3xl">
              {item}
            </span>
            <span aria-hidden className="inline-flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-tomato" />
              <span className="h-px w-4 bg-ink/15" />
              <span className="h-1 w-1 rounded-full bg-ink/20" />
            </span>
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-cream via-cream/80 to-transparent dark:from-paper dark:via-paper/80" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-cream via-cream/80 to-transparent dark:from-paper dark:via-paper/80" />
    </div>
  );
}
