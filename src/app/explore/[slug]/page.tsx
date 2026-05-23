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
    <div className="space-y-8">
      <Link
        href="/explore"
        className="inline-flex items-center gap-2 text-sm font-medium text-quest-muted transition hover:text-quest-indigo"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to career map
      </Link>

      <header className="quest-panel">
        <p className="text-sm font-semibold uppercase tracking-wider text-quest-purple">
          {career.category}
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold text-quest-ink md:text-4xl">
          {career.title}
        </h1>
        <p className="mt-2 text-lg font-medium text-quest-indigo">{career.tagline}</p>
        <p className="mt-4 leading-relaxed text-quest-muted">{career.summary}</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl bg-quest-card p-4">
            <DollarSign className="h-5 w-5 text-quest-teal" />
            <p className="mt-2 text-xs font-semibold uppercase text-quest-muted">
              Salary range
            </p>
            <p className="mt-1 font-semibold text-quest-ink">{formatSalaryRange(career)}</p>
            <p className="text-xs text-quest-muted">
              Median {formatSalary(career.salaryMedian)}
            </p>
          </div>
          <div className="rounded-xl bg-quest-card p-4">
            <TrendingUp className="h-5 w-5 text-quest-gold" />
            <p className="mt-2 text-xs font-semibold uppercase text-quest-muted">
              Job outlook
            </p>
            <p className="mt-1 font-semibold text-quest-ink">
              {GROWTH_LABELS[career.growthOutlook]}
            </p>
            <p className="text-xs text-quest-muted">~{career.growthPercent}% projected</p>
          </div>
          <div className="rounded-xl bg-quest-card p-4">
            <BookOpen className="h-5 w-5 text-quest-purple" />
            <p className="mt-2 text-xs font-semibold uppercase text-quest-muted">Education</p>
            <p className="mt-1 font-semibold text-quest-ink">
              {EDUCATION_LABELS[career.education]}
            </p>
          </div>
          <div className="rounded-xl bg-quest-card p-4">
            <Clock className="h-5 w-5 text-quest-amber" />
            <p className="mt-2 text-xs font-semibold uppercase text-quest-muted">
              Time to entry
            </p>
            <p className="mt-1 font-semibold text-quest-ink">{career.timeToEntry}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <QuestButton href={`/path?goal=${encodeURIComponent(career.title)}`}>
            <Briefcase className="h-4 w-4" />
            Build path to this career
          </QuestButton>
        </div>
      </header>

      <section className="quest-panel">
        <h2 className="font-display text-xl font-bold text-quest-ink">A day in the life</h2>
        <ul className="mt-4 space-y-2.5">
          {career.dayInLife.map((item) => (
            <li key={item} className="flex gap-2 text-quest-muted">
              <span className="font-bold text-quest-indigo">▸</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="quest-panel">
        <h2 className="font-display text-xl font-bold text-quest-ink">
          Skills to start building
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {career.skillsToBuild.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-quest-teal/20 bg-quest-teal/10 px-3 py-1 text-sm font-medium text-quest-teal"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <section>
          <h2 className="font-display text-xl font-bold text-quest-ink">Related paths</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {related.map((r) => (
              <CareerCard key={r.id} career={r} compact />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
