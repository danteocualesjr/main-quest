import careersData from "@/data/careers.json";
import type { Career } from "./types";

export const careers: Career[] = careersData as Career[];

export function getCareerById(id: string): Career | undefined {
  return careers.find((c) => c.id === id);
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function hasWordBoundary(text: string, word: string): boolean {
  if (!word) return false;
  return new RegExp(`\\b${escapeRegExp(word)}\\b`, "i").test(text);
}

/** Resolve a free-text goal to a catalog career without false substring matches. */
export function getCareerByTitle(query: string): Career | undefined {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return undefined;

  for (const career of careers) {
    if (career.title.toLowerCase() === normalized) return career;
    if (career.aliases.some((alias) => alias.toLowerCase() === normalized)) return career;
  }

  if (normalized.length >= 4) {
    const phraseMatches = careers.filter(
      (career) =>
        career.title.toLowerCase().includes(normalized) ||
        career.aliases.some((alias) => alias.toLowerCase().includes(normalized))
    );

    if (phraseMatches.length === 1) return phraseMatches[0];

    if (phraseMatches.length > 1) {
      phraseMatches.sort((a, b) => {
        const aExact = hasWordBoundary(a.title, normalized) ? 0 : 1;
        const bExact = hasWordBoundary(b.title, normalized) ? 0 : 1;
        return aExact - bExact || a.title.length - b.title.length;
      });
      return phraseMatches[0];
    }
  }

  const tokens = normalized.split(/\s+/).filter((token) => token.length >= 3);
  if (tokens.length === 0) return undefined;

  let best: { career: Career; score: number } | undefined;

  for (const career of careers) {
    let score = 0;
    const titleLower = career.title.toLowerCase();

    for (const token of tokens) {
      if (hasWordBoundary(titleLower, token)) score += 15;
      if (career.aliases.some((alias) => alias.toLowerCase() === token)) score += 20;
      if (career.aliases.some((alias) => hasWordBoundary(alias, token))) score += 10;
    }

    if (tokens.every((token) => hasWordBoundary(titleLower, token))) {
      score += 25;
    }

    if (score > 0 && (!best || score > best.score)) {
      best = { career, score };
    }
  }

  return best && best.score >= 15 ? best.career : undefined;
}

export function getRelatedCareers(career: Career): Career[] {
  return career.relatedIds
    .map((id) => getCareerById(id))
    .filter((c): c is Career => Boolean(c));
}

export function formatSalary(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatSalaryRange(career: Career): string {
  return `${formatSalary(career.salaryMin)} - ${formatSalary(career.salaryMax)}`;
}
