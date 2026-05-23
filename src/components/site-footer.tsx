import Link from "next/link";
import { Container } from "@/components/container";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-ink/10 bg-cream">
      <Container className="grid gap-12 py-16 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-cream">
              <span className="font-display text-lg font-semibold leading-none">M</span>
            </span>
            <span className="font-display text-lg font-semibold text-ink">Main Quest</span>
          </div>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-smoke">
            An honest career guide built for US students. No SAT prep ads. No
            life-coach pitches. Just real options, real numbers, real next steps.
          </p>
        </div>

        <div>
          <p className="label">Explore</p>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <Link href="/discover" className="text-ink underline-link">
                Discover Me
              </Link>
            </li>
            <li>
              <Link href="/path" className="text-ink underline-link">
                Path to a Goal
              </Link>
            </li>
            <li>
              <Link href="/explore" className="text-ink underline-link">
                Career Map
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="label">About</p>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-smoke">
            Salary ranges are US estimates for planning — not guarantees. Aligned
            with BLS / O*NET-style occupational data.
          </p>
        </div>
      </Container>
      <div className="border-t border-ink/10">
        <Container className="flex flex-col items-start justify-between gap-3 py-6 text-xs text-smoke md:flex-row md:items-center">
          <p className="label">© Main Quest · Built for students choosing their next step</p>
          <p className="label">v0.1 · Made with care</p>
        </Container>
      </div>
    </footer>
  );
}
