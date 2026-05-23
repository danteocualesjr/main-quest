import { ExploreCatalog } from "@/components/explore-catalog";
import { PageHeader } from "@/components/page-header";

export default function ExplorePage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Career map"
        title="Explore Careers"
        description="Browse salaries, growth outlook, education requirements, and day-in-the-life snapshots for US roles."
      />
      <ExploreCatalog />
    </div>
  );
}
