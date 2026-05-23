import { getCareerByTitle, getRelatedCareers } from "./careers";
import { careers } from "./careers";
import type { Career, CareerPath, PathStep } from "./types";

function highSchoolSteps(career: Career): PathStep {
  return {
    phase: "High school",
    title: "Build your foundation",
    description: `Focus on courses and activities that point toward ${career.title}.`,
    actions: [
      "Take relevant classes (ask your counselor which ones fit)",
      "Join a club, volunteer, or part-time job in a related area",
      "Start a small project you can show later (portfolio, blog, GitHub, art reel)",
      career.education === "doctorate" || career.education === "master"
        ? "Keep grades strong — competitive programs matter"
        : "Explore whether you prefer college, trade school, or self-taught paths",
    ],
  };
}

function educationStep(career: Career): PathStep {
  const actions: string[] = [career.educationLabel, `Typical timeline: ${career.timeToEntry}`];

  if (career.category === "Trades") {
    actions.push("Apply for apprenticeship programs in your state");
    actions.push("Get OSHA or trade-specific safety certifications");
  } else if (career.education === "certificate") {
    actions.push("Research accredited certificate or bootcamp programs");
    actions.push("Compare cost, job placement stats, and alumni outcomes");
  } else if (career.education === "bachelor") {
    actions.push("Research colleges with strong programs in this field");
    actions.push("Apply for scholarships and financial aid (FAFSA)");
  } else if (career.education === "master" || career.education === "doctorate") {
    actions.push("Plan undergrad major prerequisites early");
    actions.push("Seek research, clinical, or internship hours during college");
  }

  return {
    phase: "Education & training",
    title: "Get qualified",
    description: `Most ${career.title} roles require: ${career.educationLabel}.`,
    actions,
  };
}

function skillsStep(career: Career): PathStep {
  return {
    phase: "Skills",
    title: "Build proof you can do the work",
    description: "Employers and schools look for skills — not just grades.",
    actions: career.skillsToBuild.map((s) => `Practice: ${s}`),
  };
}

function entryStep(career: Career): PathStep {
  const related = getRelatedCareers(career)
    .slice(0, 2)
    .map((r) => r.title);

  const actions = [
    "Apply for internships, apprenticeships, or entry-level roles",
    "Build a portfolio, resume, or demo reel showcasing real work",
    "Network: informational interviews on LinkedIn or with alumni",
    "Use Main Quest's career library to compare salary and growth expectations",
  ];

  if (related.length > 0) {
    actions.push(`Related stepping-stone roles: ${related.join(", ")}`);
  }

  return {
    phase: "Break in",
    title: "Land your first role",
    description: `Target entry-level ${career.title} positions or adjacent roles.`,
    actions,
  };
}

function inferGaps(career: Career, query: string): string[] {
  const gaps: string[] = [];
  const q = query.toLowerCase();

  if (career.id === "ai-researcher" || career.id === "ml-engineer") {
    gaps.push("Strong math foundation (calculus, linear algebra, statistics)");
    gaps.push("Programming in Python and ML frameworks");
    if (!q.includes("phd") && !q.includes("master")) {
      gaps.push("Research experience — labs, papers, or open-source ML projects");
    }
  }

  if (career.education === "doctorate" && !q.includes("school")) {
    gaps.push(`Plan for ${career.timeToEntry} of education after high school`);
  }

  if (career.category === "Healthcare") {
    gaps.push("Clinical or volunteer hours strengthen applications");
  }

  if (career.category === "Creative") {
    gaps.push("Portfolio quality matters more than school name alone");
  }

  if (gaps.length === 0) {
    gaps.push(`Build skills: ${career.skillsToBuild.slice(0, 3).join(", ")}`);
  }

  return gaps.slice(0, 4);
}

export function buildCareerPath(goalQuery: string): CareerPath | null {
  const career = getCareerByTitle(goalQuery);
  if (!career) return null;

  const steps: PathStep[] = [
    highSchoolSteps(career),
    educationStep(career),
    skillsStep(career),
    entryStep(career),
  ];

  return {
    career,
    steps,
    gaps: inferGaps(career, goalQuery),
    encouragement: `Becoming a ${career.title} is a marathon, not a sprint. Break it into quests — one semester, one skill, one project at a time.`,
  };
}

export function suggestCareersForGoal(query: string): Career[] {
  const direct = getCareerByTitle(query);
  if (direct) return [direct];

  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  return careers
    .map((career) => {
      const haystack = [
        career.title,
        ...career.aliases,
        ...career.interests,
        career.category,
      ]
        .join(" ")
        .toLowerCase();
      const score = tokens.filter((t) => haystack.includes(t)).length;
      return { career, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map((x) => x.career);
}

export function getAllCareerTitles(): string[] {
  return careers.flatMap((c) => [c.title, ...c.aliases]);
}
