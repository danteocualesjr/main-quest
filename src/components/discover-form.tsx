"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { CareerCard } from "@/components/career-card";
import { QuestButton } from "@/components/quest-button";
import { discoverCareers } from "@/lib/matching";
import type { CareerMatch } from "@/lib/types";

export function DiscoverForm() {
  const [likes, setLikes] = useState("");
  const [strengths, setStrengths] = useState("");
  const [weaknesses, setWeaknesses] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");
  const [results, setResults] = useState<CareerMatch[] | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const matches = discoverCareers({ likes, strengths, weaknesses, gradeLevel });
    setResults(matches);
  }

  return (
    <div className="space-y-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
        <form onSubmit={handleSubmit} className="quest-panel space-y-5">
          <div>
            <label htmlFor="likes" className="quest-label">
              What do you enjoy?
            </label>
            <p className="mb-2 text-sm text-quest-muted">
              Hobbies, subjects, activities — be specific.
            </p>
            <textarea
              id="likes"
              className="quest-input min-h-[96px] resize-y"
              placeholder="I like drawing, helping people, and making videos..."
              value={likes}
              onChange={(e) => setLikes(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="strengths" className="quest-label">
              What are you good at?
            </label>
            <textarea
              id="strengths"
              className="quest-input min-h-[72px] resize-y"
              placeholder="Communication, creativity, staying organized..."
              value={strengths}
              onChange={(e) => setStrengths(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="weaknesses" className="quest-label">
              What do you want to avoid?
            </label>
            <textarea
              id="weaknesses"
              className="quest-input min-h-[72px] resize-y"
              placeholder="Heavy math, blood, long presentations..."
              value={weaknesses}
              onChange={(e) => setWeaknesses(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="grade" className="quest-label">
              Grade level{" "}
              <span className="font-normal text-quest-muted">(optional)</span>
            </label>
            <select
              id="grade"
              className="quest-input"
              value={gradeLevel}
              onChange={(e) => setGradeLevel(e.target.value)}
            >
              <option value="">Select...</option>
              <option value="9">9th grade</option>
              <option value="10">10th grade</option>
              <option value="11">11th grade</option>
              <option value="12">12th grade</option>
              <option value="college">College / gap year</option>
            </select>
          </div>

          <QuestButton type="submit" size="lg" className="w-full sm:w-auto">
            <Sparkles className="h-4 w-4" />
            Find my matches
          </QuestButton>
        </form>

        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-4 rounded-2xl border border-quest-border bg-quest-card/80 p-5">
            <p className="text-sm font-bold text-quest-ink">Tips for better matches</p>
            <ul className="space-y-3 text-sm text-quest-muted">
              <li>✦ Mention subjects you actually enjoy, not just what you&apos;re good at</li>
              <li>✦ &ldquo;I hate math&rdquo; is valid — it helps filter roles</li>
              <li>✦ Include hobbies (gaming, sports, art) — they reveal career fits</li>
            </ul>
          </div>
        </aside>
      </div>

      {results && (
        <section>
          <h2 className="font-display text-2xl font-semibold text-quest-ink">
            {results.length > 0 ? "Your top matches" : "No strong matches yet"}
          </h2>
          <p className="mt-2 text-quest-muted">
            {results.length > 0
              ? "Tap any card for salary data, day-in-the-life, and a full roadmap."
              : "Try adding more detail about what you like and what you're good at."}
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {results.map((match) => (
              <CareerCard
                key={match.career.id}
                career={match.career}
                matchScore={match.score}
                reasons={match.reasons}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
