import type { Metadata } from "next";
import { Container } from "@/components/container";
import { DiscoverForm } from "@/components/discover-form";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Discover Me",
  description:
    "Share what you enjoy, what you're good at, and what you'd rather avoid — get matched to careers that actually fit you.",
};

export default function DiscoverPage() {
  return (
    <Container className="pb-28">
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
