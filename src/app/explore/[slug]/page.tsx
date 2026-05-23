import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  Briefcase,
  Clock,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { Container } from "@/components/container";
import { CareerCard } from "@/components/career-card";
import { QuestButton } from "@/components/quest-button";
import {
  formatSalary,
  formatSalaryRange,
  getCareerById,
  getRelatedCareers,
} from "@/lib/careers";
import { EDUCATION_LABELS, GROWTH_LABELS } from "@/lib/types";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function CareerDetailPage({ params }: Props) {
  const { slug } = await params;
  const career = getCareerById(slug);

  if (!career) {
    notFound();
  }

  const related = getRelatedCareers(career);

  return (
    <Container className="space-y-8 py-10 md:py-14">
      <Link
        href="/explore"
        className="inline-flex items-center gap-2 text-sm font-semibold text-quest-muted transition hover:text-quest-coral"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to career map
      </Link>

      <header className="quest-panel overflow-hidden p-0">
        <div className="border-b border-quest-border bg-quest-card/50 p-6 md:p-8">
          <p className="text-sm font-bold uppercase tracking-wider text-quest-lavender">
            {career.category}
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-quest-ink md:text-5xl">
            {career.title}
          </h1>
          <p className="mt-3 text-xl font-medium text-quest-coral">{career.tagline}</p>
          <p className="mt-4 max-w-3xl leading-relaxed text-quest-muted">{career.summary}</p>
        </div>

        <div className="grid gap-px bg-quest-border sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-quest-surface p-5">
            <DollarSign className="h-5 w-5 text-quest-mint" />
            <p className="mt-2 text-xs font-bold uppercase text-quest-muted">Salary range</p>
            <p className="mt-1 font-display text-lg font-semibold text-quest-ink">
              {formatSalaryRange(career)}
            </p>
            <p className="text-xs text-quest-muted">Median {formatSalary(career.salaryMedian)}</p>
          </div>
          <div className="bg-quest-surface p-5">
            <TrendingUp className="h-5 w-5 text-quest-gold" />
            <p className="mt-2 text-xs font-bold uppercase text-quest-muted">Job outlook</p>
            <p className="mt-1 font-display text-lg font-semibold text-quest-ink">
              {GROWTH_LABELS[career.growthOutlook]}
            </p>
            <p className="text-xs text-quest-muted">~{career.growthPercent}% projected</p>
          </div>
          <div className="bg-quest-surface p-5">
            <BookOpen className="h-5 w-5 text-quest-lavender" />
            <p className="mt-2 text-xs font-bold uppercase text-quest-muted">Education</p>
            <p className="mt-1 font-display text-lg font-semibold text-quest-ink">
              {EDUCATION_LABELS[career.education]}
            </p>
          </div>
          <div className="bg-quest-surface p-5">
            <Clock className="h-5 w-5 text-quest-coral" />
            <p className="mt-2 text-xs font-bold uppercase text-quest-muted">Time to entry</p>
            <p className="mt-1 font-display text-lg font-semibold text-quest-ink">
              {career.timeToEntry}
            </p>
          </div>
        </div>

        <div className="border-t border-quest-border p-6 md:p-8">
          <QuestButton href={`/path?goal=${encodeURIComponent(career.title)}`}>
            <Briefcase className="h-4 w-4" />
            Build path to this career
          </QuestButton>
        </div>
      </header>

      <section className="quest-panel">
        <h2 className="font-display text-xl font-semibold text-quest-ink">A day in the life</h2>
        <ul className="mt-4 space-y-3">
          {career.dayInLife.map((item) => (
            <li key={item} className="flex gap-3 text-quest-muted">
              <span className="font-bold text-quest-coral">▸</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="quest-panel">
        <h2 className="font-display text-xl font-semibold text-quest-ink">
          Skills to start building
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {career.skillsToBuild.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-quest-mint/25 bg-quest-mint/10 px-3 py-1.5 text-sm font-semibold text-quest-mint"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <section>
          <h2 className="font-display text-xl font-semibold text-quest-ink">Related paths</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {related.map((r) => (
              <CareerCard key={r.id} career={r} compact />
            ))}
          </div>
        </section>
      )}
    </Container>
  );
}
