import { careers } from "./careers";
import type { Career, CareerMatch, DiscoverInput } from "./types";

const STOP_WORDS = new Set([
  "i",
  "me",
  "my",
  "the",
  "a",
  "an",
  "and",
  "or",
  "but",
  "is",
  "am",
  "are",
  "was",
  "be",
  "to",
  "of",
  "in",
  "on",
  "at",
  "for",
  "with",
  "like",
  "love",
  "enjoy",
  "really",
  "very",
  "kind",
  "sort",
  "bad",
  "good",
  "not",
  "dont",
  "don't",
  "people",
  "things",
  "something",
  "anything",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));
}

function overlapScore(tokens: string[], haystack: string[]): number {
  if (tokens.length === 0) return 0;
  const set = new Set(haystack.map((h) => h.toLowerCase()));
  let hits = 0;
  for (const token of tokens) {
    if (set.has(token)) hits += 1;
    else if ([...set].some((h) => h.includes(token) || token.includes(h))) hits += 0.5;
  }
  return hits / tokens.length;
}

function penalizeWeakness(career: Career, weaknessTokens: string[], weaknessesRaw: string): number {
  let penalty = 0;
  const weaknessesLower = weaknessesRaw.toLowerCase();
  const anxiousAroundPeople = /\banxious\b.*\bpeople\b|\bpeople\b.*\banxious\b|social\s*anxiety/.test(
    weaknessesLower
  );

  for (const token of weaknessTokens) {
    if (career.strengths.some((s) => s.includes(token))) penalty += 0.15;
    if (
      token.includes("math") &&
      ["ai-researcher", "data-scientist", "ml-engineer", "civil-engineer"].includes(career.id)
    ) {
      penalty += 0.4;
    }
    if (
      (token.includes("blood") || token.includes("squeamish")) &&
      ["registered-nurse", "physician-assistant", "psychiatrist-path"].includes(career.id)
    ) {
      penalty += 0.5;
    }
    if (
      token.includes("people") &&
      !anxiousAroundPeople &&
      career.avoids.some((a) => a.includes("people"))
    ) {
      penalty += 0.1;
    }
  }
  for (const avoid of career.avoids) {
    for (const token of weaknessTokens) {
      if (avoid.includes(token) || token.includes(avoid.replace("heavy ", ""))) {
        penalty += 0.35;
      }
    }
  }
  return penalty;
}

function buildReasons(
  career: Career,
  likeTokens: string[],
  strengthTokens: string[]
): string[] {
  const reasons: string[] = [];
  const interestHits = career.interests.filter((i) =>
    likeTokens.some((t) => i.includes(t) || t.includes(i.split(" ")[0] ?? ""))
  );
  const strengthHits = career.strengths.filter((s) =>
    strengthTokens.some((t) => s.includes(t) || t.includes(s))
  );

  if (interestHits.length > 0) {
    reasons.push(`Matches your interests in ${interestHits.slice(0, 2).join(" and ")}`);
  }
  if (strengthHits.length > 0) {
    reasons.push(`Uses strengths like ${strengthHits.slice(0, 2).join(" and ")}`);
  }
  if (career.growthOutlook === "much_faster" || career.growthOutlook === "faster") {
    reasons.push("Growing faster than average in the US job market");
  }
  if (reasons.length === 0) {
    reasons.push(career.tagline);
  }
  return reasons.slice(0, 3);
}

/** Keyword-based matcher, instant fallback when AI is unavailable. */
export function discoverCareersKeyword(input: DiscoverInput): CareerMatch[] {
  const likeTokens = tokenize(input.likes);
  const strengthTokens = tokenize(input.strengths);
  const weaknessTokens = tokenize(input.weaknesses);

  const scored = careers.map((career) => {
    const interestScore = overlapScore(likeTokens, career.interests) * 45;
    const strengthScore = overlapScore(strengthTokens, career.strengths) * 35;
    const taglineScore = overlapScore(likeTokens, [career.tagline, career.summary]) * 10;
    const penalty = penalizeWeakness(career, weaknessTokens, input.weaknesses) * 30;
    const score = Math.max(
      0,
      Math.min(100, interestScore + strengthScore + taglineScore - penalty + 10)
    );

    return {
      career,
      score: Math.round(score),
      reasons: buildReasons(career, likeTokens, strengthTokens),
    };
  });

  const ranked = scored
    .filter((m) => m.score >= 25)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);

  if (ranked.length > 0) return ranked;

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}
