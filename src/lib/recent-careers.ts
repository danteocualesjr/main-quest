const STORAGE_KEY = "main-quest:recent-careers";
export const RECENT_CAREERS_CHANGED_EVENT = "main-quest:recent-careers-changed";

function readRecentIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string") : [];
  } catch {
    return [];
  }
}

export function loadRecentCareerIds(): string[] {
  return readRecentIds();
}

export function rememberRecentCareer(id: string): void {
  if (typeof window === "undefined") return;
  const next = [id, ...readRecentIds().filter((recentId) => recentId !== id)].slice(0, 5);
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(RECENT_CAREERS_CHANGED_EVENT));
  } catch {
    // Ignore localStorage failures in private browsing or quota-limited contexts.
  }
}
