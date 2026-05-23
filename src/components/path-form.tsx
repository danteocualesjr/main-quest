"use client";

import { useMemo, useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Flag, Loader2 } from "lucide-react";
import { pathAction } from "@/app/actions/path";
import { PathSuggestionCard } from "@/components/path-suggestion-card";
import { QuestButton } from "@/components/quest-button";
import { SectionLabel } from "@/components/section-label";
import { SourceNote } from "@/components/source-note";
import { careers } from "@/lib/careers";
import { GRADE_OPTIONS } from "@/lib/grade-levels";
import { loadPathSession, savePathSession } from "@/lib/session-storage";
import type { PathSource } from "@/lib/path-ai";
import type { Career, CareerPath } from "@/lib/types";

export function PathForm() {
  const searchParams = useSearchParams();
  const restoredFromStorage = useRef(false);
  const lastPresetGoal = useRef<string | null>(null);
  const [goal, setGoal] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");
  const [path, setPath] = useState<CareerPath | null>(null);
  const [suggestions, setSuggestions] = useState<Career[]>([]);
  const [source, setSource] = useState<PathSource | null>(null);
  const [loading, setLoading] = useState(false);
  const [buildingCareerId, setBuildingCareerId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const careerTitles = useMemo(() => careers.map((c) => c.title).sort(), []);

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
      setLoading(true);
      setError(null);

      try {
        const result = await pathAction({ goal: goalQuery, gradeLevel: gradeQuery || undefined });
        setSource(result.source);

        if (result.kind === "path") {
          setPath(result.path);
          setSuggestions([]);
          persistSession(goalQuery, gradeQuery, result.path, [], result.source);
          requestAnimationFrame(() => {
            document.getElementById("roadmap")?.scrollIntoView({ behavior: "smooth", block: "start" });
          });
        } else {
          setPath(null);
          setSuggestions(result.suggestions);
          persistSession(goalQuery, gradeQuery, null, result.suggestions, result.source);
        }
      } catch {
        setError("Something went wrong building your path. Try again in a moment.");
        setPath(null);
        setSuggestions([]);
        setSource(null);
      } finally {
        setLoading(false);
        setBuildingCareerId(null);
      }
    },
    [gradeLevel, persistSession]
  );

  useEffect(() => {
    const preset = searchParams.get("goal");

    if (preset) {
      if (preset === lastPresetGoal.current) return;
      lastPresetGoal.current = preset;

      const saved = loadPathSession();
      if (saved?.gradeLevel) {
        setGradeLevel(saved.gradeLevel);
      }

      setGoal(preset);
      void runPathBuild(preset, saved?.gradeLevel ?? "");
      return;
    }

    if (restoredFromStorage.current) return;
    restoredFromStorage.current = true;

    const saved = loadPathSession();
    if (!saved) return;

    setGoal(saved.goal);
    setGradeLevel(saved.gradeLevel);
    setPath(saved.path);
    setSuggestions(saved.suggestions);
    setSource(saved.source);
  }, [searchParams, runPathBuild]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await runPathBuild(goal);
  }

  async function handleBuildSuggestion(career: Career) {
    setGoal(career.title);
    setBuildingCareerId(career.id);
    await runPathBuild(career.title);
  }

  return (
    <div className="space-y-20">
      <form onSubmit={handleSubmit} className="border-t border-ink/10 pt-12">
        <SectionLabel variant="accent">Your goal</SectionLabel>
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

        <div className="mt-10 grid gap-3 border-t border-ink/10 pt-8">
          <label htmlFor="path-grade" className="font-display text-xl font-light text-ink md:text-2xl">
            Grade level
            <span className="ml-2 text-sm text-smoke">Optional — helps tailor your roadmap</span>
          </label>
          <select
            id="path-grade"
            className="input-bare max-w-md font-display text-2xl font-light tracking-tight md:text-3xl"
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

        {error && <p className="mt-3 text-sm text-tomato">{error}</p>}
      </form>

      {suggestions.length > 0 && (
        <section>
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

      {path && (
        <section id="roadmap" className="space-y-16">
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
                {path.gaps.map((gap) => (
                  <li
                    key={gap}
                    className="flex gap-3 border border-ink/10 bg-cream p-5 text-[15px] leading-relaxed text-graphite"
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
            <ol className="mt-10 space-y-12">
              {path.steps.map((step, i) => (
                <li key={`${step.phase}-${i}`} className="grid gap-6 md:grid-cols-[auto_1fr_2fr]">
                  <span className="font-mono text-xs uppercase tabular tracking-widest text-tomato md:pt-2">
                    Phase 0{i + 1}
                  </span>
                  <div className="md:pt-1">
                    <p className="label">{step.phase}</p>
                    <h3 className="mt-2 font-display text-2xl font-light tracking-tight text-ink md:text-3xl">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-graphite">
                      {step.description}
                    </p>
                  </div>
                  <ul className="space-y-3 border-l border-ink/10 pl-6 md:pt-2">
                    {step.actions.map((action) => (
                      <li
                        key={action}
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
          </div>
        </section>
      )}
    </div>
  );
}
