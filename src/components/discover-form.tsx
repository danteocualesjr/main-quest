"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { discoverAction } from "@/app/actions/discover";
import { CareerCard } from "@/components/career-card";
import { CoachPanel } from "@/components/coach-panel";
import { QuestButton } from "@/components/quest-button";
import { SectionLabel } from "@/components/section-label";
import { FormProgress } from "@/components/form-progress";
import { ScrollToFormBar } from "@/components/scroll-to-form-bar";
import { ShareResults } from "@/components/share-results";
import { SourceNote } from "@/components/source-note";
import { formatDiscoverExport } from "@/lib/export-results";
import { GRADE_OPTIONS } from "@/lib/grade-levels";
import { cn } from "@/lib/utils";
import { loadDiscoverSession, saveDiscoverSession } from "@/lib/session-storage";
import type { CareerMatch } from "@/lib/types";
import type { DiscoverSource } from "@/lib/discover-ai";

const tips = [
  "Mention subjects you actually enjoy, not just what you're good at.",
  "\u201cI hate math\u201d is a valid answer, it helps filter.",
  "Include hobbies (gaming, sports, art), they reveal career fits.",
  "Be specific. \u201cI like helping people\u201d → \u201cI like tutoring my friends.\u201d",
];

const likePrompts = ["drawing", "gaming", "tutoring friends", "making videos", "fixing things"];

export function DiscoverForm() {
  const hydrated = useRef(false);
  const requestId = useRef(0);
  const [likes, setLikes] = useState("");
  const [strengths, setStrengths] = useState("");
  const [weaknesses, setWeaknesses] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");
  const [results, setResults] = useState<CareerMatch[] | null>(null);
  const [source, setSource] = useState<DiscoverSource | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedProfile, setSubmittedProfile] = useState<{
    likes: string;
    strengths: string;
    weaknesses: string;
    gradeLevel: string;
  } | null>(null);

  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;

    const saved = loadDiscoverSession();
    if (!saved) return;

    setLikes(saved.likes);
    setStrengths(saved.strengths);
    setWeaknesses(saved.weaknesses);
    setGradeLevel(saved.gradeLevel);
    setResults(saved.results);
    setSource(saved.source);
    if (saved.results) {
      setSubmittedProfile({
        likes: saved.likes,
        strengths: saved.strengths,
        weaknesses: saved.weaknesses,
        gradeLevel: saved.gradeLevel,
      });
    }
  }, []);

  const profileSnapshot = useMemo(
    () => ({
      likes: likes.trim(),
      strengths: strengths.trim(),
      weaknesses: weaknesses.trim(),
      gradeLevel,
    }),
    [likes, strengths, weaknesses, gradeLevel]
  );

  const resultsAreStale =
    submittedProfile !== null &&
    (submittedProfile.likes !== profileSnapshot.likes ||
      submittedProfile.strengths !== profileSnapshot.strengths ||
      submittedProfile.weaknesses !== profileSnapshot.weaknesses ||
      submittedProfile.gradeLevel !== profileSnapshot.gradeLevel);
  const likesError = error === "Tell us what you enjoy before searching for matches." && !likes.trim();

  useEffect(() => {
    if (resultsAreStale) {
      setResults(null);
      setSource(null);
      setSubmittedProfile(null);
    }
  }, [resultsAreStale]);

  // Progress: how many fields have meaningful input (0-4).
  const progress = useMemo(() => {
    let n = 0;
    if (likes.trim().length > 2) n++;
    if (strengths.trim().length > 2) n++;
    if (weaknesses.trim().length > 2) n++;
    if (gradeLevel) n++;
    return n;
  }, [likes, strengths, weaknesses, gradeLevel]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!likes.trim()) {
      setError("Tell us what you enjoy before searching for matches.");
      return;
    }

    const id = ++requestId.current;
    setLoading(true);
    setError(null);

    try {
      const { matches, source: matchSource } = await discoverAction({
        likes: likes.trim(),
        strengths: strengths.trim(),
        weaknesses: weaknesses.trim(),
        gradeLevel,
      });
      if (id !== requestId.current) return;
      const profile = {
        likes: likes.trim(),
        strengths: strengths.trim(),
        weaknesses: weaknesses.trim(),
        gradeLevel,
      };
      setSubmittedProfile(profile);
      setResults(matches);
      setSource(matchSource);
      saveDiscoverSession({
        ...profile,
        results: matches,
        source: matchSource,
      });
      requestAnimationFrame(() => {
        document.getElementById("matches")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } catch {
      if (id !== requestId.current) return;
      setError("Something went wrong finding matches. Try again in a moment.");
    } finally {
      if (id === requestId.current) setLoading(false);
    }
  }

  return (
    <div className="space-y-20">
      <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr]">
        <div className="lg:hidden">
          <TipsCard compact />
        </div>

        <form id="page-form" onSubmit={handleSubmit} className="anchor-offset space-y-12">
          <FormProgress
            className="border-t border-ink/10 pt-6"
            total={4}
            filled={progress}
            label="Form completeness"
          />

          <Field
            n="i"
            label="What do you enjoy?"
            hint="Hobbies, subjects, activities, be specific."
            invalid={likesError}
          >
            <textarea
              className={cn(
                "input-bare min-h-[92px] resize-y font-display text-2xl font-light tracking-tight md:text-3xl",
                likesError && "rounded-xl border-tomato/60 bg-tomato/5 px-3 ring-2 ring-tomato/15"
              )}
              placeholder="I like drawing, helping people, and making videos..."
              value={likes}
              onChange={(e) => setLikes(e.target.value)}
              required
              disabled={loading}
              aria-invalid={likesError}
              aria-describedby={likesError ? "discover-error" : undefined}
            />
            {!likes && (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="label">Try:</span>
                {likePrompts.map((word) => (
                  <button
                    type="button"
                    key={word}
                    onClick={() => setLikes((v) => (v ? v : `I like ${word}`))}
                    className="filter-chip"
                  >
                    {word}
                  </button>
                ))}
              </div>
            )}
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
            hint="Be honest, this filters out poor fits."
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
            {error && (
              <p
                id="discover-error"
                className="inline-flex items-center gap-2 text-sm text-tomato animate-fade-in"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-tomato" />
                {error}
              </p>
            )}
          </div>
        </form>

        <aside className="hidden lg:block lg:pl-8 lg:pt-2">
          <TipsCard />
        </aside>
      </div>

      {loading && (
        <section className="border-t border-ink/10 pt-16" aria-busy>
          <SectionLabel variant="accent">Working…</SectionLabel>
          <h2 className="mt-6 font-display text-display-2 font-light tracking-tight text-ink">
            Reading <em className="italic text-tomato">between the lines.</em>
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-graphite">
            Cross-referencing your answers against the career catalog…
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {[0, 1, 2, 3].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </section>
      )}

      {results && !loading && (
        <section id="matches" className="anchor-offset border-t border-ink/10 pt-16 animate-fade-up">
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
          {source && results.length > 0 && <SourceNote flow="discover" source={source} />}
          {results.length > 0 && submittedProfile && (
            <ShareResults
              className="mt-8"
              label="Share your matches"
              shareTitle="Main Quest career matches"
              getText={() =>
                formatDiscoverExport(
                  results,
                  submittedProfile,
                  typeof window !== "undefined" ? window.location.origin : undefined
                )
              }
            />
          )}
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {results.map((match, i) => (
              <div
                key={match.career.id}
                className="animate-fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <CareerCard
                  career={match.career}
                  matchScore={match.score}
                  reasons={match.reasons}
                />
              </div>
            ))}
          </div>

          {source === "ai" && results.length > 0 && submittedProfile && (
            <CoachPanel
              context={{
                mode: "discover",
                profile: submittedProfile,
                matches: results,
              }}
            />
          )}
        </section>
      )}

      {results && !loading && (
        <ScrollToFormBar label="Edit your answers" />
      )}
    </div>
  );
}

