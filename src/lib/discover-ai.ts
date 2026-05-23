import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { careers, getCareerById } from "./careers";
import { discoverCareersKeyword } from "./matching";
import type { CareerMatch, DiscoverInput } from "./types";

const GRADE_LABELS: Record<string, string> = {
  "9": "9th grade (early high school)",
  "10": "10th grade",
  "11": "11th grade",
  "12": "12th grade (planning next steps soon)",
  college: "college or gap year",
};

const matchSchema = z.object({
  matches: z
    .array(
      z.object({
        careerId: z.string(),
        score: z.number().int().min(1).max(100),
        reasons: z.array(z.string().min(8).max(220)).min(1).max(3),
      })
    )
    .min(1)
    .max(6),
});

function buildCatalogForPrompt() {
  return careers.map((c) => ({
    id: c.id,
    title: c.title,
    category: c.category,
    tagline: c.tagline,
    summary: c.summary,
    interests: c.interests,
    strengths: c.strengths,
    avoids: c.avoids,
  }));
}

function buildPrompt(input: DiscoverInput) {
  const grade = input.gradeLevel ? GRADE_LABELS[input.gradeLevel] : null;

  return `You match US students (ages 15–22) to careers from a fixed catalog.

STUDENT PROFILE:
- Enjoys: ${input.likes.trim() || "(not provided)"}
- Strengths: ${input.strengths.trim() || "(not provided)"}
- Wants to avoid: ${input.weaknesses.trim() || "(not provided)"}
${grade ? `- Grade level: ${grade}` : ""}

RULES:
1. Pick ONLY careers from the catalog below — use exact "id" values. Never invent careers.
2. Return 4–6 matches, ordered by fit. Skip poor fits entirely.
3. If the student names something they want to avoid (e.g. heavy math, blood, public speaking), exclude or heavily down-rank conflicting careers.
4. Use semantic understanding — hobbies and vague phrases count (e.g. "crime documentaries" → forensic science, cybersecurity, investigative journalism).
5. "reasons" must be 1–3 short, specific sentences in second person ("You…"). Reference the student's own words when possible. Do NOT mention salary or growth statistics.
6. "score" is fit percentage (1–100). Top match should usually be 75–95; weaker fits 50–74.

CATALOG (pick careerId from "id" field only):
${JSON.stringify(buildCatalogForPrompt())}`;
}

export type DiscoverSource = "ai" | "keyword";

export type DiscoverResult = {
  matches: CareerMatch[];
  source: DiscoverSource;
};

export async function discoverCareersWithAI(input: DiscoverInput): Promise<DiscoverResult> {
  const fallback = (): DiscoverResult => ({
    matches: discoverCareersKeyword(input),
    source: "keyword",
  });

  if (!process.env.OPENAI_API_KEY?.trim()) {
    return fallback();
  }

  try {
    const { object } = await generateObject({
      model: openai("gpt-4o-mini"),
      schema: matchSchema,
      temperature: 0.35,
      prompt: buildPrompt(input),
    });

    const matches: CareerMatch[] = [];
    const seen = new Set<string>();

    for (const row of object.matches) {
      if (seen.has(row.careerId)) continue;
      const career = getCareerById(row.careerId);
      if (!career) continue;
      seen.add(row.careerId);
      matches.push({
        career,
        score: row.score,
        reasons: row.reasons.slice(0, 3),
      });
    }

    if (matches.length === 0) {
      return fallback();
    }

    return {
      matches: matches.sort((a, b) => b.score - a.score).slice(0, 6),
      source: "ai",
    };
  } catch {
    return fallback();
  }
}
