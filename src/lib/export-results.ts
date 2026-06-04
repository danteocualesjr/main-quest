import { formatSalaryRange } from "@/lib/careers";
import { GRADE_LABELS } from "@/lib/grade-levels";
import { GROWTH_LABELS, type CareerMatch, type CareerPath } from "@/lib/types";

const SITE_NAME = "Main Quest";

function gradeLabel(gradeLevel?: string): string | null {
  if (!gradeLevel) return null;
  return GRADE_LABELS[gradeLevel] ?? gradeLevel;
}

function formatHeader(title: string, siteUrl?: string): string {
  const lines = [title, `From ${SITE_NAME}`];
  if (siteUrl) lines.push(siteUrl);
  return lines.join("\n");
}

export function formatPathExport(
  path: CareerPath,
  options?: { goal?: string; gradeLevel?: string; siteUrl?: string }
): string {
  const { goal, gradeLevel, siteUrl } = options ?? {};
  const parts: string[] = [
    formatHeader(`Roadmap: ${path.career.title}`, siteUrl),
    "",
  ];

  if (goal?.trim()) {
    parts.push(`Goal entered: ${goal.trim()}`);
  }
  const grade = gradeLabel(gradeLevel);
  if (grade) {
    parts.push(`Grade level: ${grade}`);
  }
  if (goal?.trim() || grade) parts.push("");

  parts.push(path.encouragement, "");
  parts.push(
    `Salary (US est.): ${formatSalaryRange(path.career)} · ${path.career.educationLabel} · ${GROWTH_LABELS[path.career.growthOutlook]}`
  );
  parts.push("");

  if (path.gaps.length > 0) {
    parts.push("Gaps to plan for:");
    for (const gap of path.gaps) {
      parts.push(`• ${gap}`);
    }
    parts.push("");
  }

  parts.push("Roadmap:");
  path.steps.forEach((step, index) => {
    parts.push("");
    parts.push(`${index + 1}. ${step.phase} — ${step.title}`);
    parts.push(step.description);
    for (const action of step.actions) {
      parts.push(`   → ${action}`);
    }
  });

  parts.push("");
  parts.push("—");
  parts.push(
    "Planning snapshot from Main Quest. Salary and outlook are US estimates, not guarantees."
  );

  return parts.join("\n");
}

export type DiscoverExportProfile = {
  likes: string;
  strengths: string;
  weaknesses: string;
  gradeLevel: string;
};

export function formatDiscoverExport(
  matches: CareerMatch[],
  profile: DiscoverExportProfile,
  siteUrl?: string
): string {
  const parts: string[] = [
    formatHeader("Career matches", siteUrl),
    "",
    "Your answers:",
    `• Enjoy: ${profile.likes}`,
    `• Strengths: ${profile.strengths}`,
  ];
  if (profile.weaknesses.trim()) {
    parts.push(`• Prefer to avoid: ${profile.weaknesses}`);
  }
  const grade = gradeLabel(profile.gradeLevel);
  if (grade) {
    parts.push(`• Grade: ${grade}`);
  }
  parts.push("");

  if (matches.length === 0) {
    parts.push("No strong matches yet — try adding more detail to your answers.");
    return parts.join("\n");
  }

  parts.push(`Top ${matches.length} matches:`);
  matches.forEach((match, index) => {
    parts.push("");
    parts.push(
      `${index + 1}. ${match.career.title} (${match.score}% fit) — ${formatSalaryRange(match.career)}`
    );
    parts.push(`   ${match.career.tagline}`);
    if (match.reasons.length > 0) {
      parts.push(`   Why: ${match.reasons.join("; ")}`);
    }
  });

  parts.push("");
  parts.push("—");
  parts.push(
    "Match snapshot from Main Quest. Explore full profiles and roadmaps at the site."
  );

  return parts.join("\n");
}
