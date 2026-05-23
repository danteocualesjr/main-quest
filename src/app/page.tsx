import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Map,
  Quote,
  Search,
  Target,
} from "lucide-react";
import { Container } from "@/components/container";
import { HeroVisual } from "@/components/hero-visual";
import { PromptChip } from "@/components/prompt-chip";
import { QuestButton } from "@/components/quest-button";
import { CareerCard } from "@/components/career-card";
import { careers } from "@/lib/careers";
import { getCareerStats } from "@/lib/explore";

const featured = careers.filter((c) =>
  ["ux-designer", "registered-nurse", "ai-researcher", "content-creator"].includes(c.id)
);

const paths = [
  {
    href: "/discover",
    step: "01",
    icon: Search,
    accent: "bg-quest-lavender/15 text-quest-lavender ring-quest-lavender/20",
    title: "Discover Me",
    hook: "No idea yet? Perfect.",
    description:
      "Describe what you enjoy and what you'd avoid. We match you to careers you might never have Googled.",
    cta: "Find my matches",
  },
  {
    href: "/path",
    step: "02",
    icon: Target,
    accent: "bg-quest-coral/15 text-quest-coral ring-quest-coral/20",
    title: "Path to a Goal",
    hook: "Already have a dream job?",
    description:
      "Reverse-engineer it — classes to take, skills to build, and milestones from high school to hire.",
    cta: "Build my roadmap",
  },
  {
    href: "/explore",
    step: "03",
    icon: Map,
    accent: "bg-quest-mint/15 text-quest-mint ring-quest-mint/20",
    title: "Explore Careers",
    hook: "Want to browse first?",
    description:
      "Filter 30+ US careers by salary, education, and growth. Compare side by side before you commit.",
    cta: "Open the map",
  },
];

const steps = [
  { title: "Tell us about you", body: "Interests, strengths, or a dream job — whatever you have." },
  { title: "See real options", body: "Matches and roadmaps backed by US salary and growth data." },
  { title: "Take the next step", body: "Know what to study, build, and explore — starting today." },
];

const quotes = [
  {
    text: "I thought I had to pick one thing forever. Discover Me showed me four paths I'd never heard of.",
    who: "11th grader · Texas",
  },
  {
    text: "I typed 'AI researcher' and got a full roadmap. My counselor meeting actually had a plan in it.",
    who: "12th grader · California",
  },
];

export default function HomePage() {
  const stats = getCareerStats();

  return (
    <>
      <section className="quest-mesh overflow-hidden pb-16 pt-10 md:pb-24 md:pt-14">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-quest-navy px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                Free · Built for students
              </p>
              <h1 className="mt-6 font-display text-[2.75rem] font-semibold leading-[1.08] tracking-tight text-quest-ink md:text-6xl lg:text-[4.25rem]">
                You don&apos;t need to have it{" "}
                <span className="quest-display-accent italic">all figured out.</span>
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-quest-muted md:text-xl">
                Main Quest turns &ldquo;I don&apos;t know what to do&rdquo; into clear next
                steps — careers that fit you, roadmaps to dream jobs, and real US salary data.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <QuestButton href="/discover" size="lg">
                  Start Discover Me
                  <ArrowRight className="h-4 w-4" />
                </QuestButton>
                <QuestButton href="/explore" variant="ghost" size="lg">
                  Browse careers
                </QuestButton>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-quest-muted">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-quest-mint" />
                  {stats.totalCareers}+ career paths
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-quest-mint" />
                  BLS-style salary data
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-quest-mint" />
                  No account needed
                </span>
              </div>
            </div>

            <HeroVisual />
          </div>

          <div className="mt-14 border-t border-quest-border/60 pt-10">
            <p className="text-sm font-semibold text-quest-muted">
              Try a prompt — tap to jump in
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <PromptChip
                label="I like art but I'm bad at math"
                href="/discover"
              />
              <PromptChip
                label="I want to be an AI researcher"
                href="/path?goal=AI%20Researcher"
              />
              <PromptChip label="Show me high-paying healthcare jobs" href="/explore" />
            </div>
          </div>
        </Container>
      </section>

      <section className="quest-section-band">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-semibold text-quest-ink md:text-4xl">
              Three doors in. One clear direction out.
            </h2>
            <p className="mt-3 text-lg text-quest-muted">
              Wherever you are — confused, focused, or curious — start here.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {paths.map(({ href, step, icon: Icon, accent, title, hook, description, cta }) => (
              <Link
                key={href}
                href={href}
                className="group relative flex flex-col rounded-3xl border border-quest-border bg-quest-surface p-7 shadow-card transition hover:-translate-y-1 hover:border-quest-coral/20 hover:shadow-lift"
              >
                <span className="absolute right-6 top-6 font-display text-4xl font-semibold text-quest-border">
                  {step}
                </span>
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ring-1 ${accent}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-5 text-sm font-bold text-quest-coral">{hook}</p>
                <h3 className="mt-1 font-display text-2xl font-semibold text-quest-ink">
                  {title}
                </h3>
                <p className="mt-3 flex-1 leading-relaxed text-quest-muted">{description}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-quest-coral">
                  {cta}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-display text-3xl font-semibold text-quest-ink md:text-4xl">
                How it works
              </h2>
              <p className="mt-3 text-lg text-quest-muted">
                Less overwhelm. More &ldquo;oh, that actually makes sense.&rdquo;
              </p>
              <ol className="mt-10 space-y-8">
                {steps.map(({ title, body }, i) => (
                  <li key={title} className="flex gap-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-quest-navy text-sm font-bold text-white">
                      {i + 1}
                    </div>
                    <div>
                      <p className="font-display text-xl font-semibold text-quest-ink">
                        {title}
                      </p>
                      <p className="mt-1 text-quest-muted">{body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="grid gap-4">
              {quotes.map(({ text, who }) => (
                <figure
                  key={who}
                  className="rounded-2xl border border-quest-border bg-quest-surface p-6 shadow-card"
                >
                  <Quote className="h-8 w-8 text-quest-coral/40" />
                  <blockquote className="mt-3 font-display text-lg leading-relaxed text-quest-ink">
                    &ldquo;{text}&rdquo;
                  </blockquote>
                  <figcaption className="mt-4 text-sm font-medium text-quest-muted">
                    — {who}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-quest-border bg-quest-navy py-16 text-white md:py-20">
        <Container>
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-display text-3xl font-semibold md:text-4xl">
                Careers students explore first
              </h2>
              <p className="mt-3 max-w-lg text-white/70">
                Tap any role for salary ranges, day-in-the-life details, and a personalized
                roadmap.
              </p>
            </div>
            <QuestButton href="/explore" variant="ghost" className="shrink-0 border-white/20 bg-white/10 text-white hover:bg-white/15">
              View all {stats.totalCareers}+ paths
            </QuestButton>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {featured.map((career, i) => (
              <CareerCard
                key={career.id}
                career={career}
                compact={i > 1}
                featured={i === 0}
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="quest-mesh py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-2xl rounded-[2rem] border border-quest-border bg-quest-surface p-10 text-center shadow-lift md:p-14">
            <h2 className="font-display text-3xl font-semibold text-quest-ink md:text-4xl">
              Your next step is one conversation with yourself away.
            </h2>
            <p className="mt-4 text-lg text-quest-muted">
              Two minutes. No sign-up. Just honest answers about what you like.
            </p>
            <QuestButton href="/discover" size="lg" className="mt-8">
              Start Discover Me — it&apos;s free
              <ArrowRight className="h-4 w-4" />
            </QuestButton>
          </div>
        </Container>
      </section>
    </>
  );
}
