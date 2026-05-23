import Link from "next/link";
import { ArrowRight, Map, Search, Sparkles, Target } from "lucide-react";
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
    icon: Search,
    iconBg: "bg-violet-100 text-quest-purple",
    title: "Discover Me",
    description:
      "Not sure yet? Share what you enjoy and what you'd rather avoid — we'll suggest careers that fit.",
    cta: "Find my matches",
  },
  {
    href: "/path",
    icon: Target,
    iconBg: "bg-amber-100 text-quest-gold",
    title: "Path to a Goal",
    description:
      "Already have a dream job in mind? Get a step-by-step roadmap from high school to your first role.",
    cta: "Build my path",
  },
  {
    href: "/explore",
    icon: Map,
    iconBg: "bg-teal-100 text-quest-teal",
    title: "Explore Careers",
    description:
      "Browse 30+ US career paths — filter by salary, education, growth, and compare side by side.",
    cta: "Open the map",
  },
];

export default function HomePage() {
  const stats = getCareerStats();

  return (
    <div className="space-y-20 pb-8">
      <section className="mx-auto max-w-3xl pt-4 text-center md:pt-8">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-quest-border bg-quest-surface px-4 py-1.5 text-sm font-medium text-quest-muted shadow-sm">
          <Sparkles className="h-4 w-4 text-quest-gold" />
          For students choosing their next step
        </div>
        <h1 className="font-display text-4xl font-bold tracking-tight text-quest-ink md:text-5xl md:leading-tight">
          Figure out what comes{" "}
          <span className="text-quest-indigo">after high school</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-quest-muted">
          Match careers to who you are, reverse-engineer paths to dream jobs, and
          explore real options with salary and growth data.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <QuestButton href="/discover">Start with Discover Me</QuestButton>
          <QuestButton href="/explore" variant="ghost">
            Browse all careers
          </QuestButton>
        </div>

        <p className="mt-8 text-sm text-quest-muted">
          {stats.totalCareers}+ career paths · US salary data · Free to use
        </p>
      </section>

      <section>
        <div className="mb-8 text-center">
          <h2 className="font-display text-2xl font-bold text-quest-ink">
            Three ways to get started
          </h2>
          <p className="mt-2 text-quest-muted">Pick the path that matches where you are today</p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {paths.map(({ href, icon: Icon, iconBg, title, description, cta }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col rounded-2xl border border-quest-border bg-quest-surface p-6 shadow-card transition hover:-translate-y-0.5 hover:border-quest-indigo/20 hover:shadow-lift"
            >
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconBg}`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-xl font-bold text-quest-ink">{title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-quest-muted">
                {description}
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-quest-indigo">
                {cta}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-quest-ink">Popular paths</h2>
            <p className="mt-1 text-quest-muted">
              Students often explore these — tap any card for the full breakdown
            </p>
          </div>
          <QuestButton href="/explore" variant="ghost" size="sm" className="shrink-0">
            See all careers
          </QuestButton>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {featured.map((career) => (
            <CareerCard key={career.id} career={career} compact />
          ))}
        </div>
      </section>
    </div>
  );
}
