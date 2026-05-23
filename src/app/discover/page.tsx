import { DiscoverForm } from "@/components/discover-form";
import { PageHeader } from "@/components/page-header";

export default function DiscoverPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Step 1"
        title="Discover Me"
        description="Tell us what you like, what you're good at, and what you'd rather avoid. We'll match you to careers you might not have considered."
      />
      <DiscoverForm />
    </div>
  );
}
