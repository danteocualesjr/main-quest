"use client";

import { useMemo, useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Flag, Loader2 } from "lucide-react";
import { pathAction } from "@/app/actions/path";
import { CoachPanel } from "@/components/coach-panel";
import { PathSuggestionCard } from "@/components/path-suggestion-card";
import { QuestButton } from "@/components/quest-button";
import { SectionLabel } from "@/components/section-label";
import { ScrollToFormBar } from "@/components/scroll-to-form-bar";
import { SourceNote } from "@/components/source-note";
import { careers } from "@/lib/careers";
import { GRADE_OPTIONS } from "@/lib/grade-levels";
import { loadPathSession, savePathSession } from "@/lib/session-storage";
import type { PathSource } from "@/lib/path-ai";
import type { Career, CareerPath } from "@/lib/types";

const goalExamples = [
  "AI researcher",
  "Registered nurse",
  "UX designer",
  "Software engineer",
  "Mechanical engineer",
  "Content creator",
];

export function PathForm() {
  const searchParams = useSearchParams();
  const sessionRestored = useRef(false);
  const lastBuiltUrlGoal = useRef<string | null>(null);
  const requestId = useRef(0);
  const [goal, setGoal] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");
  const [path, setPath] = useState<CareerPath | null>(null);
  const [suggestions, setSuggestions] = useState<Career[]>([]);
  const [source, setSource] = useState<PathSource | null>(null);
  const [loading, setLoading] = useState(false);
  const [buildingCareerId, setBuildingCareerId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [noMatch, setNoMatch] = useState(false);
  const [submittedGoal, setSubmittedGoal] = useState<string | null>(null);
  const [submittedGrade, setSubmittedGrade] = useState<string | null>(null);

  const careerTitles = useMemo(() => careers.map((c) => c.title).sort(), []);

  const progress = useMemo(() => {
    let n = 0;
    if (goal.trim().length > 2) n++;
    if (gradeLevel) n++;
    return n;
  }, [goal, gradeLevel]);

  const persistSession = useCallback(
    (
      nextGoal: string,
      nextGrade: string,
      nextPath: CareerPath | null,
      nextSuggestions: Career[],
      nextSource: PathSource | null
    ) => {
      savePathSession({
        goal: nextGoal,
        gradeLevel: nextGrade,
        path: nextPath,
        suggestions: nextSuggestions,
        source: nextSource,
      });
    },
    []
  );

  const runPathBuild = useCallback(
    async (goalQuery: string, gradeQuery = gradeLevel) => {
      const id = ++requestId.current;
      setLoading(true);
      setError(null);
      setNoMatch(false);

      try {
        const result = await pathAction({ goal: goalQuery, gradeLevel: gradeQuery || undefined });
        if (id !== requestId.current) return;

        setSource(result.source);

        if (result.kind === "path") {
          setPath(result.path);
          setSuggestions([]);
          setNoMatch(false);
          setSubmittedGoal(goalQuery.trim());
          setSubmittedGrade(gradeQuery);
          persistSession(goalQuery, gradeQuery, result.path, [], result.source);
          requestAnimationFrame(() => {
            document.getElementById("roadmap")?.scrollIntoView({ behavior: "smooth", block: "start" });
          });
        } else {
          setPath(null);
          setSuggestions(result.suggestions);
          setNoMatch(result.suggestions.length === 0);
          setSubmittedGoal(goalQuery.trim());
          setSubmittedGrade(gradeQuery);
          persistSession(goalQuery, gradeQuery, null, result.suggestions, result.source);
        }
      } catch {
        if (id !== requestId.current) return;
        setError("Something went wrong building your path. Try again in a moment.");
        setPath(null);
        setSuggestions([]);
        setSource(null);
        setNoMatch(false);
      } finally {
        if (id === requestId.current) {
          setLoading(false);
          setBuildingCareerId(null);
        }
      }
    },
    [gradeLevel, persistSession]
  );

  const goalFromUrl = searchParams.get("goal");

  useEffect(() => {
    if (sessionRestored.current) return;
    sessionRestored.current = true;

    if (goalFromUrl) return;

    const saved = loadPathSession();
    if (!saved) return;

    setGoal(saved.goal);
    setGradeLevel(saved.gradeLevel);
    setPath(saved.path);
    setSuggestions(saved.suggestions);
    setSource(saved.source);
    if (saved.path || saved.suggestions.length > 0) {
      setSubmittedGoal(saved.goal.trim());
      setSubmittedGrade(saved.gradeLevel);
    }
  }, [goalFromUrl]);

  const resultsAreStale =
    submittedGoal !== null &&
    (submittedGoal !== goal.trim() || submittedGrade !== gradeLevel);

  useEffect(() => {
    if (resultsAreStale) {
      setPath(null);
      setSuggestions([]);
      setSource(null);
      setNoMatch(false);
      setSubmittedGoal(null);
      setSubmittedGrade(null);
    }
  }, [resultsAreStale, goal, gradeLevel]);

  useEffect(() => {
    if (!goalFromUrl) return;

    const saved = loadPathSession();
    const grade = saved?.gradeLevel ?? "";
    const buildKey = `${goalFromUrl}|${grade}`;
    if (buildKey === lastBuiltUrlGoal.current) return;

    if (
      saved &&
      saved.goal === goalFromUrl &&
      saved.gradeLevel === grade &&
      (saved.path || saved.suggestions.length > 0)
    ) {
      lastBuiltUrlGoal.current = buildKey;
      setGoal(goalFromUrl);
      setGradeLevel(grade);
      setPath(saved.path);
      setSuggestions(saved.suggestions);
      setSource(saved.source);
      setSubmittedGoal(goalFromUrl.trim());
      setSubmittedGrade(grade);
      return;
    }

    lastBuiltUrlGoal.current = buildKey;
    setGoal(goalFromUrl);
    if (grade) setGradeLevel(grade);
    void runPathBuild(goalFromUrl, grade);
  }, [goalFromUrl, runPathBuild]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!goal.trim()) {
      setError("Enter a career goal before building your path.");
      return;
    }
    await runPathBuild(goal.trim());
  }

  async function handleBuildSuggestion(career: Career) {
    setGoal(career.title);
    setBuildingCareerId(career.id);
    await runPathBuild(career.title);
  }

  return (
    <div className="space-y-20">
      <form
        id="page-form"
        onSubmit={handleSubmit}
        className="glass-panel scroll-mt-24 p-5 md:p-7"
      >
        <SectionLabel variant="accent">Your goal</SectionLabel>
        <div
          className="mt-6 flex items-center gap-4 rounded-2xl border border-ink/10 bg-cream/55 px-4 py-3"
          aria-label="Path form completeness"
        >
          <div className="flex flex-1 gap-1.5">
            {[0, 1].map((i) => (
              <span
                key={i}
                className={`h-1.5 flex-1 rounded-full transition ${
                  i < progress ? "bg-tomato" : "bg-ink/10"
                }`}
              />
            ))}
          </div>
          <p className="label tabular">{progress}/2 fields</p>
        </div>
        <div className="mt-4 grid items-end gap-6 md:grid-cols-[1fr_auto]">
          <div>
            <label htmlFor="goal" className="sr-only">
              What do you want to become?
            </label>
            <input
              id="goal"
              list="career-suggestions"
              className="input-bare font-display text-3xl font-light tracking-tight md:text-5xl"
              placeholder="AI researcher, nurse, UX designer..."
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              required
              disabled={loading}
            />
            <datalist id="career-suggestions">
              {careerTitles.map((title) => (
                <option key={title} value={title} />
              ))}
            </datalist>
          </div>
          <QuestButton type="submit" size="lg" disabled={loading}>
            {loading && !buildingCareerId ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Building your path…
              </>
            ) : (
              <>
                Build the path
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </QuestButton>
        </div>

        {/* Example goals */}
        {!goal && !loading && !path && (
          <div className="mt-6 flex flex-wrap items-center gap-2 animate-fade-in">
            <span className="label">Try:</span>
            {goalExamples.map((example) => (
              <button
                type="button"
                key={example}
                onClick={() => setGoal(example)}
                className="filter-chip"
              >
                {example}
              </button>
            ))}
          </div>
        )}

        <div className="mt-10 grid gap-3 border-t border-ink/10 pt-8">
          <label htmlFor="path-grade" className="font-display text-xl font-light text-ink md:text-2xl">
            Grade level
            <span className="ml-2 text-sm text-smoke">Optional. Helps tailor your roadmap.</span>
          </label>
          <select
            id="path-grade"
            className="input-block max-w-md font-display text-lg font-light tracking-tight md:text-xl"
            value={gradeLevel}
            onChange={(e) => setGradeLevel(e.target.value)}
            disabled={loading}
          >
            <option value="">Select...</option>
            {GRADE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <p className="mt-3 inline-flex items-center gap-2 text-sm text-tomato animate-fade-in">
            <span className="h-1.5 w-1.5 rounded-full bg-tomato" />
            {error}
          </p>
        )}
      </form>

      {loading && !buildingCareerId && (
        <section className="border-t border-ink/10 pt-12 animate-fade-in" aria-busy>
          <SectionLabel variant="accent">Building…</SectionLabel>
          <h2 className="mt-4 font-display text-3xl font-light tracking-tight text-ink md:text-5xl">
            Reverse-engineering the steps to{" "}
            <em className="italic text-tomato">{goal || "your goal"}</em>.
          </h2>
          <div className="mt-10 space-y-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className="grid gap-6 md:grid-cols-[auto_1fr_2fr]">
                <div className="skeleton h-3 w-16 rounded" />
                <div>
                  <div className="skeleton h-3 w-20 rounded" />
                  <div className="skeleton mt-3 h-7 w-3/4 rounded" />
                  <div className="skeleton mt-3 h-3 w-full rounded" />
                </div>
                <div className="space-y-2">
                  <div className="skeleton h-3 w-full rounded" />
                  <div className="skeleton h-3 w-5/6 rounded" />
                  <div className="skeleton h-3 w-2/3 rounded" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {noMatch && !loading && !path && (
        <section className="animate-fade-up border-t border-ink/10 pt-12">
          <SectionLabel variant="accent">No match found</SectionLabel>
          <h2 className="mt-4 font-display text-3xl font-light tracking-tight text-ink md:text-4xl">
            We couldn&apos;t match that goal
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] text-graphite">
            Try a role from our career library, pick an example above, or use a more
            specific title like &quot;Registered nurse&quot; or &quot;UX designer&quot;.
          </p>
          <Link
            href="/explore"
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink"
          >
            <span className="underline-link">Browse all careers</span>
            <ArrowRight className="h-4 w-4 text-tomato" />
          </Link>
        </section>
      )}

      {suggestions.length > 0 && !loading && (
        <section className="animate-fade-up">
          <SectionLabel variant="accent">No exact match</SectionLabel>
          <h2 className="mt-4 font-display text-3xl font-light tracking-tight text-ink md:text-4xl">
            Did you mean one of these?
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] text-graphite">
            Build a full roadmap for any role below, or open its profile for salary and day-in-the-life
            details.
          </p>
          {source && <SourceNote flow="path" source={source} />}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {suggestions.map((career) => (
              <PathSuggestionCard
                key={career.id}
                career={career}
                onBuildPath={handleBuildSuggestion}
                building={loading && buildingCareerId === career.id}
              />
            ))}
          </div>
        </section>
      )}

      {path && !loading && (
        <section id="roadmap" className="scroll-mt-24 space-y-16 animate-fade-up">
          <div className="border-t border-ink/10 pt-12">
            <SectionLabel variant="accent">Your main quest</SectionLabel>
            <div className="mt-6 grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
              <div>
                <h2 className="font-display text-display-2 font-light tracking-tight text-ink">
                  {path.career.title}
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-graphite">
                  {path.encouragement}
                </p>
                {source && <SourceNote flow="path" source={source} />}
              </div>
              <Link
                href={`/explore/${path.career.id}`}
                className="group inline-flex items-center gap-2 self-start text-sm font-medium text-ink md:self-end"
              >
                <span className="underline-link">View full career profile</span>
                <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          {path.gaps.length > 0 && (
            <div className="border-t border-ink/10 pt-10">
              <SectionLabel>Gaps to plan for</SectionLabel>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {path.gaps.map((gap, gapIndex) => (
                  <li
                    key={`${gap}-${gapIndex}`}
                    className="card-lift flex gap-3 rounded-2xl border border-ink/10 bg-cream p-5 text-[15px] leading-relaxed text-graphite"
                  >
                    <Flag className="mt-0.5 h-4 w-4 shrink-0 text-tomato" />
                    {gap}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="border-t border-ink/10 pt-10">
            <SectionLabel>The roadmap</SectionLabel>
            <ol className="relative mt-10 space-y-12">
              {/* Vertical timeline rail */}
              <div
                aria-hidden
                className="pointer-events-none absolute bottom-2 left-[68px] top-2 hidden w-px bg-gradient-to-b from-tomato/40 via-ink/10 to-transparent md:block"
              />
              {path.steps.map((step, i) => (
                <li
                  key={`${step.phase}-${i}`}
                  className="surface-card-soft relative grid gap-6 p-6 md:grid-cols-[auto_1fr_2fr]"
                >
                  <span className="font-mono text-xs uppercase tabular tracking-widest text-tomato md:pt-2">
                    Phase 0{i + 1}
                  </span>

                  {/* Timeline node */}
                  <span
                    aria-hidden
                    className="absolute left-[58px] top-8 hidden h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full border border-tomato/50 bg-paper md:flex"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-tomato" />
                  </span>

                  <div className="md:pt-1 md:pl-4">
                    <p className="label">{step.phase}</p>
                    <h3 className="mt-2 font-display text-2xl font-light tracking-tight text-ink md:text-3xl">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-graphite">
                      {step.description}
                    </p>
                  </div>
                  <ul className="space-y-3 border-l border-ink/10 pl-6 md:pt-2">
                    {step.actions.map((action, actionIndex) => (
                      <li
                        key={`${action}-${actionIndex}`}
                        className="grid grid-cols-[auto_1fr] gap-3 text-[15px] leading-relaxed text-ink"
                      >
                        <span className="font-mono text-tomato">→</span>
                        {action}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>

            <div className="mt-16 flex flex-col items-start gap-4 border-t border-ink/10 pt-8 md:flex-row md:items-center md:justify-between">
              <p className="max-w-md text-sm text-smoke">
                Roadmaps are starting points, not contracts. Real careers branch,
                and that&apos;s a feature, not a bug.
              </p>
              <Link
                href="/explore"
                className="group inline-flex items-center gap-2 text-sm font-medium text-ink"
              >
                <span className="underline-link">Explore related roles</span>
                <ArrowRight className="h-4 w-4 text-tomato transition group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          {source === "ai" && submittedGoal === goal.trim() && submittedGrade === gradeLevel && (
            <CoachPanel
              context={{
                mode: "path",
                goal: submittedGoal,
                gradeLevel: submittedGrade || undefined,
                path: {
                  career: {
                    id: path.career.id,
                    title: path.career.title,
                  },
                  steps: path.steps.map((step) => ({
                    phase: step.phase,
                    title: step.title,
                    actions: step.actions,
                  })),
                  gaps: path.gaps,
                  encouragement: path.encouragement,
                },
              }}
            />
          )}
        </section>
      )}

      {!loading && (path || suggestions.length > 0) && (
        <ScrollToFormBar label="Change your goal" />
      )}
    </div>
  );
}
