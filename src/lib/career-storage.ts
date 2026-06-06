const PREFIX = "main-quest:";
const MAX_RECENT = 6;

function readJson<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(`${PREFIX}${key}`);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function writeJson<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(`${PREFIX}${key}`, JSON.stringify(value));
  } catch {
    // Quota exceeded or private browsing
  }
}

/** Record a career profile view (most recent first, deduped). */
export function recordRecentCareer(careerId: string): void {
  const current = readJson<string[]>("recent-careers") ?? [];
  const next = [careerId, ...current.filter((id) => id !== careerId)].slice(
    0,
    MAX_RECENT
  );
  writeJson("recent-careers", next);
}

export function getRecentCareerIds(): string[] {
  return readJson<string[]>("recent-careers") ?? [];
}

const MAX_SAVED = 12;

export function getSavedCareerIds(): string[] {
  return readJson<string[]>("saved-careers") ?? [];
}

export function isCareerSaved(careerId: string): boolean {
  return getSavedCareerIds().includes(careerId);
}

export function toggleSavedCareer(careerId: string): boolean {
  const current = getSavedCareerIds();
  const exists = current.includes(careerId);
  const next = exists
    ? current.filter((id) => id !== careerId)
    : [careerId, ...current].slice(0, MAX_SAVED);
  writeJson("saved-careers", next);
  return !exists;
}
