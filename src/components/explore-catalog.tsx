"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpDown, Search, SlidersHorizontal, X } from "lucide-react";
import { CareerCard } from "@/components/career-card";
import { SectionLabel } from "@/components/section-label";
import { exploreCareers, getCareerStats, type SortBy } from "@/lib/explore";
import { CATEGORIES, EDUCATION_LABELS, GROWTH_LABELS } from "@/lib/types";
import type { EducationLevel, GrowthOutlook } from "@/lib/types";
import { cn } from "@/lib/utils";

const SORT_LABELS: Record<SortBy, string> = {
  recommended: "Recommended",
  salary_desc: "Salary · high to low",
  salary_asc: "Salary · low to high",
  growth: "Fastest growing",
  alpha: "A → Z",
};

const SALARY_PRESETS = [
  { value: "50000", label: "$50k+" },
  { value: "70000", label: "$70k+" },
  { value: "90000", label: "$90k+" },
  { value: "110000", label: "$110k+" },
];

export function ExploreCatalog() {
  const searchRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [education, setEducation] = useState("");
  const [growth, setGrowth] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("recommended");

  const stats = getCareerStats();

  const results = useMemo(
    () =>
      exploreCareers(
        {
          query: query || undefined,
          category: category || undefined,
          minSalary: minSalary ? Number(minSalary) : undefined,
          education: (education as EducationLevel) || undefined,
          growth: (growth as GrowthOutlook) || undefined,
        },
        sortBy
      ),
    [query, category, minSalary, education, growth, sortBy]
  );

  const activeFilters: { key: string; label: string; clear: () => void }[] = [];
  if (query) activeFilters.push({ key: "q", label: `"${query}"`, clear: () => setQuery("") });
  if (category) activeFilters.push({ key: "cat", label: category, clear: () => setCategory("") });
  if (minSalary) {
    const preset = SALARY_PRESETS.find((p) => p.value === minSalary);
    activeFilters.push({
      key: "sal",
      label: preset ? preset.label : `$${minSalary}+`,
      clear: () => setMinSalary(""),
    });
  }
  if (education)
    activeFilters.push({
      key: "edu",
      label: EDUCATION_LABELS[education as EducationLevel],
      clear: () => setEducation(""),
    });
  if (growth)
    activeFilters.push({
      key: "grw",
      label: GROWTH_LABELS[growth as GrowthOutlook],
      clear: () => setGrowth(""),
    });

  const hasFilters = activeFilters.length > 0;

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.isContentEditable
      ) {
        return;
      }
      e.preventDefault();
      searchRef.current?.focus();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

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
      <dl className="grid grid-cols-3 divide-x divide-ink/10 rounded-2xl border border-ink/10 bg-cream/60">
        <Stat n={stats.totalCareers.toString()} label="Career paths" />
        <Stat n={`$${(stats.avgMedianSalary / 1000).toFixed(0)}k`} label="Avg. median salary" />
        <Stat n={stats.fastestGrowing.toString()} label="Fast-growing roles" />
      </dl>

      {/* Filters */}
      <div className="sticky top-[68px] z-30 -mx-6 rounded-b-2xl border-y border-ink/10 bg-paper/90 px-6 py-5 shadow-paper backdrop-blur-md sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
        <div className="flex items-center justify-between gap-4">
          <SectionLabel>
            <span className="inline-flex items-center gap-2">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filter the map
            </span>
          </SectionLabel>
          <div className="relative inline-flex items-center gap-2">
            <ArrowUpDown className="h-3.5 w-3.5 text-smoke" />
            <label htmlFor="sort" className="sr-only">
              Sort results
            </label>
            <select
              id="sort"
              className="appearance-none border-0 bg-transparent pr-4 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-ink focus:outline-none"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortBy)}
            >
              {(Object.entries(SORT_LABELS) as [SortBy, string][]).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-smoke" />
            <input
              ref={searchRef}
              className="w-full rounded-2xl border border-ink/15 bg-cream py-3.5 pl-12 pr-12 font-display text-lg font-light tracking-tight shadow-paper placeholder:text-ash transition focus:border-tomato focus:outline-none focus:ring-2 focus:ring-tomato/20 md:text-xl"
              placeholder="Search careers, fields, or aliases…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search careers"
              aria-keyshortcuts="/"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-smoke transition hover:text-tomato"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            {!query && (
              <kbd className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 rounded border border-ink/15 bg-paper px-1.5 py-0.5 font-mono text-[10px] text-smoke sm:inline-block">
                /
              </kbd>
            )}
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <select
              className="input-block text-sm"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              aria-label="Filter by category"
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
              aria-label="Filter by minimum median salary"
            >
              <option value="">Any salary</option>
              {SALARY_PRESETS.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label} median
                </option>
              ))}
            </select>
            <select
              className="input-block text-sm"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              aria-label="Filter by education"
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
              aria-label="Filter by growth outlook"
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

      {/* Active filter chips */}
      {hasFilters && (
        <div className="-mt-6 flex flex-wrap items-center gap-2 animate-fade-in">
          <span className="label">Active</span>
          {activeFilters.map((f) => (
            <button
              key={f.key}
              onClick={f.clear}
              className="filter-chip filter-chip-active"
              aria-label={`Remove filter ${f.label}`}
            >
              {f.label}
              <X className="h-3 w-3" />
            </button>
          ))}
          <button
            onClick={clearAll}
            className="label ml-1 inline-flex items-center gap-1.5 transition hover:text-tomato"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Result count */}
      <div className="flex items-end justify-between border-y border-ink/10 py-5">
        <p className="label">
          Showing{" "}
          <span className="text-ink tabular">
            {String(results.length).padStart(2, "0")}
          </span>{" "}
          {results.length === 1 ? "career" : "careers"}
          {hasFilters && <span className="ml-2 text-ash">· filtered</span>}
        </p>
        <p className="label hidden sm:block">
          Sorted by{" "}
          <span className="text-ink">{SORT_LABELS[sortBy].toLowerCase()}</span>
        </p>
      </div>

      {results.length === 0 ? (
        <div className="grid gap-6 border border-ink/10 bg-cream p-16 text-center md:grid-cols-[1fr]">
          <div>
            <p className="font-display text-3xl font-light text-ink">
              No careers match those filters.
            </p>
            <p className="mt-3 text-smoke">
              Try removing a constraint or widening your salary range.
            </p>
            <button
              onClick={clearAll}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 text-sm font-medium text-ink transition hover:border-tomato hover:text-tomato"
            >
              <X className="h-3.5 w-3.5" />
              Clear all filters
            </button>
          </div>
        </div>
      ) : (
        <ul
          className={cn(
            "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
            "[&>li]:list-none"
          )}
        >
          {results.map((career, i) => (
            <li
              key={career.id}
              className="animate-fade-up"
              style={{ animationDelay: `${Math.min(i, 8) * 35}ms` }}
            >
              <CareerCard career={career} />
            </li>
          ))}
        </ul>
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
