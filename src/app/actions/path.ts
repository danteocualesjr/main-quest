"use server";

import { buildCareerPathWithAI, type PathBuildResult } from "@/lib/path-ai";

export async function pathAction(goal: string): Promise<PathBuildResult> {
  return buildCareerPathWithAI(goal);
}
