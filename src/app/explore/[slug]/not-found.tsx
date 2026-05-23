import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/container";
import { SectionLabel } from "@/components/section-label";

export default function CareerNotFound() {
  return (
    <Container className="py-32" size="prose">
      <div className="text-center">
        <SectionLabel variant="accent" className="justify-center">
          404
        </SectionLabel>
        <h1 className="mt-6 font-display text-display-2 font-light tracking-tight text-ink">
          That quest is <em className="italic text-tomato">not on the map.</em>
        </h1>
        <p className="mt-6 text-lg text-graphite">
          That career path doesn&apos;t exist in our catalog yet. Try exploring the full map.
        </p>
        <Link
          href="/explore"
          className="mt-8 inline-flex items-center gap-2 text-base font-medium text-ink"
        >
          <span className="underline-link">Browse all careers</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Container>
  );
}
