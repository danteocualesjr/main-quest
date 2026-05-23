import { Container } from "@/components/container";
import { DiscoverForm } from "@/components/discover-form";
import { PageHeader } from "@/components/page-header";

export default function DiscoverPage() {
  return (
    <Container className="space-y-10 py-10 md:py-14">
      <PageHeader
        eyebrow="Discover Me"
        title="Let's find careers that actually fit you"
        description="No wrong answers. The more honest you are about what you enjoy — and what you'd rather avoid — the better your matches."
      />
      <DiscoverForm />
    </Container>
  );
}
