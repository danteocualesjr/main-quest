"use client";

import { useMemo, useState } from "react";
import { Filter } from "lucide-react";
import { CareerCard } from "@/components/career-card";
import { exploreCareers, getCareerStats } from "@/lib/explore";
import { CATEGORIES, EDUCATION_LABELS, GROWTH_LABELS } from "@/lib/types";
import type { EducationLevel, GrowthOutlook } from "@/lib/types";

export function ExploreCatalog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [education, setEducation] = useState("");
  const [growth, setGrowth] = useState("");

  const stats = getCareerStats();

  const results = useMemo(
    () =>
      exploreCareers({
        query: query || undefined,
        category: category || undefined,
        minSalary: minSalary ? Number(minSalary) : undefined,
        education: (education as EducationLevel) || undefined,
        growth: (growth as GrowthOutlook) || undefined,
      }),
    [query, category, minSalary, education, growth]
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="quest-panel text-center">
          <p className="font-display text-3xl font-semibold text-quest-coral">{stats.totalCareers}</p>
          <p className="mt-1 text-sm text-quest-muted">Career paths</p>
        </div>
        <div className="quest-panel text-center">
          <p className="font-display text-3xl font-semibold text-quest-mint">
            ${(stats.avgMedianSalary / 1000).toFixed(0)}k
          </p>
          <p className="mt-1 text-sm text-quest-muted">Avg. median salary</p>
        </div>
        <div className="quest-panel text-center">
          <p className="font-display text-3xl font-semibold text-quest-lavender">{stats.fastestGrowing}</p>
          <p className="mt-1 text-sm text-quest-muted">Fast-growing roles</p>
        </div>
      </div>

      <div className="quest-panel space-y-4">
        <div className="flex items-center gap-2 text-quest-ink">
          <Filter className="h-4 w-4 text-quest-muted" />
          <span className="text-sm font-semibold">Filter the career map</span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <input
            className="quest-input"
            placeholder="Search careers..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select
            className="quest-input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            className="quest-input"
            value={minSalary}
            onChange={(e) => setMinSalary(e.target.value)}
          >
            <option value="">Any salary</option>
            <option value="50000">$50k+ median</option>
            <option value="70000">$70k+ median</option>
            <option value="90000">$90k+ median</option>
            <option value="110000">$110k+ median</option>
          </select>
          <select
            className="quest-input"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
          >
            <option value="">Any education</option>
            {(Object.entries(EDUCATION_LABELS) as [EducationLevel, string][]).map(
              ([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              )
            )}
          </select>
          <select
            className="quest-input"
            value={growth}
            onChange={(e) => setGrowth(e.target.value)}
          >
            <option value="">Any growth outlook</option>
            {(Object.entries(GROWTH_LABELS) as [GrowthOutlook, string][]).map(
              ([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              )
            )}
          </select>
        </div>
      </div>

      <p className="text-sm font-medium text-quest-muted">
        Showing {results.length} career{results.length !== 1 ? "s" : ""}
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {results.map((career) => (
          <CareerCard key={career.id} career={career} />
        ))}
      </div>

      {results.length === 0 && (
        <div className="quest-panel text-center text-quest-muted">
          No careers match those filters. Try widening your search.
        </div>
      )}
    </div>
  );
}
