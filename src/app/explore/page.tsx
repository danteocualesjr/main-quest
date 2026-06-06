import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/container";
import { ExploreCatalog } from "@/components/explore-catalog";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Explore Careers",
  description:
    "Browse 30+ curated US careers. Filter by salary, education, and growth, then open a full profile with day-in-the-life details.",
};

export default function ExplorePage() {
  return (
    <Container className="pb-28">
      <PageHeader
        number="03"
        eyebrow="The Career Map"
        title="Every path on the"
        accent="map."
        description="Filter by salary, education, growth, and category. Every card opens a full profile with day-in-the-life details and a roadmap builder."
        meta="Compare pay, education, time-to-entry, and projected growth"
        highlights={[
          { label: "Browse", value: "30+ roles" },
          { label: "Filter by", value: "4 signals" },
          { label: "Open", value: "Full profiles" },
        ]}
      />
      <Suspense
        fallback={
          <div className="mt-12 rounded-2xl border border-ink/10 bg-cream p-12 md:p-16">
            <div className="skeleton h-3 w-24 rounded" />
            <div className="skeleton mt-6 h-12 w-3/4 rounded" />
            <div className="mt-10 grid gap-3">
              <div className="skeleton h-3 w-full rounded" />
              <div className="skeleton h-3 w-5/6 rounded" />
            </div>
          </div>
        }
      >
        <div className="mt-12 md:mt-16">
          <ExploreCatalog />
        </div>
      </Suspense>
    </Container>
  );
}
