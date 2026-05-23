"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { CareerCard } from "@/components/career-card";
import { SectionLabel } from "@/components/section-label";
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

  const hasFilters = !!(query || category || minSalary || education || growth);

  function clearAll() {
    setQuery("");
    setCategory("");
    setMinSalary("");
    setEducation("");
    setGrowth("");
  }

  return (
    <div className="space-y-12">
      {/* Stats strip */}
      <dl className="grid grid-cols-3 divide-x divide-ink/10 border-y border-ink/10">
        <Stat n={stats.totalCareers.toString()} label="Career paths" />
        <Stat n={`$${(stats.avgMedianSalary / 1000).toFixed(0)}k`} label="Avg. median salary" />
        <Stat n={stats.fastestGrowing.toString()} label="Fast-growing roles" />
      </dl>

      {/* Filters */}
      <div>
        <SectionLabel>Filter the map</SectionLabel>
        <div className="mt-5 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-smoke" />
            <input
              className="w-full border border-ink/15 bg-cream py-4 pl-12 pr-4 font-display text-xl font-light tracking-tight placeholder:text-ash focus:border-tomato focus:outline-none focus:ring-1 focus:ring-tomato/30 md:text-2xl"
              placeholder="Search careers..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-smoke transition hover:text-tomato"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <select
              className="input-block text-sm"
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
              className="input-block text-sm"
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
              className="input-block text-sm"
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
              className="input-block text-sm"
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
      </div>

      {/* Result count */}
      <div className="flex items-end justify-between border-y border-ink/10 py-5">
        <p className="label">
          Showing{" "}
          <span className="text-ink tabular">
            {String(results.length).padStart(2, "0")}
          </span>{" "}
          {results.length === 1 ? "career" : "careers"}
        </p>
        {hasFilters && (
          <button
            onClick={clearAll}
            className="label inline-flex items-center gap-1.5 transition hover:text-tomato"
          >
            <X className="h-3.5 w-3.5" />
            Clear filters
          </button>
        )}
      </div>

      {results.length === 0 ? (
        <div className="border border-ink/10 bg-cream p-16 text-center">
          <p className="font-display text-2xl font-light text-ink">No careers match those filters.</p>
          <p className="mt-2 text-smoke">Try widening your search or clearing filters.</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((career) => (
            <CareerCard key={career.id} career={career} />
          ))}
        </div>
      )}
    </div>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="px-4 py-6 first:pl-0 md:px-8">
      <p className="font-display text-3xl font-light tabular text-ink md:text-5xl">{n}</p>
      <p className="label mt-2">{label}</p>
    </div>
  );
}
