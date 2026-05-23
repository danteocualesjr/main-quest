import { Suspense } from "react";
import { Container } from "@/components/container";
import { PathForm } from "@/components/path-form";
import { PageHeader } from "@/components/page-header";

export default function PathPage() {
  return (
    <Container className="space-y-10 py-10 md:py-14">
      <PageHeader
        eyebrow="Path to a Goal"
        title="Reverse-engineer your dream job"
        description="Type the role you're aiming for. We'll break it into phases — what to study, build, and do from now until your first hire."
      />
      <Suspense
        fallback={
          <div className="quest-panel text-center text-quest-muted">Loading your path...</div>
        }
      >
        <PathForm />
      </Suspense>
    </Container>
  );
}
