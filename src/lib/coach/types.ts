import type { UIMessage } from "ai";
import type { CareerMatch, DiscoverInput } from "../types";

/**
 * Context passed from the client to the coach API on every request.
 * Lives in the request body, not the message history — keeps system prompt
 * fresh as the student's profile evolves without bloating the transcript.
 */
export interface CoachContext {
  /** Student's free-text profile from /discover. */
  profile: DiscoverInput;
  /** Top matches the student is currently looking at (typically 3–6). */
  matches: CareerMatch[];
}

/** UIMessage with no custom data parts — we render text and tool calls only. */
export type CoachMessage = UIMessage;
