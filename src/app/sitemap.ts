import type { MetadataRoute } from "next";
import { careers } from "@/lib/careers";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://main-quest.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["", "/discover", "/path", "/explore"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const careerRoutes = careers.map((career) => ({
    url: `${siteUrl}/explore/${career.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  return [...staticRoutes, ...careerRoutes];
}
