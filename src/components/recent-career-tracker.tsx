"use client";

import { useEffect } from "react";
import { rememberRecentCareer } from "@/lib/recent-careers";

export function RecentCareerTracker({ careerId }: { careerId: string }) {
  useEffect(() => {
    rememberRecentCareer(careerId);
  }, [careerId]);

  return null;
}
