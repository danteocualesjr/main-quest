import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Briefcase,
  TrendingUp,
} from "lucide-react";
import { Container } from "@/components/container";
import { CareerCard } from "@/components/career-card";
import { QuestButton } from "@/components/quest-button";
import { SectionLabel } from "@/components/section-label";
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
    <Container className="pb-20">
      <Link
        href="/explore"
        className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-smoke transition hover:text-tomato"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to the map
      </Link>

      {/* Header */}
      <header className="mt-8 border-b border-ink/10 pb-12">
        <SectionLabel variant="accent">{career.category}</SectionLabel>
        <h1 className="mt-6 max-w-4xl font-display text-display-1 font-light tracking-tightest text-ink">
          {career.title}
        </h1>
        <p className="mt-6 max-w-2xl font-display text-xl font-light italic text-tomato md:text-2xl">
          {career.tagline}
        </p>
        <p className="mt-8 max-w-2xl text-[17px] leading-relaxed text-graphite md:text-lg">
          {career.summary}
        </p>

        <div className="mt-10">
          <QuestButton href={`/path?goal=${encodeURIComponent(career.title)}`} size="lg">
            <Briefcase className="h-4 w-4" />
            Build my roadmap to {career.title}
          </QuestButton>
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
          sub={`~${career.growthPercent}% projected`}
        />
        <Detail
          label="Education"
          value={EDUCATION_LABELS[career.education]}
          sub={career.educationLabel}
        />
        <Detail label="Time to entry" value={career.timeToEntry} sub="From high school" />
      </dl>

      {/* Day in life */}
      <section className="grid gap-10 border-b border-ink/10 py-14 md:grid-cols-[1fr_2fr] md:gap-16">
        <SectionLabel number="01">A day in the life</SectionLabel>
        <ol className="space-y-6">
          {career.dayInLife.map((item, i) => (
            <li key={item} className="grid grid-cols-[auto_1fr] gap-5 border-b border-ink/10 pb-6 last:border-0">
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
        <SectionLabel number="02">Skills to start building</SectionLabel>
        <ul className="flex flex-wrap gap-2">
          {career.skillsToBuild.map((skill) => (
            <li
              key={skill}
              className="border border-ink/15 bg-cream px-4 py-2 text-[15px] font-medium text-ink"
            >
              {skill}
            </li>
          ))}
        </ul>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="pt-14">
          <SectionLabel number="03">Related paths</SectionLabel>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <CareerCard key={r.id} career={r} compact />
            ))}
          </div>
        </section>
      )}
    </Container>
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
    <div className="px-2 py-7 first:pl-0 md:px-7">
      <p className="label">{label}</p>
      <p className="mt-3 font-display text-2xl font-light tracking-tight text-ink md:text-3xl">
        {value}
      </p>
      {sub && <p className="mt-1 text-xs text-smoke">{sub}</p>}
    </div>
  );
}
