import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Quote } from "lucide-react";
import { Container } from "@/components/container";
import { SectionLabel } from "@/components/section-label";
import { QuestButton } from "@/components/quest-button";
import { CareerCard } from "@/components/career-card";
import { HeroPreview } from "@/components/hero-preview";
import { Marquee } from "@/components/marquee";
import { careers } from "@/lib/careers";
import { getCareerStats } from "@/lib/explore";

const featured = careers.filter((c) =>
  ["ai-researcher", "registered-nurse", "ux-designer", "content-creator"].includes(c.id)
);

const marqueeRoles = careers.slice(0, 12).map((c) => c.title);

const paths = [
  {
    n: "01",
    href: "/discover",
    title: "Discover Me",
    sell: "When you have no idea where to start.",
    body: "Describe what you enjoy and what you'd rather avoid. We surface careers that fit, including ones you'd never have Googled.",
    cta: "Take the quiz",
    sample: "I like art but I'm bad at math",
  },
  {
    n: "02",
    href: "/path",
    title: "Path to a Goal",
    sell: "When you already know the destination.",
    body: "Type the role you're aiming for. We reverse-engineer the steps from high school through your first hire, courses, skills, milestones.",
    cta: "Build my roadmap",
    sample: "I want to be an AI researcher",
  },
  {
    n: "03",
    href: "/explore",
    title: "Career Map",
    sell: "When you'd rather browse first.",
    body: "Filter 30+ US careers by salary, education, and growth. Compare side by side before you commit to anything.",
    cta: "Open the map",
    sample: "Show me $90k+ healthcare roles",
  },
];

const quotes = [
  {
    text: "I thought I had to pick one thing forever. Discover Me showed me four paths I'd never heard of.",
    who: "Maya · 11th grade · Texas",
  },
  {
    text: "I typed 'AI researcher' and got a real roadmap. My counselor meeting actually had a plan in it.",
    who: "Jordan · 12th grade · California",
  },
  {
    text: "The salary data was the wake-up call my parents needed. Nursing made sense to all of us.",
    who: "Priya · 12th grade · New Jersey",
  },
];

