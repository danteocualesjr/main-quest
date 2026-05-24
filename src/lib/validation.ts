import { z } from "zod";

export const discoverInputSchema = z.object({
  likes: z.string().trim().min(1, "Tell us what you enjoy").max(2000),
  strengths: z.string().max(2000).default(""),
  weaknesses: z.string().max(2000).default(""),
  gradeLevel: z.string().max(50).optional(),
});

export const pathInputSchema = z.object({
  goal: z.string().trim().min(1, "Enter a career goal").max(500),
  gradeLevel: z.string().max(50).optional(),
});
