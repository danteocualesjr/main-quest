const PREFIX = "main-quest:";

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
    // Quota exceeded or private browsing, ignore
  }
}

export type StoredDiscoverSession = {
  likes: string;
  strengths: string;
  weaknesses: string;
  gradeLevel: string;
  results: import("./types").CareerMatch[] | null;
  source: import("./discover-ai").DiscoverSource | null;
};

export type StoredPathSession = {
  goal: string;
  gradeLevel: string;
  path: import("./types").CareerPath | null;
  suggestions: import("./types").Career[];
  source: import("./path-ai").PathSource | null;
};

export function loadDiscoverSession(): StoredDiscoverSession | null {
  return readJson<StoredDiscoverSession>("discover");
}

export function saveDiscoverSession(session: StoredDiscoverSession): void {
  writeJson("discover", session);
}

export function loadPathSession(): StoredPathSession | null {
  return readJson<StoredPathSession>("path");
}

export function savePathSession(session: StoredPathSession): void {
  writeJson("path", session);
}