export default function HomePage() {
  const stats = getCareerStats();

  return (
    <>
      {/* HERO */}
      <section className="relative grain overflow-hidden border-b border-ink/10 pb-24 pt-12 md:pb-28 md:pt-16">
        {/* Decorative ambient blobs (very subtle) */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 right-[-10%] hidden h-[420px] w-[420px] rounded-full bg-tomato/10 blur-[120px] md:block"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 left-[-8%] hidden h-[360px] w-[360px] rounded-full bg-moss/10 blur-[120px] md:block"
        />

        <Container className="relative">
          <div className="animate-fade-up">
            <SectionLabel number="01" variant="accent">
              An honest career guide for students
            </SectionLabel>
          </div>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:items-end">
            <div>
              <h1
                className="animate-fade-up font-display font-light tracking-tightest text-ink text-display-1"
                style={{ animationDelay: "60ms" }}
              >
                Pick your{" "}
                <em className="relative font-normal italic text-tomato">
                  next move
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 right-0 h-[3px] origin-left animate-draw-line rounded-full bg-tomato/30"
                    style={{ animationDelay: "780ms" }}
                  />
                </em>
                <br />
                with clarity.
              </h1>
              <p
                className="mt-8 max-w-xl animate-fade-up text-lg leading-[1.55] text-graphite md:text-xl"
                style={{ animationDelay: "180ms" }}
              >
                Main Quest turns &ldquo;I don&apos;t know what to do&rdquo; into
                concrete next steps, careers that actually fit you, roadmaps
                to dream jobs, and real US salary data. Two minutes. No sign-up.
              </p>

              <div
                className="mt-10 flex animate-fade-up flex-wrap items-center gap-x-6 gap-y-4"
                style={{ animationDelay: "260ms" }}
              >
                <QuestButton href="/discover" size="lg">
                  Start with Discover Me
                  <ArrowRight className="h-4 w-4 transition group-hover/btn:translate-x-0.5" />
                </QuestButton>
                <Link
                  href="/explore"
                  className="group inline-flex items-center gap-2 text-[15px] font-medium text-ink"
                >
                  <span className="underline-link">Or browse all {stats.totalCareers} careers</span>
                  <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>

              <div
                className="mt-12 grid animate-fade-up grid-cols-1 gap-3 border-t border-ink/10 pt-8 sm:grid-cols-3 sm:gap-6"
                style={{ animationDelay: "360ms" }}
              >
                <Stat
                  n={stats.totalCareers.toString()}
                  unit="paths"
                  label="Career paths"
                />
                <Stat
                  n={`$${(stats.avgMedianSalary / 1000).toFixed(0)}`}
                  unit="k median"
                  label="Avg. pay"
                />
                <Stat
                  n={stats.fastestGrowing.toString()}
                  unit="fast-growing"
                  label="Above-average roles"
                />
              </div>
            </div>

            <div className="animate-scale-in lg:pl-4" style={{ animationDelay: "200ms" }}>
              <HeroPreview />
            </div>
          </div>

          {/* Scroll hint */}
          <div
            className="mt-16 hidden animate-fade-in items-center gap-3 text-smoke md:flex"
            style={{ animationDelay: "520ms" }}
          >
            <span className="h-px w-12 bg-ink/15" />
            <span className="label inline-flex items-center gap-2">
              <ArrowDown className="h-3 w-3 animate-pulse-soft" />
              Scroll for the three doors
            </span>
          </div>
        </Container>
      </section>

      {/* MARQUEE */}
      <section className="border-b border-ink/10 bg-cream py-6">
        <Marquee items={marqueeRoles} />
      </section>

      {/* THREE DOORS */}
      <section className="border-b border-ink/10 py-20 md:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
            <div>
              <SectionLabel number="02">Three doors in</SectionLabel>
              <h2 className="mt-6 font-display text-display-2 font-light text-ink">
                Wherever you are, <em className="italic text-tomato">start here.</em>
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-smoke">
                Confused, focused, or just curious, there&apos;s a way in that
                meets you where you actually are today.
              </p>
            </div>

            <ul className="divide-y divide-ink/10 border-y border-ink/10">
              {paths.map(({ n, href, title, sell, body, cta, sample }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group relative grid grid-cols-[auto_1fr] items-start gap-5 py-8 transition hover:bg-cream/60 sm:grid-cols-[auto_1fr_auto] sm:gap-6"
                  >
                    {/* Hover accent rail */}
                    <span
                      aria-hidden
                      className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-tomato transition group-hover:scale-y-100"
                    />
                    <span className="font-mono text-sm font-medium tabular text-ash mt-1 transition group-hover:text-tomato">
                      {n}
                    </span>
                    <div>
                      <p className="label-accent">{sell}</p>
                      <h3 className="mt-2 font-display text-3xl font-light tracking-tight text-ink transition group-hover:text-tomato md:text-4xl">
                        {title}
                      </h3>
                      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-graphite">
                        {body}
                      </p>
                      <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-ink/15 bg-cream px-3 py-1.5 text-xs font-medium text-smoke">
                        <span className="font-mono text-ash">e.g.</span>
                        &ldquo;{sample}&rdquo;
                      </p>
                    </div>
                    <span className="col-span-2 inline-flex items-center gap-2 self-center text-sm font-medium text-ink sm:col-span-1 sm:col-start-3">
                      <span className="hidden md:inline">{cta}</span>
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 transition group-hover:border-tomato group-hover:bg-tomato group-hover:text-cream group-hover:shadow-soft">
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* HOW IT WORKS + QUOTES */}
      <section className="border-b border-ink/10 bg-cream py-20 md:py-28">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <SectionLabel number="03">How it works</SectionLabel>
              <h2 className="mt-6 font-display text-display-2 font-light text-ink">
                Less overwhelm.
                <br />
                <em className="italic text-tomato">More &ldquo;oh, that makes sense.&rdquo;</em>
              </h2>

              <ol className="mt-12 space-y-10">
                <Step
                  n="i"
                  title="Tell us about you"
                  body="Interests, strengths, or a dream job. Whatever you have, even &ldquo;I don't know&rdquo; counts."
                />
                <Step
                  n="ii"
                  title="See real options"
                  body="Matches and roadmaps backed by US salary and growth data. No vague platitudes."
                />
                <Step
                  n="iii"
                  title="Take the next step"
                  body="Know what to study, what to build, and what to explore, starting today, not someday."
                />
              </ol>
            </div>

            <div className="space-y-6 lg:pt-16">
              {quotes.map(({ text, who }, i) => (
                <figure
                  key={who}
                  className="relative rounded-r-xl border-l-2 border-tomato bg-paper px-7 py-7 shadow-paper transition hover:shadow-soft"
                >
                  <Quote
                    className="absolute -left-px top-7 h-5 w-5 -translate-x-[10px] bg-cream text-tomato"
                    aria-hidden
                  />
                  <blockquote className="font-display text-lg font-light italic leading-[1.45] text-ink md:text-xl">
                    {text}
                  </blockquote>
                  <figcaption className="mt-4 label">{who}</figcaption>
                  <span className="absolute -right-3 -top-3 font-mono text-xs tabular text-ash">
                    0{i + 1}
                  </span>
                </figure>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* FEATURED CAREERS */}
      <section className="border-b border-ink/10 bg-ink py-20 text-cream md:py-28">
        <Container>
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionLabel number="04" variant="accent">
                Where students start
              </SectionLabel>
              <h2 className="mt-6 font-display text-display-2 font-light text-cream">
                A few of the
                <br />
                <em className="italic text-clay">most-explored</em> roles.
              </h2>
            </div>
            <Link
              href="/explore"
              className="group inline-flex items-center gap-2 self-start rounded-full border border-cream/20 px-5 py-3 text-sm font-medium text-cream transition hover:bg-cream hover:text-ink md:self-end"
            >
              View all {stats.totalCareers} paths
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <ul className="mt-12 divide-y divide-cream/12 border-y border-cream/15">
            {featured.map((career, i) => (
              <CareerCard key={career.id} career={career} index={i + 1} dark />
            ))}
          </ul>
        </Container>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 md:py-32">
        <Container size="prose" className="text-center">
          <SectionLabel number="05" variant="accent" className="justify-center">
            Your move
          </SectionLabel>
          <h2 className="mt-8 font-display text-display-2 font-light text-ink">
            Your next step is one honest{" "}
            <em className="italic text-tomato">conversation</em> with yourself away.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-graphite">
            Two minutes. No account. No emails. No pressure to have it figured out.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <QuestButton href="/discover" size="lg">
              Start Discover Me (free)
              <ArrowRight className="h-4 w-4" />
            </QuestButton>
            <QuestButton href="/path" variant="ghost" size="lg">
              I already have a goal
            </QuestButton>
          </div>
        </Container>
      </section>
    </>
  );
}

function Stat({ n, label, unit }: { n: string; label: string; unit?: string }) {
  return (
    <div className="stat-tile">
      <p className="font-display text-3xl font-light tabular text-ink md:text-4xl">
        {n}
        {unit && (
          <span className="ml-1 font-mono text-xs font-medium uppercase tracking-widest text-smoke">
            {unit}
          </span>
        )}
      </p>
      <p className="label mt-1">{label}</p>
    </div>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <li className="grid grid-cols-[auto_1fr] gap-6 border-l-2 border-ink/10 pl-6">
      <span className="font-mono text-sm uppercase tabular text-tomato pt-1">{n}</span>
      <div>
        <p className="font-display text-2xl font-light text-ink">{title}</p>
        <p className="mt-2 text-[15px] leading-relaxed text-graphite">{body}</p>
      </div>
    </li>
  );
}
