"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Flag, Loader2 } from "lucide-react";
import { pathAction } from "@/app/actions/path";
import { CareerCard } from "@/components/career-card";
import { QuestButton } from "@/components/quest-button";
import { SectionLabel } from "@/components/section-label";
import { careers } from "@/lib/careers";
import type { PathSource } from "@/lib/path-ai";
import type { Career, CareerPath } from "@/lib/types";

export function PathForm() {
  const searchParams = useSearchParams();
  const [goal, setGoal] = useState("");
  const [path, setPath] = useState<CareerPath | null>(null);
  const [suggestions, setSuggestions] = useState<Career[]>([]);
  const [source, setSource] = useState<PathSource | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const careerTitles = useMemo(() => careers.map((c) => c.title).sort(), []);

  const runPathBuild = useCallback(async (goalQuery: string) => {
    setLoading(true);
    setError(null);

    try {
      const result = await pathAction(goalQuery);
      setSource(result.source);

      if (result.kind === "path") {
        setPath(result.path);
        setSuggestions([]);
        requestAnimationFrame(() => {
          document.getElementById("roadmap")?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      } else {
        setPath(null);
        setSuggestions(result.suggestions);
      }
    } catch {
      setError("Something went wrong building your path. Try again in a moment.");
      setPath(null);
      setSuggestions([]);
      setSource(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const preset = searchParams.get("goal");
    if (preset) {
      setGoal(preset);
      void runPathBuild(preset);
    }
  }, [searchParams, runPathBuild]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await runPathBuild(goal);
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
            {loading ? (
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
        {error && <p className="mt-3 text-sm text-tomato">{error}</p>}
      </form>

      {suggestions.length > 0 && (
        <section>
          <SectionLabel variant="accent">No exact match</SectionLabel>
          <h2 className="mt-4 font-display text-3xl font-light tracking-tight text-ink md:text-4xl">
            Did you mean one of these?
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] text-graphite">
            Pick a role below to open its full profile, or refine your goal and try again.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {suggestions.map((career) => (
              <CareerCard key={career.id} career={career} compact />
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
                {source === "ai" && (
                  <p className="mt-3 label text-smoke">
                    Roadmap tailored to your goal — education and salary facts come from our career
                    catalog.
                  </p>
                )}
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
