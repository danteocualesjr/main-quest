import Link from "next/link";
import { ArrowUpRight, Compass, GraduationCap, Map } from "lucide-react";
import { Container } from "@/components/container";

const quickLinks = [
  {
    href: "/discover",
    label: "Discover Me",
    sub: "Quiz · 2 min",
    Icon: Compass,
  },
  {
    href: "/path",
    label: "Path to a Goal",
    sub: "Reverse-engineered roadmap",
    Icon: GraduationCap,
  },
  {
    href: "/explore",
    label: "Career Map",
    sub: "30+ careers, filterable",
    Icon: Map,
  },
];

export function SiteFooter() {
  return (
    <footer className="relative mt-24 border-t border-white/10">
      {/* Soft top gradient to separate from page */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric/60 to-transparent"
      />
      <Container className="grid gap-14 py-16 md:grid-cols-[1.2fr_1.4fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl">
              <span aria-hidden className="absolute inset-0 rounded-xl bg-aurora" />
              <span className="relative font-display text-lg font-semibold leading-none text-white">
                M
              </span>
            </span>
            <span className="font-display text-lg font-semibold text-ink">Main Quest</span>
          </div>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-graphite">
            An honest career guide built for US students. No SAT prep ads. No
            life-coach pitches. Just real options, real numbers, real next steps.
          </p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-graphite">
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-pulse-soft rounded-full bg-moss" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-moss shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            </span>
            v0.1 · in early preview
          </p>
        </div>

        <div>
          <p className="label-accent">Quick start</p>
          <ul className="mt-6 divide-y divide-white/10">
            {quickLinks.map(({ href, label, sub, Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="group flex items-center justify-between gap-4 py-3 transition"
                >
                  <span className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-ink transition group-hover:border-electric/60 group-hover:bg-electric/10 group-hover:text-electric">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-ink underline-link">
                        {label}
                      </span>
                      <span className="block text-xs text-smoke">{sub}</span>
                    </span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-smoke transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-magenta" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="label-accent">About the data</p>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-graphite">
            Salary ranges and outlooks are US estimates for planning, not
            guarantees. Aligned with BLS / O*NET-style occupational data.
          </p>
          <div className="mt-6 inline-flex flex-col gap-2 text-xs text-graphite">
            <span className="label">For students · For counselors · For parents</span>
            <span className="font-mono text-[11px] tabular text-ash">
              No accounts. No tracking. No upsells.
            </span>
          </div>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col items-start justify-between gap-3 py-6 text-xs text-smoke md:flex-row md:items-center">
          <p className="label">© Main Quest · Built for students choosing their next step</p>
          <p className="label">Made with care · Open to feedback</p>
        </Container>
      </div>
    </footer>
  );
}
