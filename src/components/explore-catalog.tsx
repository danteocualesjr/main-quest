"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowUpDown, Compass, Search, SlidersHorizontal, X } from "lucide-react";
import { CareerCard } from "@/components/career-card";
import { CountUp } from "@/components/count-up";
import { RecentCareers } from "@/components/recent-careers";
import { SavedCareers } from "@/components/saved-careers";
import { CareerCompareTray } from "@/components/career-compare-tray";
import { SurpriseMeButton } from "@/components/surprise-me-button";
import { SectionLabel } from "@/components/section-label";
import { careers, formatSalary } from "@/lib/careers";
import { exploreCareers, getCareerStats, type SortBy } from "@/lib/explore";
import { loadRecentCareerIds, RECENT_CAREERS_CHANGED_EVENT } from "@/lib/recent-careers";
import { loadSavedCareerIds, SAVED_CAREERS_CHANGED_EVENT } from "@/lib/saved-careers";
import { CATEGORIES, EDUCATION_LABELS, GROWTH_LABELS } from "@/lib/types";
import type { Career, EducationLevel, GrowthOutlook } from "@/lib/types";
import { cn } from "@/lib/utils";

const SORT_LABELS: Record<SortBy, string> = {
  recommended: "Recommended",
  salary_desc: "Salary · high to low",
  salary_asc: "Salary · low to high",
  growth: "Fastest growing",
  alpha: "A → Z",
};
const SORT_VALUES = Object.keys(SORT_LABELS) as SortBy[];
const EDUCATION_VALUES = Object.keys(EDUCATION_LABELS) as EducationLevel[];
const GROWTH_VALUES = Object.keys(GROWTH_LABELS) as GrowthOutlook[];

const SALARY_PRESETS = [
  { value: "50000", label: "$50k+" },
  { value: "70000", label: "$70k+" },
  { value: "90000", label: "$90k+" },
  { value: "110000", label: "$110k+" },
];

const QUICK_FILTERS = [
  { key: "salary", label: "$90k+ median", kind: "salary", value: "90000" },
  { key: "growth", label: "Fastest growth", kind: "growth", value: "much_faster" },
  { key: "healthcare", label: "Healthcare", kind: "category", value: "Healthcare" },
  { key: "certificate", label: "Certificate paths", kind: "education", value: "certificate" },
] as const;

const SORT_KEYS = new Set(Object.keys(SORT_LABELS));

