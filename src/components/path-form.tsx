"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Flag, Target } from "lucide-react";
import { CareerCard } from "@/components/career-card";
import { QuestButton } from "@/components/quest-button";
import { careers } from "@/lib/careers";
import { buildCareerPath, suggestCareersForGoal } from "@/lib/path-builder";
import type { CareerPath } from "@/lib/types";

export function PathForm() {
  const searchParams = useSearchParams();
  const [goal, setGoal] = useState("");
  const [path, setPath] = useState<CareerPath | null>(null);
  const [suggestions, setSuggestions] = useState<ReturnType<typeof suggestCareersForGoal>>(
    []
  );

  const careerTitles = useMemo(
    () => careers.map((c) => c.title).sort(),
    []
  );

  useEffect(() => {
    const preset = searchParams.get("goal");
    if (preset) {
      setGoal(preset);
      const built = buildCareerPath(preset);
      if (built) {
        setPath(built);
        setSuggestions([]);
      }
    }
  }, [searchParams]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const built = buildCareerPath(goal);
    if (built) {
      setPath(built);
      setSuggestions([]);
    } else {
      setPath(null);
      setSuggestions(suggestCareersForGoal(goal));
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <form onSubmit={handleSubmit} className="quest-panel space-y-4">
        <div>
          <label htmlFor="goal" className="quest-label">
            What do you want to become?
          </label>
          <p className="mb-2 text-sm text-quest-muted">
            Type a job title or pick from suggestions.
          </p>
          <input
            id="goal"
            list="career-suggestions"
            className="quest-input"
            placeholder="AI researcher, nurse, UX designer..."
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            required
          />
          <datalist id="career-suggestions">
            {careerTitles.map((title) => (
              <option key={title} value={title} />
            ))}
          </datalist>
        </div>
        <QuestButton type="submit">
          <Target className="h-4 w-4" />
          Build my quest path
        </QuestButton>
      </form>

      {suggestions.length > 0 && (
        <section className="quest-panel">
          <h2 className="font-display text-xl font-bold text-quest-ink">
            We couldn&apos;t find an exact match — did you mean?
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {suggestions.map((career) => (
              <CareerCard key={career.id} career={career} compact />
            ))}
          </div>
        </section>
      )}

      {path && (
        <section className="space-y-6">
          <div className="quest-panel border-quest-coral/15 bg-gradient-to-br from-quest-surface to-quest-coral/[0.04]">
            <p className="text-sm font-bold uppercase tracking-wider text-quest-coral">
              Your main quest
            </p>
            <h2 className="mt-1 font-display text-2xl font-semibold text-quest-ink">
              {path.career.title}
            </h2>
            <p className="mt-2 leading-relaxed text-quest-muted">{path.encouragement}</p>
            <Link
              href={`/explore/${path.career.id}`}
              className="mt-3 inline-block text-sm font-bold text-quest-coral hover:underline"
            >
              View full career profile →
            </Link>
          </div>

          <div className="quest-panel">
            <h3 className="font-display text-lg font-bold text-quest-ink">Gaps to plan for</h3>
            <ul className="mt-3 space-y-2 text-sm text-quest-muted">
              {path.gaps.map((gap) => (
                <li key={gap} className="flex gap-2">
                  <Flag className="mt-0.5 h-4 w-4 shrink-0 text-quest-gold" />
                  {gap}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            {path.steps.map((step, i) => (
              <div key={step.phase} className="quest-panel relative pl-10">
                <div className="absolute left-4 top-6 flex h-full flex-col items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-quest-navy text-sm font-bold text-white shadow-soft">
                    {i + 1}
                  </div>
                  {i < path.steps.length - 1 && (
                    <div className="mt-2 w-px flex-1 bg-quest-border" />
                  )}
                </div>
                <p className="text-xs font-bold uppercase tracking-wider text-quest-lavender">
                  {step.phase}
                </p>
                <h3 className="mt-1 font-display text-lg font-bold text-quest-ink">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-quest-muted">
                  {step.description}
                </p>
                <ul className="mt-3 space-y-1.5 text-sm text-quest-ink/80">
                  {step.actions.map((action) => (
                    <li key={action} className="flex gap-2">
                      <span className="text-quest-coral">✦</span>
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
