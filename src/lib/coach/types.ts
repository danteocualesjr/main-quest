import type { UIMessage } from "ai";
import type { DiscoverInput } from "../types";

/**
 * Minimal match shape the coach actually needs.
 *
 * The /discover client has full `CareerMatch` objects, but the system prompt
 * only references `id` and `title`, and tools always re-resolve full Career
 * records from the catalog by id. Keeping this lean means we don't serialize
 * the entire catalog row over the wire on every chat turn, and the Zod schema
 * on the route stays easy to keep in sync.
 */
export interface CoachMatch {
  career: { id: string; title: string };
  score: number;
  reasons: string[];
}

/**
 * Context passed from the client to the coach API on every request.
 * Lives in the request body, not the message history — keeps system prompt
 * fresh as the student's profile evolves without bloating the transcript.
 */
export interface CoachContext {
  /** Student's free-text profile from /discover. */
  profile: DiscoverInput;
  /** Top matches the student is currently looking at (typically 3–6). */
  matches: CoachMatch[];
}

/** UIMessage with no custom data parts — we render text and tool calls only. */
export type CoachMessage = UIMessage;