export function ExploreCatalog() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchRef = useRef<HTMLInputElement>(null);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [recentIds, setRecentIds] = useState<string[]>([]);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  const [category, setCategory] = useState(() => {
    const value = searchParams.get("category") ?? "";
    return CATEGORIES.includes(value as (typeof CATEGORIES)[number]) ? value : "";
  });
  const [minSalary, setMinSalary] = useState(() => {
    const value = searchParams.get("salary") ?? "";
    return SALARY_PRESETS.some((preset) => preset.value === value) ? value : "";
  });
  const [education, setEducation] = useState(() => {
    const value = searchParams.get("education") ?? "";
    return EDUCATION_VALUES.includes(value as EducationLevel) ? value : "";
  });
  const [growth, setGrowth] = useState(() => {
    const value = searchParams.get("growth") ?? "";
    return GROWTH_VALUES.includes(value as GrowthOutlook) ? value : "";
  });
  const [sortBy, setSortBy] = useState<SortBy>(() => {
    const value = searchParams.get("sort") as SortBy | null;
    return value && SORT_VALUES.includes(value) ? value : "recommended";
  });

  const stats = getCareerStats();
  const categoryCounts = useMemo(
    () =>
      CATEGORIES.map((name) => ({
        name,
        count: careers.filter((career) => career.category === name).length,
      })),
    []
  );
  const savedCareers = useMemo(
    () =>
      savedIds
        .map((id) => careers.find((career) => career.id === id))
        .filter((career): career is (typeof careers)[number] => Boolean(career)),
    [savedIds]
  );
  const recentCareers = useMemo(
    () =>
      recentIds
        .map((id) => careers.find((career) => career.id === id))
        .filter((career): career is (typeof careers)[number] => Boolean(career)),
    [recentIds]
  );

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
  const compareCareers = compareIds
    .map((id) => careers.find((career) => career.id === id))
    .filter((career): career is Career => Boolean(career));

  useEffect(() => {
    const nextQuery = searchParams.get("q") ?? "";
    const nextCategory = searchParams.get("category") ?? "";
    const nextSalary = searchParams.get("salary") ?? "";
    const nextEducation = searchParams.get("education") ?? "";
    const nextGrowth = searchParams.get("growth") ?? "";
    const nextSort = searchParams.get("sort") as SortBy | null;

    setQuery(nextQuery);
    setCategory(CATEGORIES.includes(nextCategory as (typeof CATEGORIES)[number]) ? nextCategory : "");
    setMinSalary(SALARY_PRESETS.some((preset) => preset.value === nextSalary) ? nextSalary : "");
    setEducation(EDUCATION_VALUES.includes(nextEducation as EducationLevel) ? nextEducation : "");
    setGrowth(GROWTH_VALUES.includes(nextGrowth as GrowthOutlook) ? nextGrowth : "");
    setSortBy(nextSort && SORT_VALUES.includes(nextSort) ? nextSort : "recommended");
  }, [searchParams]);

  useEffect(() => {
    const refresh = () => setSavedIds(loadSavedCareerIds());
    refresh();
    window.addEventListener(SAVED_CAREERS_CHANGED_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(SAVED_CAREERS_CHANGED_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  useEffect(() => {
    const refresh = () => setRecentIds(loadRecentCareerIds());
    refresh();
    window.addEventListener(RECENT_CAREERS_CHANGED_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(RECENT_CAREERS_CHANGED_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const updates: Record<string, string> = {
      q: query.trim(),
      category,
      salary: minSalary,
      education,
      growth,
      sort: sortBy === "recommended" ? "" : sortBy,
    };

    Object.entries(updates).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });

    const next = params.toString();
    const current = searchParams.toString();
    if (next !== current) {
      router.replace(`${pathname}${next ? `?${next}` : ""}`, { scroll: false });
    }
  }, [category, education, growth, minSalary, pathname, query, router, searchParams, sortBy]);

  useEffect(() => {
    if (urlHydrated.current) return;
    urlHydrated.current = true;

    setQuery(searchParams.get("q") ?? "");
    setCategory(searchParams.get("cat") ?? "");
    setMinSalary(searchParams.get("sal") ?? "");
    setEducation(searchParams.get("edu") ?? "");
    setGrowth(searchParams.get("grw") ?? "");
    const sort = searchParams.get("sort");
    if (sort && SORT_KEYS.has(sort)) {
      setSortBy(sort as SortBy);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!urlHydrated.current) return;

    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (category) params.set("cat", category);
    if (minSalary) params.set("sal", minSalary);
    if (education) params.set("edu", education);
    if (growth) params.set("grw", growth);
    if (sortBy !== "recommended") params.set("sort", sortBy);

    const next = params.toString();
    const current = searchParams.toString();
    if (next === current) return;

    router.replace(next ? `/explore?${next}` : "/explore", { scroll: false });
  }, [query, category, minSalary, education, growth, sortBy, router, searchParams]);

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

  function applyQuickFilter(filter: (typeof QUICK_FILTERS)[number], reset = false) {
    const active =
      (filter.kind === "salary" && minSalary === filter.value) ||
      (filter.kind === "growth" && growth === filter.value) ||
      (filter.kind === "category" && category === filter.value) ||
      (filter.kind === "education" && education === filter.value);

    if (reset) clearAll();

    if (filter.kind === "salary") {
      setMinSalary(active && !reset ? "" : filter.value);
    } else if (filter.kind === "growth") {
      setGrowth(active && !reset ? "" : filter.value);
    } else if (filter.kind === "category") {
      setCategory(active && !reset ? "" : filter.value);
    } else {
      setEducation(active && !reset ? "" : filter.value);
    }
  }

  function toggleCompare(id: string) {
    setCompareIds((current) => {
      if (current.includes(id)) return current.filter((careerId) => careerId !== id);
      return [id, ...current].slice(0, 3);
    });
  }

  return (
    <div className="space-y-12">
      <SavedCareers />
      <RecentCareers />

      {/* Stats strip */}
      <dl className="grid gap-3 sm:grid-cols-3">
        <Stat n={<CountUp value={stats.totalCareers} />} label="Career paths" />
        <Stat
          n={<CountUp value={Math.round(stats.avgMedianSalary / 1000)} prefix="$" suffix="k" />}
          label="Avg. median salary"
        />
        <Stat n={<CountUp value={stats.fastestGrowing} />} label="Fast-growing roles" />
      </dl>

      <div className="surface-card-soft p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="label-accent">Browse by field</p>
            <p className="mt-1 text-sm text-smoke">
              Tap a category to narrow the map instantly.
            </p>
          </div>
          {category && (
            <button
              type="button"
              onClick={() => setCategory("")}
              className="self-start text-sm font-medium text-ink transition hover:text-tomato sm:self-auto"
            >
              Clear category
            </button>
          )}
        </div>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {categoryCounts.map(({ name, count }) => {
            const active = category === name;
            return (
              <button
                key={name}
                type="button"
                onClick={() => setCategory(active ? "" : name)}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition",
                  active
                    ? "border-tomato bg-tomato text-cream shadow-soft"
                    : "border-ink/12 bg-paper text-ink hover:border-tomato/40 hover:text-tomato"
                )}
                aria-pressed={active}
              >
                {name}
                <span
                  className={cn(
                    "ml-2 font-mono text-[10px] tabular",
                    active ? "text-cream/70" : "text-ash"
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {savedCareers.length > 0 && (
        <section className="surface-card p-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="label-accent">Saved shortlist</p>
              <h2 className="mt-2 font-display text-2xl font-light text-ink">
                Your bookmarked careers
              </h2>
            </div>
            <p className="label">
              {savedCareers.length} saved {savedCareers.length === 1 ? "role" : "roles"}
            </p>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {savedCareers.slice(0, 3).map((career) => (
              <CareerCard key={career.id} career={career} compact />
            ))}
          </div>
        </section>
      )}

      {recentCareers.length > 0 && (
        <section className="surface-card-soft p-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="label-accent">Recently viewed</p>
              <h2 className="mt-2 font-display text-2xl font-light text-ink">
                Pick back up quickly
              </h2>
            </div>
            <p className="label">Last {recentCareers.length}</p>
          </div>
          <div className="mt-5 flex gap-3 overflow-x-auto pb-1">
            {recentCareers.map((career) => (
              <div key={career.id} className="w-[280px] shrink-0">
                <CareerCard career={career} compact />
              </div>
            ))}
          </div>
        </section>
      )}

      {compareCareers.length > 0 && (
        <section className="surface-card p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="label-accent">Compare careers</p>
              <h2 className="mt-2 font-display text-2xl font-light text-ink">
                Side-by-side snapshot
              </h2>
              <p className="mt-2 text-sm text-smoke">
                Select up to three careers from the results below.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setCompareIds([])}
              className="self-start text-sm font-medium text-ink transition hover:text-tomato"
            >
              Clear compare
            </button>
          </div>
          <div className="mt-5 grid gap-3 lg:grid-cols-3">
            {compareCareers.map((career) => (
              <div key={career.id} className="rounded-2xl border border-ink/10 bg-cream p-4">
                <p className="label">{career.category}</p>
                <h3 className="mt-2 font-display text-xl font-light text-ink">
                  {career.title}
                </h3>
                <dl className="mt-4 grid gap-2 text-sm">
                  <CompareRow label="Median pay" value={formatSalary(career.salaryMedian)} />
                  <CompareRow label="Education" value={EDUCATION_LABELS[career.education]} />
                  <CompareRow label="Time" value={career.timeToEntry} />
                  <CompareRow
                    label="Growth"
                    value={`${GROWTH_LABELS[career.growthOutlook].replace(
                      " than average",
                      ""
                    )} · +${career.growthPercent}%`}
                  />
                </dl>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Filters */}
      <div className="sticky top-[var(--header-height)] z-30 -mx-6 border-y border-ink/10 bg-paper/90 px-6 py-5 shadow-soft backdrop-blur-md sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
        <div className="flex items-center justify-between gap-4">
          <SectionLabel>
            <span className="inline-flex items-center gap-2">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filter the map
            </span>
          </SectionLabel>
          <div className="flex items-center gap-3">
            <SurpriseMeButton />
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
        </div>

        <div className="mt-5 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-smoke" />
            <input
              ref={searchRef}
              className="w-full rounded-2xl border border-ink/15 bg-cream py-3.5 pl-12 pr-12 font-display text-lg font-light tracking-tight shadow-paper placeholder:text-ash transition hover:border-ink/25 focus:border-tomato focus:outline-none focus:ring-2 focus:ring-tomato/20 md:text-xl"
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
                className="absolute right-4 top-1/2 -translate-y-1/2 text-smoke transition hover:text-tomato active:scale-90"
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
              className="input-block text-sm transition hover:border-ink/25"
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
          <div className="flex flex-wrap items-center gap-2">
            <span className="label">Quick picks</span>
            {QUICK_FILTERS.map((filter) => {
              const active =
                (filter.kind === "salary" && minSalary === filter.value) ||
                (filter.kind === "growth" && growth === filter.value) ||
                (filter.kind === "category" && category === filter.value) ||
                (filter.kind === "education" && education === filter.value);

              return (
                <button
                  key={filter.key}
                  type="button"
                  className={cn("filter-chip", active && "filter-chip-active")}
                  onClick={() => applyQuickFilter(filter)}
                  aria-pressed={active}
                >
                  {filter.label}
                </button>
              );
            })}
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
      <div
        className="flex flex-col gap-3 border-y border-ink/10 py-6 sm:flex-row sm:items-end sm:justify-between"
        aria-live="polite"
        aria-atomic="true"
      >
        <div>
          <p className="label">
            Showing{" "}
            <span className="text-ink tabular">
              {String(results.length).padStart(2, "0")}
            </span>{" "}
            {results.length === 1 ? "career" : "careers"}
            {hasFilters && <span className="ml-2 text-ash">· filtered</span>}
          </p>
          <p className="sr-only">
            {results.length} {results.length === 1 ? "career matches" : "careers match"} the
            current Explore filters.
          </p>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-smoke">
            Cards now surface pay, education, time-to-entry, and outlook so you can
            compare paths without opening every profile.
          </p>
        </div>
        <p className="label hidden sm:block">
          Sorted by{" "}
          <span className="text-ink">{SORT_LABELS[sortBy].toLowerCase()}</span>
        </p>
      </div>

      {results.length === 0 ? (
        <div className="surface-card-soft grid animate-fade-up gap-6 p-10 text-center md:p-16">
          <div>
            <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-ink/10 bg-paper text-tomato">
              <Compass className="h-6 w-6" />
            </span>
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
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <span className="label">Try instead</span>
              {QUICK_FILTERS.map((filter) => (
                <button
                  key={filter.key}
                  type="button"
                  onClick={() => applyQuickFilter(filter, true)}
                  className="filter-chip"
                >
                  {filter.label}
                </button>
              ))}
            </div>
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
              <button
                type="button"
                onClick={() => toggleCompare(career.id)}
                className={cn(
                  "mt-2 w-full rounded-2xl border px-4 py-2 text-sm font-medium transition",
                  compareIds.includes(career.id)
                    ? "border-tomato bg-tomato text-cream"
                    : "border-ink/10 bg-cream text-ink hover:border-tomato/40 hover:text-tomato"
                )}
                aria-pressed={compareIds.includes(career.id)}
              >
                {compareIds.includes(career.id) ? "Remove from compare" : "Add to compare"}
              </button>
            </li>
          ))}
        </ul>
      )}
      <CareerCompareTray />
    </div>
  );
}

function Stat({ n, label }: { n: React.ReactNode; label: string }) {
  return (
    <div className="glass-panel px-5 py-6">
      <dd className="font-display text-3xl font-light tabular text-ink md:text-5xl">
        {n}
      </dd>
      <dt className="label mt-2">{label}</dt>
    </div>
  );
}

function CompareRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-t border-ink/10 pt-2 first:border-0 first:pt-0">
      <dt className="text-smoke">{label}</dt>
      <dd className="text-right font-medium text-ink">{value}</dd>
    </div>
  );
}
