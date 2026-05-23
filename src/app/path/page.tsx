import { Suspense } from "react";
import { PathForm } from "@/components/path-form";
import { PageHeader } from "@/components/page-header";

export default function PathPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Step 2"
        title="Path to a Goal"
        description="Already know what you want? Reverse-engineer the steps — what to study, skills to build, and how to break into the field."
      />
      <Suspense
        fallback={
          <div className="quest-panel text-center text-quest-muted">Loading your path...</div>
        }
      >
        <PathForm />
      </Suspense>
    </div>
  );
}
