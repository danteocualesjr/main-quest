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
          <div className="mt-12 border border-ink/10 bg-cream p-12 md:p-16">
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
          <PathForm />
        </div>
      </Suspense>
    </Container>
  );
}
