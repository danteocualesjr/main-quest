"use server";

import { buildCareerPathWithAI, type PathBuildResult } from "@/lib/path-ai";
import type { PathInput } from "@/lib/types";
import { pathInputSchema } from "@/lib/validation";

export async function pathAction(input: PathInput): Promise<PathBuildResult> {
  const parsed = pathInputSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid input");
  }
  return buildCareerPathWithAI(parsed.data);
}
