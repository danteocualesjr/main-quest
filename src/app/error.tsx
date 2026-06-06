"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight, RotateCcw } from "lucide-react";
import { Container } from "@/components/container";
import { SectionLabel } from "@/components/section-label";
import { QuestButton } from "@/components/quest-button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="page-wash py-28 md:py-36" size="prose">
      <div className="text-center">
        <SectionLabel variant="accent" className="justify-center">
          Something broke
        </SectionLabel>
        <h1 className="mt-6 text-balance font-display text-display-2 font-light tracking-tight text-ink">
          That step hit an{" "}
          <em className="italic text-tomato">unexpected detour.</em>
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-graphite">
          A part of the page failed to load. Your saved answers are kept in this
          browser, so trying again usually picks up right where you were.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <QuestButton onClick={() => reset()} size="lg" className="group/retry">
            <RotateCcw className="h-4 w-4 transition group-hover/retry:-rotate-45" />
            Try again
          </QuestButton>
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm font-medium text-ink"
          >
            <span className="underline-link">Back to home</span>
            <ArrowRight className="h-4 w-4 text-tomato transition group-hover:translate-x-0.5" />
          </Link>
        </div>

        {error.digest && (
          <p className="mt-10 inline-flex rounded-full border border-ink/10 bg-cream/80 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ash">
            Ref · {error.digest}
          </p>
        )}
      </div>
    </Container>
  );
}
