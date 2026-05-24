"use server";

import { discoverCareersWithAI, type DiscoverResult } from "@/lib/discover-ai";
import type { DiscoverInput } from "@/lib/types";
import { discoverInputSchema } from "@/lib/validation";

export async function discoverAction(input: DiscoverInput): Promise<DiscoverResult> {
  const parsed = discoverInputSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid input");
  }
  return discoverCareersWithAI(parsed.data);
}