function TipsCard({ compact = false }: { compact?: boolean }) {
  return (
    <div className="glass-panel sticky top-[calc(var(--header-height)+1.5rem)] p-6 lg:pl-8">
      <SectionLabel number="*" variant="accent">
        Tips for honest answers
      </SectionLabel>
      <ul className={compact ? "mt-6 grid gap-4 sm:grid-cols-2" : "mt-8 space-y-5"}>
        {tips.map((tip, i) => (
          <li
            key={tip}
            className="grid grid-cols-[auto_1fr] gap-3 text-[15px] leading-relaxed text-graphite"
          >
            <span className="font-mono text-xs tabular text-ash">0{i + 1}</span>
            <span>{tip}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 border-t border-ink/10 pt-5">
        <p className="label">Privacy</p>
        <p className="mt-3 text-sm leading-relaxed text-smoke">
          Answers stay in your browser on this device. When you submit, we process them
          to find matches and may use AI if enabled.
        </p>
      </div>
    </div>
  );
}

function Field({
  n,
  label,
  hint,
  children,
  invalid = false,
}: {
  n: string;
  label: string;
  hint?: string;
  children: React.ReactNode;
  invalid?: boolean;
}) {
  return (
    <div
      className={cn(
        "field-focus grid gap-4 rounded-3xl border bg-cream/55 p-5 shadow-paper backdrop-blur-sm",
        invalid ? "border-tomato/40" : "border-ink/10"
      )}
    >
      <div className="grid grid-cols-[auto_1fr] gap-3">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-tomato/20 bg-tomato/10 font-mono text-[10px] uppercase tabular tracking-widest text-tomato">
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

function SkeletonCard() {
  return (
    <div className="surface-card-soft p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="skeleton h-3 w-20 rounded" />
        <div className="skeleton h-8 w-12 rounded" />
      </div>
      <div className="skeleton mt-5 h-8 w-3/4 rounded" />
      <div className="skeleton mt-3 h-3 w-full rounded" />
      <div className="skeleton mt-2 h-3 w-2/3 rounded" />
      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-ink/10 pt-5">
        <div>
          <div className="skeleton h-2.5 w-12 rounded" />
          <div className="skeleton mt-2 h-5 w-24 rounded" />
        </div>
        <div>
          <div className="skeleton h-2.5 w-12 rounded" />
          <div className="skeleton mt-2 h-5 w-20 rounded" />
        </div>
      </div>
    </div>
  );
}
