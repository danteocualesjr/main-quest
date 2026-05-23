import careersData from "@/data/careers.json";
import type { Career } from "./types";

export const careers: Career[] = careersData as Career[];

export function getCareerById(id: string): Career | undefined {
  return careers.find((c) => c.id === id);
}

export function getCareerByTitle(query: string): Career | undefined {
  const normalized = query.trim().toLowerCase();
  return careers.find(
    (c) =>
      c.title.toLowerCase() === normalized ||
      c.aliases.some((a) => a.toLowerCase() === normalized) ||
      c.title.toLowerCase().includes(normalized) ||
      c.aliases.some((a) => normalized.includes(a.toLowerCase()))
  );
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
  return `${formatSalary(career.salaryMin)} – ${formatSalary(career.salaryMax)}`;
}
