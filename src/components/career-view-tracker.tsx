"use client";

import { useEffect } from "react";
import { recordRecentCareer } from "@/lib/career-storage";

type CareerViewTrackerProps = {
  careerId: string;
};

/** Silently records a career profile view in localStorage. */
export function CareerViewTracker({ careerId }: CareerViewTrackerProps) {
  useEffect(() => {
    recordRecentCareer(careerId);
  }, [careerId]);

  return null;
}
