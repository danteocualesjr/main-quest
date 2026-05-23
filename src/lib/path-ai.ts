import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { careers, getCareerById } from "./careers";
import { buildCareerPath, suggestCareersForGoal } from "./path-builder";
import type { Career, CareerPath, PathStep } from "./types";

const PATH_PHASES = [
  "High school",
  "Education & training",
  "Skills",
  "Break in",
] as const;

const pathStepSchema = z.object({
  phase: z.enum(PATH_PHASES),
  title: z.string().min(4).max(80),
  description: z.string().min(20).max(320),
  actions: z.array(z.string().min(8).max(220)).min(2).max(6),
});

const pathSchema = z.object({
  careerId: z.string().nullable(),
  suggestedCareerIds: z.array(z.string()).max(5),
  encouragement: z.string().min(20).max(400).optional(),
  gaps: z.array(z.string().min(10).max(220)).min(1).max(5).optional(),
  steps: z.array(pathStepSchema).length(4).optional(),
});

function buildCatalogForPrompt() {
  return careers.map((c) => ({
    id: c.id,
    title: c.title,
    aliases: c.aliases,
    category: c.category,
    tagline: c.tagline,
    summary: c.summary,
    educationLabel: c.educationLabel,
    timeToEntry: c.timeToEntry,
    skillsToBuild: c.skillsToBuild,
  }));
}

function buildPrompt(goal: string) {
  return `You build personalized career roadmaps for US students (ages 15–22) from a fixed catalog.

STUDENT GOAL:
"${goal.trim()}"

RULES:
1. If the goal clearly maps to ONE catalog career, set careerId to that career's exact "id" and fill encouragement, gaps, and steps.
2. If the goal is vague or could mean several careers (e.g. "something in tech", "help people"), set careerId to null and list 3–5 suggestedCareerIds ordered by relevance.
3. If the goal doesn't match any catalog career, set careerId to null and return the closest suggestedCareerIds (at least 1 if any are reasonable).
4. Never invent careers — only use "id" values from the catalog.
5. Use semantic understanding (e.g. "work with robots" → robotics-adjacent roles, "make TikToks for a living" → content creator).
6. steps must use exactly these four phases in order: "High school", "Education & training", "Skills", "Break in".
7. actions must be concrete, actionable, and specific to the career — not generic platitudes.
8. gaps highlight honest hurdles (math requirements, long schooling, portfolio needs, certifications) tailored to the student's goal wording when possible.
9. encouragement is 1–2 warm sentences in second person. Do NOT mention salary or growth statistics.
10. Respect catalog facts for education and timeline — do not contradict educationLabel or timeToEntry.

CATALOG:
${JSON.stringify(buildCatalogForPrompt())}`;
}

export type PathSource = "ai" | "template" | "keyword";

export type PathBuildResult =
  | { kind: "path"; path: CareerPath; source: PathSource }
  | { kind: "suggestions"; suggestions: Career[]; source: PathSource };

function templateFallback(goal: string): PathBuildResult {
  const built = buildCareerPath(goal);
  if (built) {
    return { kind: "path", path: built, source: "template" };
  }
  return {
    kind: "suggestions",
    suggestions: suggestCareersForGoal(goal),
    source: "keyword",
  };
}

function toCareerPath(
  career: Career,
  steps: PathStep[],
  gaps: string[],
  encouragement: string
): CareerPath {
  return {
    career,
    steps,
    gaps: gaps.slice(0, 5),
    encouragement,
  };
}

export async function buildCareerPathWithAI(goal: string): Promise<PathBuildResult> {
  const trimmed = goal.trim();
  if (!trimmed) {
    return { kind: "suggestions", suggestions: [], source: "keyword" };
  }

  const fallback = () => templateFallback(trimmed);

  if (!process.env.OPENAI_API_KEY?.trim()) {
    return fallback();
  }

  try {
    const { object } = await generateObject({
      model: openai("gpt-4o-mini"),
      schema: pathSchema,
      temperature: 0.35,
      prompt: buildPrompt(trimmed),
    });

    if (object.careerId && object.steps && object.encouragement && object.gaps?.length) {
      const career = getCareerById(object.careerId);
      if (career) {
        return {
          kind: "path",
          path: toCareerPath(career, object.steps, object.gaps, object.encouragement),
          source: "ai",
        };
      }
    }

    const suggestions = object.suggestedCareerIds
      .map((id) => getCareerById(id))
      .filter((c): c is Career => Boolean(c));

    if (suggestions.length > 0) {
      return { kind: "suggestions", suggestions, source: "ai" };
    }

    return fallback();
  } catch {
    return fallback();
  }
}
