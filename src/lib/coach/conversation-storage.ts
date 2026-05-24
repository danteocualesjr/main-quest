import type { CoachContext, CoachMessage } from "./types";
import type { DiscoverInput } from "../types";

const PREFIX = "main-quest:coach:";
const MAX_MESSAGES = 40;

/**
 * localStorage adapter for coach conversations.
 *
 * Designed so a future server-backed implementation is a drop-in swap:
 * - All access is async (Promise-returning) even though localStorage is sync.
 * - Keys are namespaced and derived from a stable hash of the active context,
 *   so re-running discover or path with different inputs starts a fresh conversation.
 * - Storage is best-effort: quota errors and SSR are swallowed silently.
 */

/** djb2 — small, stable, fine for non-cryptographic keying. */
function hashString(raw: string): string {
  let hash = 5381;
  for (let i = 0; i < raw.length; i++) {
    hash = (hash * 33) ^ raw.charCodeAt(i);
  }
  return (hash >>> 0).toString(36);
}

function hashDiscoverInput(input: DiscoverInput): string {
  const raw = [
    input.likes.trim().toLowerCase(),
    input.strengths.trim().toLowerCase(),
    input.weaknesses.trim().toLowerCase(),
    input.gradeLevel ?? "",
  ].join("|");

  return hashString(raw);
}

export function coachStorageKey(context: CoachContext): string {
  if (context.mode === "discover") {
    return `discover:${hashDiscoverInput(context.profile)}`;
  }

  const raw = [
    context.goal.trim().toLowerCase(),
    context.gradeLevel ?? "",
    context.path.career.id,
  ].join("|");

  return `path:${hashString(raw)}`;
}

export async function loadCoachConversation(key: string): Promise<CoachMessage[]> {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(`${PREFIX}${key}`);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CoachMessage[];
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

export async function saveCoachConversation(
  key: string,
  messages: CoachMessage[]
): Promise<void> {
  if (typeof window === "undefined") return;
  try {
    const trimmed = messages.slice(-MAX_MESSAGES);
    window.localStorage.setItem(`${PREFIX}${key}`, JSON.stringify(trimmed));
  } catch {
    // Quota exceeded or private browsing — ignore.
  }
}

export async function clearCoachConversation(key: string): Promise<void> {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(`${PREFIX}${key}`);
  } catch {
    // ignore
  }
}
