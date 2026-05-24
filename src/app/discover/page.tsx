import { Container } from "@/components/container";
import { DiscoverForm } from "@/components/discover-form";
import { PageHeader } from "@/components/page-header";

export default function DiscoverPage() {
  return (
    <Container className="pb-20">
      <PageHeader
        number="01"
        eyebrow="Discover Me · Step 1 of 1"
        title="Let's find careers that actually"
        accent="fit you."
        description="No wrong answers. The more honest you are about what you enjoy, and what you'd rather avoid, the better your matches will be."
      />
      <div className="mt-12 md:mt-16">
        <DiscoverForm />
      </div>
    </Container>
  );
}
