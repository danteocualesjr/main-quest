import { careers } from "./careers";
import type { Career, ExploreFilters, GrowthOutlook } from "./types";

const GROWTH_ORDER: Record<GrowthOutlook, number> = {
  much_faster: 4,
  faster: 3,
  average: 2,
  slower: 1,
};

export type SortBy = "recommended" | "salary_desc" | "salary_asc" | "growth" | "alpha";

export function exploreCareers(
  filters: ExploreFilters = {},
  sortBy: SortBy = "recommended"
): Career[] {
  let results = [...careers];

  if (filters.query) {
    const q = filters.query.toLowerCase();
    results = results.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.tagline.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.summary.toLowerCase().includes(q) ||
        c.aliases.some((a) => a.toLowerCase().includes(q))
    );
  }

  if (filters.category) {
    results = results.filter((c) => c.category === filters.category);
  }

  if (filters.minSalary != null) {
    results = results.filter((c) => c.salaryMedian >= filters.minSalary!);
  }

  if (filters.education) {
    results = results.filter((c) => c.education === filters.education);
  }

  if (filters.growth) {
    results = results.filter((c) => c.growthOutlook === filters.growth);
  }

  return results.sort((a, b) => {
    switch (sortBy) {
      case "salary_desc":
        return b.salaryMedian - a.salaryMedian;
      case "salary_asc":
        return a.salaryMedian - b.salaryMedian;
      case "growth":
        return (
          GROWTH_ORDER[b.growthOutlook] - GROWTH_ORDER[a.growthOutlook] ||
          b.growthPercent - a.growthPercent
        );
      case "alpha":
        return a.title.localeCompare(b.title);
      case "recommended":
      default: {
        const growthDiff = GROWTH_ORDER[b.growthOutlook] - GROWTH_ORDER[a.growthOutlook];
        if (growthDiff !== 0) return growthDiff;
        return b.salaryMedian - a.salaryMedian;
      }
    }
  });
}

export function getCareerStats() {
  const medians = careers.map((c) => c.salaryMedian);
  return {
    totalCareers: careers.length,
    avgMedianSalary: Math.round(medians.reduce((a, b) => a + b, 0) / medians.length),
    fastestGrowing: careers.filter(
      (c) => c.growthOutlook === "much_faster" || c.growthOutlook === "faster"
    ).length,
  };
}
