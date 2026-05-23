import { Container } from "@/components/container";
import { ExploreCatalog } from "@/components/explore-catalog";
import { PageHeader } from "@/components/page-header";

export default function ExplorePage() {
  return (
    <Container className="pb-20">
      <PageHeader
        number="03"
        eyebrow="The Career Map"
        title="Every path on the"
        accent="map."
        description="Filter by salary, education, growth, and category. Every card opens a full profile with day-in-the-life details and a roadmap builder."
      />
      <div className="mt-12 md:mt-16">
        <ExploreCatalog />
      </div>
    </Container>
  );
}
