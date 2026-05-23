import { Container } from "@/components/container";
import { ExploreCatalog } from "@/components/explore-catalog";
import { PageHeader } from "@/components/page-header";

export default function ExplorePage() {
  return (
    <Container className="space-y-10 py-10 md:py-14">
      <PageHeader
        eyebrow="Career map"
        title="Explore every path on the map"
        description="Filter by salary, education, growth, and category. Every card opens a full profile with day-in-the-life details."
      />
      <ExploreCatalog />
    </Container>
  );
}
