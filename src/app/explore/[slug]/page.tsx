import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Briefcase,
  GraduationCap,
  TrendingUp,
} from "lucide-react";
import { Container } from "@/components/container";
import { CopyProfileLink } from "@/components/copy-profile-link";
import { CareerCard } from "@/components/career-card";
import { QuestButton } from "@/components/quest-button";
import { RecentCareerTracker } from "@/components/recent-career-tracker";
import { SaveCareerButton } from "@/components/save-career-button";
import { SectionLabel } from "@/components/section-label";
import {
  formatSalary,
  formatSalaryRange,
  careers,
  getCareerById,
  getRelatedCareers,
} from "@/lib/careers";
import { EDUCATION_LABELS, GROWTH_LABELS } from "@/lib/types";
import type { Career } from "@/lib/types";

import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return careers.map((career) => ({ slug: career.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const career = getCareerById(slug);

  if (!career) {
    return { title: "Career not found" };
  }

  return {
    title: career.title,
    description: `${career.tagline} — ${formatSalaryRange(career)} typical US salary, ${EDUCATION_LABELS[career.education].toLowerCase()}, and a roadmap from high school to your first hire.`,
  };
}

const SALARY_CEILING = 220_000;
function pct(n: number) {
  return Math.min(100, Math.max(2, Math.round((n / SALARY_CEILING) * 100)));
}

export default async function CareerDetailPage({ params }: Props) {
  const { slug } = await params;
  const career = getCareerById(slug);

  if (!career) {
    notFound();
  }

  const related = getRelatedCareers(career);
  const minPct = pct(career.salaryMin);
  const maxPct = pct(career.salaryMax);
  const medianPct = pct(career.salaryMedian);

  return (
    <>
      <RecentCareerTracker careerId={career.id} />
      <Container className="pb-32 md:pb-20">
        <nav className="mt-8 flex flex-wrap items-center gap-2 text-sm text-smoke" aria-label="Breadcrumb">
          <Link href="/" className="transition hover:text-tomato">
            Home
          </Link>
          <span aria-hidden>/</span>
          <Link href="/explore" className="transition hover:text-tomato">
            Explore
          </Link>
          <span aria-hidden>/</span>
          <span className="text-ink">{career.title}</span>
        </nav>
        <Link
          href="/explore"
          className="mt-5 inline-flex items-center gap-2 rounded-full border border-transparent px-3 py-1.5 text-sm font-medium text-smoke transition hover:border-ink/15 hover:bg-cream hover:text-tomato"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to the map
        </Link>
        <CareerBreadcrumbs category={career.category} title={career.title} />

        {/* Header */}
        <header className="mt-6 border-b border-ink/10 pb-12">
          <SectionLabel variant="accent">{career.category}</SectionLabel>
          <h1 className="mt-6 max-w-4xl animate-fade-up font-display text-display-1 font-light tracking-tightest text-ink">
            {career.title}
          </h1>
          <p
            className="mt-6 max-w-2xl animate-fade-up font-display text-xl font-light italic text-tomato md:text-2xl"
            style={{ animationDelay: "60ms" }}
          >
            {career.tagline}
          </p>
          <p
            className="mt-8 max-w-2xl animate-fade-up text-[17px] leading-relaxed text-graphite md:text-lg"
            style={{ animationDelay: "120ms" }}
          >
            {career.summary}
          </p>

          <div className="mt-10 hidden flex-wrap items-center gap-3 md:flex">
            <QuestButton href={`/path?goal=${encodeURIComponent(career.title)}`} size="lg">
              <Briefcase className="h-4 w-4" />
              Build my roadmap to {career.title}
            </QuestButton>
            <SaveCareerButton careerId={career.id} />
            <CopyProfileLink />
          </div>
        </header>

        {/* Key stats */}
        <dl className="grid grid-cols-2 divide-ink/10 border-b border-ink/10 md:grid-cols-4 md:divide-x">
          <Detail
            label="Salary range"
            value={formatSalaryRange(career)}
            sub={`Median ${formatSalary(career.salaryMedian)}`}
          />
          <Detail
            label="Job outlook"
            value={
              <span className="inline-flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-moss" />
                {GROWTH_LABELS[career.growthOutlook].replace(" than average", "")}
              </span>
            }
            sub={`~${career.growthPercent}% projected by 2032`}
          />
          <Detail
            label="Education"
            value={EDUCATION_LABELS[career.education]}
            sub={career.educationLabel}
          />
          <Detail label="Time to entry" value={career.timeToEntry} sub="From high school" />
        </dl>

        {/* Reality check */}
        <section className="grid gap-6 border-b border-ink/10 py-10 md:grid-cols-3">
          <div className="rounded-2xl border border-ink/10 bg-cream p-5">
            <p className="label-accent">Best first move</p>
            <p className="mt-3 font-display text-2xl font-light leading-tight text-ink">
              Build proof with one small project.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-smoke">
              Use the roadmap to choose a course, volunteer moment, portfolio piece,
              or shadowing step that fits your grade level.
            </p>
          </div>
          <div className="rounded-2xl border border-ink/10 bg-paper p-5">
            <p className="label-accent">Good fit if</p>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-graphite">
              {career.interests.slice(0, 3).map((interest) => (
                <li key={interest} className="flex gap-2">
                  <span className="font-mono text-tomato">+</span>
                  {interest}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-ink/10 bg-paper p-5">
            <p className="label-accent">Watch out for</p>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-graphite">
              {career.avoids.slice(0, 3).map((avoid) => (
                <li key={avoid} className="flex gap-2">
                  <span className="font-mono text-ash">-</span>
                  {avoid}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Salary visualization */}
        <section className="grid gap-10 border-b border-ink/10 py-14 md:grid-cols-[1fr_2fr] md:gap-16">
          <SectionLabel number="02">Salary on the map</SectionLabel>
          <div>
            <div className="flex items-baseline justify-between gap-4">
              <p className="font-display text-3xl font-light tabular text-ink md:text-4xl">
                {formatSalary(career.salaryMin)}{" "}
                <span className="font-mono text-xs uppercase tracking-widest text-ash">
                  entry
                </span>
              </p>
              <p className="font-display text-3xl font-light tabular text-ink md:text-4xl">
                {formatSalary(career.salaryMax)}{" "}
                <span className="font-mono text-xs uppercase tracking-widest text-ash">
                  top
                </span>
              </p>
            </div>
            <div className="relative mt-6 h-3 rounded-full bg-ink/8">
              <span
                aria-hidden
                className="absolute inset-y-0 rounded-full bg-gradient-to-r from-tomato/40 via-tomato to-tomato/80"
                style={{ left: `${minPct}%`, width: `${Math.max(2, maxPct - minPct)}%` }}
              />
              <span
                aria-hidden
                className="absolute -top-2 h-7 w-0.5 -translate-x-1/2 rounded bg-ink"
                style={{ left: `${medianPct}%` }}
              />
              <span
                className="absolute -top-9 hidden -translate-x-1/2 whitespace-nowrap rounded-md border border-ink/15 bg-paper px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-ink shadow-paper sm:inline-flex"
                style={{ left: `${medianPct}%` }}
              >
                Median {formatSalary(career.salaryMedian)}
              </span>
            </div>
            <p className="mt-3 inline-flex rounded-md border border-ink/15 bg-paper px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-ink shadow-paper sm:hidden">
              Median {formatSalary(career.salaryMedian)}
            </p>
            <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest tabular text-ash">
              <span>$0</span>
              <span>$110k</span>
              <span>${(SALARY_CEILING / 1000).toFixed(0)}k+</span>
            </div>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-smoke">
              Range reflects typical US salaries for this role across experience
              levels. Entry-level hires usually start near the lower end; the
              median is what most working professionals earn.
            </p>
          </div>
        </section>

        {/* Day in life */}
        <section className="grid gap-10 border-b border-ink/10 py-14 md:grid-cols-[1fr_2fr] md:gap-16">
          <SectionLabel number="03">A day in the life</SectionLabel>
          <ol className="space-y-6">
            {career.dayInLife.map((item, i) => (
              <li
                key={`${item}-${i}`}
                className="grid grid-cols-[auto_1fr] gap-5 border-b border-ink/10 pb-6 last:border-0"
              >
                <span className="font-mono text-xs tabular text-tomato pt-1">
                  0{i + 1}
                </span>
                <p className="font-display text-xl font-light leading-snug text-ink md:text-2xl">
                  {item}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* Skills */}
        <section className="grid gap-10 border-b border-ink/10 py-14 md:grid-cols-[1fr_2fr] md:gap-16">
          <SectionLabel number="04">Skills to start building</SectionLabel>
          <div>
            <ul className="flex flex-wrap gap-2">
              {career.skillsToBuild.map((skill, i) => (
                <li
                  key={skill}
                  className="group inline-flex items-center gap-2 rounded-full border border-ink/15 bg-cream px-4 py-2 text-[15px] font-medium text-ink transition hover:border-tomato hover:bg-tomato/5 hover:text-tomato"
                >
                  <span className="font-mono text-[10px] tabular text-ash group-hover:text-tomato">
                    0{i + 1}
                  </span>
                  {skill}
                </li>
              ))}
            </ul>
            <Link
              href={`/path?goal=${encodeURIComponent(career.title)}`}
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-ink"
            >
              <span className="underline-link">
                See how to build these in your roadmap
              </span>
            </Link>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && <Related related={related} />}
      </Container>

      {/* Sticky mobile CTA, appears on small screens only */}
      <div className="print:hidden sticky bottom-0 z-40 border-t border-ink/15 bg-paper/95 shadow-[var(--shadow-sticky)] backdrop-blur-lg md:hidden">
        <Container className="flex items-center justify-between gap-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3">
          <div className="min-w-0">
            <p className="label">Ready?</p>
            <p className="truncate font-display text-base font-light text-ink">
              Roadmap to {career.title}
            </p>
          </div>
          <QuestButton
            href={`/path?goal=${encodeURIComponent(career.title)}`}
            size="sm"
            className="shrink-0"
          >
            <GraduationCap className="h-4 w-4" />
            Build
          </QuestButton>
        </Container>
      </div>
    </>
  );
}

function Detail({
  label,
  value,
  sub,
}: {
  label: string;
  value: React.ReactNode;
  sub?: string;
}) {
  return (
    <div className="px-2 py-8 first:pl-0 md:px-7">
      <p className="label">{label}</p>
      <p className="mt-3 font-display text-2xl font-light tracking-tight text-ink md:text-3xl">
        {value}
      </p>
      {sub && <p className="mt-1 text-xs text-smoke">{sub}</p>}
    </div>
  );
}

function Related({ related }: { related: Career[] }) {
  return (
    <section className="pt-14">
      <SectionLabel number="05">Related paths</SectionLabel>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((r) => (
          <CareerCard key={r.id} career={r} compact />
        ))}
      </div>
    </section>
  );
}
