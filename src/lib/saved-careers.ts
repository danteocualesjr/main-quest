const STORAGE_KEY = "main-quest:saved-careers";
export const SAVED_CAREERS_CHANGED_EVENT = "main-quest:saved-careers-changed";

function readSavedIds(): string[] {
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

function writeSavedIds(ids: string[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(new Set(ids))));
    window.dispatchEvent(new Event(SAVED_CAREERS_CHANGED_EVENT));
  } catch {
    // Ignore localStorage failures in private browsing or quota-limited contexts.
  }
}

export function loadSavedCareerIds(): string[] {
  return readSavedIds();
}

export function isCareerSaved(id: string): boolean {
  return readSavedIds().includes(id);
}

export function toggleSavedCareer(id: string): boolean {
  const ids = readSavedIds();
  const exists = ids.includes(id);
  writeSavedIds(exists ? ids.filter((savedId) => savedId !== id) : [id, ...ids]);
  return !exists;
}
