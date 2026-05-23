"use client";

import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { discoverAction } from "@/app/actions/discover";
import { CareerCard } from "@/components/career-card";
import { QuestButton } from "@/components/quest-button";
import { SectionLabel } from "@/components/section-label";
import type { CareerMatch } from "@/lib/types";
import type { DiscoverSource } from "@/lib/discover-ai";

const tips = [
  "Mention subjects you actually enjoy, not just what you're good at.",
  "\u201cI hate math\u201d is a valid answer — it helps filter.",
  "Include hobbies (gaming, sports, art) — they reveal career fits.",
  "Be specific. \u201cI like helping people\u201d → \u201cI like tutoring my friends.\u201d",
];

export function DiscoverForm() {
  const [likes, setLikes] = useState("");
  const [strengths, setStrengths] = useState("");
  const [weaknesses, setWeaknesses] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");
  const [results, setResults] = useState<CareerMatch[] | null>(null);
  const [source, setSource] = useState<DiscoverSource | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { matches, source: matchSource } = await discoverAction({
        likes,
        strengths,
        weaknesses,
        gradeLevel,
      });
      setResults(matches);
      setSource(matchSource);
      requestAnimationFrame(() => {
        document.getElementById("matches")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } catch {
      setError("Something went wrong finding matches. Try again in a moment.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-20">
      <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr]">
        <form onSubmit={handleSubmit} className="space-y-12">
          <Field
            n="i"
            label="What do you enjoy?"
            hint="Hobbies, subjects, activities — be specific."
          >
            <textarea
              className="input-bare min-h-[92px] resize-y font-display text-2xl font-light tracking-tight md:text-3xl"
              placeholder="I like drawing, helping people, and making videos..."
              value={likes}
              onChange={(e) => setLikes(e.target.value)}
              required
              disabled={loading}
            />
          </Field>

          <Field
            n="ii"
            label="What are you good at?"
            hint="Soft skills, talents, things friends ask you for help with."
          >
            <textarea
              className="input-bare min-h-[80px] resize-y font-display text-2xl font-light tracking-tight md:text-3xl"
              placeholder="Communication, creativity, staying organized..."
              value={strengths}
              onChange={(e) => setStrengths(e.target.value)}
              disabled={loading}
            />
          </Field>

          <Field
            n="iii"
            label="What do you want to avoid?"
            hint="Be honest — this filters out poor fits."
          >
            <textarea
              className="input-bare min-h-[80px] resize-y font-display text-2xl font-light tracking-tight md:text-3xl"
              placeholder="Heavy math, blood, long presentations..."
              value={weaknesses}
              onChange={(e) => setWeaknesses(e.target.value)}
              disabled={loading}
            />
          </Field>

          <Field n="iv" label="Grade level" hint="Optional. Helps tailor advice.">
            <select
              className="input-bare font-display text-2xl font-light tracking-tight md:text-3xl"
              value={gradeLevel}
              onChange={(e) => setGradeLevel(e.target.value)}
              disabled={loading}
            >
              <option value="">Select...</option>
              <option value="9">9th grade</option>
              <option value="10">10th grade</option>
              <option value="11">11th grade</option>
              <option value="12">12th grade</option>
              <option value="college">College / gap year</option>
            </select>
          </Field>

          <div className="space-y-3 pt-4">
            <QuestButton type="submit" size="lg" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Reading your answers…
                </>
              ) : (
                <>
                  Find my matches
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </QuestButton>
            {error && <p className="text-sm text-tomato">{error}</p>}
          </div>
        </form>

        <aside className="lg:pl-8 lg:pt-2">
          <div className="sticky top-24 border-l border-ink/10 pl-8">
            <SectionLabel number="*" variant="accent">
              Tips for honest answers
            </SectionLabel>
            <ul className="mt-8 space-y-5">
              {tips.map((tip, i) => (
                <li key={tip} className="grid grid-cols-[auto_1fr] gap-3 text-[15px] leading-relaxed text-graphite">
                  <span className="font-mono text-xs tabular text-ash">0{i + 1}</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {results && (
        <section id="matches" className="border-t border-ink/10 pt-16">
          <SectionLabel variant="accent">Results</SectionLabel>
          <h2 className="mt-6 font-display text-display-2 font-light tracking-tight text-ink">
            {results.length > 0 ? (
              <>
                Your top <em className="italic text-tomato">{results.length} matches</em>
              </>
            ) : (
              "No strong matches yet."
            )}
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-graphite">
            {results.length > 0
              ? "Tap any role for salary data, day-in-the-life details, and a full roadmap."
              : "Try adding more detail about what you like and what you're good at."}
          </p>
          {source === "ai" && results.length > 0 && (
            <p className="mt-3 label text-smoke">
              Matched from your answers — salary and growth data come from our career catalog.
            </p>
          )}
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
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

function Field({
  n,
  label,
  hint,
  children,
}: {
  n: string;
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-3 border-t border-ink/10 pt-8">
      <div className="grid grid-cols-[auto_1fr] gap-3">
        <span className="font-mono text-xs uppercase tabular tracking-widest text-tomato pt-1">
          {n}
        </span>
        <div>
          <p className="font-display text-xl font-light text-ink md:text-2xl">{label}</p>
          {hint && <p className="mt-1 text-sm text-smoke">{hint}</p>}
        </div>
      </div>
      <div className="pl-9">{children}</div>
    </div>
  );
}
