"use server";

import { buildCareerPathWithAI, type PathBuildResult } from "@/lib/path-ai";
import type { PathInput } from "@/lib/types";

export async function pathAction(input: PathInput): Promise<PathBuildResult> {
  return buildCareerPathWithAI(input);
}
