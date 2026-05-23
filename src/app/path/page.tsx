import { Suspense } from "react";
import { Container } from "@/components/container";
import { PathForm } from "@/components/path-form";
import { PageHeader } from "@/components/page-header";

export default function PathPage() {
  return (
    <Container className="pb-20">
      <PageHeader
        number="02"
        eyebrow="Path to a Goal"
        title="Reverse-engineer your"
        accent="dream job."
        description="Type the role you're aiming for. We break it into phases — what to study, build, and do from now until your first hire."
      />
      <Suspense
        fallback={
          <div className="mt-12 border border-ink/10 bg-cream p-12 text-center text-smoke">
            Loading your path...
          </div>
        }
      >
        <div className="mt-12 md:mt-16">
          <PathForm />
        </div>
      </Suspense>
    </Container>
  );
}
