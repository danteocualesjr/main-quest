import { Container } from "@/components/container";

export function SiteFooter() {
  return (
    <footer className="border-t border-quest-border bg-quest-surface">
      <Container className="py-10 text-center text-sm text-quest-muted">
        <p className="mx-auto max-w-xl leading-relaxed">
          Salary ranges are US estimates for planning — not guarantees. Based on
          BLS/O*NET-style occupational data.
        </p>
        <p className="mt-4 font-semibold text-quest-ink/60">
          Main Quest · Built for students choosing their next step
        </p>
      </Container>
    </footer>
  );
}
