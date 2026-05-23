"use server";

import { discoverCareersWithAI, type DiscoverResult } from "@/lib/discover-ai";
import type { DiscoverInput } from "@/lib/types";

export async function discoverAction(input: DiscoverInput): Promise<DiscoverResult> {
  return discoverCareersWithAI(input);
}
