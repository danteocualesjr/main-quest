type MarqueeProps = {
  items: string[];
  speed?: "default" | "slow";
};

export function Marquee({ items, speed = "default" }: MarqueeProps) {
  const animation = speed === "slow" ? "animate-marquee-slow" : "animate-marquee";
  const sequence = [...items, ...items];
  return (
    <div className="group/marquee relative overflow-hidden px-6 sm:px-8 lg:px-12" aria-hidden>
      <div
        className={`flex w-max items-center gap-12 md:gap-14 ${animation} group-hover/marquee:[animation-play-state:paused] motion-reduce:animate-none`}
      >
        {sequence.map((item, i) => (
          <div key={`${item}-${i}`} className="flex shrink-0 items-center gap-12">
            <span className="font-display text-2xl font-light tracking-tight text-ink transition duration-200 hover:scale-[1.02] hover:text-tomato md:text-3xl">
              {item}
            </span>
            <span aria-hidden className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-tomato/80" />
              <span className="h-px w-6 bg-gradient-to-r from-ink/20 to-transparent" />
            </span>
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-cream via-cream/90 to-transparent sm:w-24 md:w-36 dark:from-paper dark:via-paper/90" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-cream via-cream/90 to-transparent sm:w-24 md:w-36 dark:from-paper dark:via-paper/90" />
    </div>
  );
}
