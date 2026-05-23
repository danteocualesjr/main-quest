import { tool } from "ai";
import { z } from "zod";
import { careers, getCareerById, formatSalaryRange } from "../careers";
import { discoverCareersKeyword } from "../matching";
import { buildCareerPath } from "../path-builder";
import { GROWTH_LABELS, type Career } from "../types";

/**
 * Coach tool surface.
 *
 * Each tool wraps a deterministic lib function — no nested AI calls — so the
 * model can navigate the catalog cheaply and we never bill twice for the same
 * conversation step. Outputs are model-friendly: lean shapes, no internal IDs
 * that aren't useful for follow-up calls.
 */

function summarizeCareer(career: Career) {
  return {
    id: career.id,
    title: career.title,
    category: career.category,
    tagline: career.tagline,
    summary: career.summary,
    education: career.educationLabel,
    timeToEntry: career.timeToEntry,
    salaryRange: formatSalaryRange(career),
    salaryMedian: career.salaryMedian,
    growth: GROWTH_LABELS[career.growthOutlook],
    growthPercent: career.growthPercent,
    interests: career.interests,
    strengths: career.strengths,
    skillsToBuild: career.skillsToBuild,
  };
}

const validCareerIds = new Set(careers.map((c) => c.id));

export function buildCoachTools() {
  return {
    search_careers: tool({
      description:
        "Find careers from the catalog that match free-text criteria. Use when the " +
        "student wants different options, wants to explore a new direction mid-chat, " +
        "or refines their interests. Returns up to 6 ranked matches.",
      inputSchema: z.object({
        interests: z
          .string()
          .describe("What the student enjoys, in their own words. Required.")
          .min(2),
        strengths: z
          .string()
          .optional()
          .describe("Skills or talents the student says they have."),
        avoids: z
          .string()
          .optional()
          .describe("What the student wants to avoid (e.g. 'heavy math', 'blood')."),
        gradeLevel: z
          .enum(["9", "10", "11", "12", "college"])
          .optional()
          .describe("Optional grade level — does not change ranking but is logged."),
      }),
      execute: async ({ interests, strengths = "", avoids = "", gradeLevel }) => {
        const matches = discoverCareersKeyword({
          likes: interests,
          strengths,
          weaknesses: avoids,
          gradeLevel,
        });

        if (matches.length === 0) {
          return { matches: [], note: "No careers in the catalog matched." };
        }

        return {
          matches: matches.map((m) => ({
            ...summarizeCareer(m.career),
            score: m.score,
            reasons: m.reasons,
          })),
        };
      },
    }),

    get_career: tool({
      description:
        "Get full details for a specific career — day in the life, skills, education, " +
        "salary, growth. Use when the student asks for depth on one of the listed careers.",
      inputSchema: z.object({
        id: z
          .string()
          .describe(
            "Career id from the catalog. Must be an id returned by search_careers " +
              "or one of the matches in context — never invent ids."
          ),
      }),
      execute: async ({ id }) => {
        if (!validCareerIds.has(id)) {
          return {
            error: "unknown_career_id",
            message: `No career with id '${id}'. Use search_careers to find valid ids.`,
          };
        }
        const career = getCareerById(id)!;
        return {
          ...summarizeCareer(career),
          dayInLife: career.dayInLife,
          avoids: career.avoids,
          aliases: career.aliases,
        };
      },
    }),

    build_roadmap: tool({
      description:
        "Build a step-by-step roadmap for becoming a specific career. Use when the " +
        "student asks 'how do I become X' or 'what would I need to do to be Y'. " +
        "Returns four phases: High school, Education & training, Skills, Break in.",
      inputSchema: z.object({
        careerId: z
          .string()
          .describe("Career id from the catalog. Must be a valid id, not invented."),
        gradeLevel: z
          .enum(["9", "10", "11", "12", "college"])
          .optional()
          .describe("Optional — current grade level tailors timeline language."),
      }),
      execute: async ({ careerId }) => {
        if (!validCareerIds.has(careerId)) {
          return {
            error: "unknown_career_id",
            message: `No career with id '${careerId}'. Use search_careers to find valid ids.`,
          };
        }
        const career = getCareerById(careerId)!;
        const path = buildCareerPath(career.title);
        if (!path) {
          return {
            error: "no_roadmap",
            message: `Couldn't build a roadmap for '${career.title}'.`,
          };
        }
        return {
          career: { id: career.id, title: career.title },
          encouragement: path.encouragement,
          gaps: path.gaps,
          steps: path.steps,
        };
      },
    }),

    compare_careers: tool({
      description:
        "Compare 2–4 specific careers side by side on salary, growth, education, and " +
        "skills. Use when the student is choosing between options.",
      inputSchema: z.object({
        ids: z
          .array(z.string())
          .min(2)
          .max(4)
          .describe("Between 2 and 4 career ids from the catalog. No invented ids."),
      }),
      execute: async ({ ids }) => {
        const unknown = ids.filter((id) => !validCareerIds.has(id));
        if (unknown.length > 0) {
          return {
            error: "unknown_career_ids",
            message: `Unknown career ids: ${unknown.join(", ")}. Use search_careers first.`,
          };
        }
        return {
          careers: ids.map((id) => summarizeCareer(getCareerById(id)!)),
        };
      },
    }),
  };
}

export type CoachTools = ReturnType<typeof buildCoachTools>;
