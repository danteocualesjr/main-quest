import { convertToModelMessages, stepCountIs, streamText, type UIMessage } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { buildCoachSystemPrompt } from "@/lib/coach/system-prompt";
import { buildCoachTools } from "@/lib/coach/tools";
import type { CoachContext } from "@/lib/coach/types";

export const runtime = "nodejs";
export const maxDuration = 30;

const contextSchema = z.object({
  profile: z.object({
    likes: z.string(),
    strengths: z.string(),
    weaknesses: z.string(),
    gradeLevel: z.string().optional(),
  }),
  matches: z
    .array(
      z.object({
        career: z.object({ id: z.string(), title: z.string() }).passthrough(),
        score: z.number(),
        reasons: z.array(z.string()),
      })
    )
    .max(8),
});

const bodySchema = z.object({
  messages: z.array(z.any()),
  context: contextSchema,
});

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY?.trim()) {
    return new Response(
      JSON.stringify({
        error: "coach_unavailable",
        message: "OPENAI_API_KEY is not configured on the server.",
      }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  let parsed: z.infer<typeof bodySchema>;
  try {
    parsed = bodySchema.parse(await req.json());
  } catch {
    return new Response(
      JSON.stringify({ error: "bad_request", message: "Invalid request body." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const { messages, context } = parsed as {
    messages: UIMessage[];
    context: CoachContext;
  };

  const result = streamText({
    model: openai("gpt-4o-mini"),
    temperature: 0.4,
    system: buildCoachSystemPrompt(context),
    tools: buildCoachTools(),
    stopWhen: stepCountIs(5),
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
