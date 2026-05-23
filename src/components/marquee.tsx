type MarqueeProps = {
  items: string[];
  speed?: "default" | "slow";
};

export function Marquee({ items, speed = "default" }: MarqueeProps) {
  const animation = speed === "slow" ? "animate-marquee-slow" : "animate-marquee";
  const sequence = [...items, ...items];
  return (
    <div className="relative overflow-hidden">
      <div className={`flex w-max gap-12 ${animation}`}>
        {sequence.map((item, i) => (
          <div key={`${item}-${i}`} className="flex items-center gap-12 shrink-0">
            <span className="font-display text-2xl font-light tracking-tight text-ink md:text-3xl">
              {item}
            </span>
            <span className="h-1 w-1 rounded-full bg-tomato" />
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-paper to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-paper to-transparent" />
    </div>
  );
}
