import Link from "next/link";
import { ArrowUpRight, Compass, GraduationCap, Map } from "lucide-react";
import { Container } from "@/components/container";
import { SessionBackup } from "@/components/session-backup";

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
    <footer className="mt-16 border-t border-ink/10 bg-cream md:mt-24">
      <Container className="grid gap-14 py-16 md:grid-cols-[1.2fr_1.4fr_1fr]">
        <div>
          <div className="group/logo flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-cream shadow-paper transition group-hover/logo:scale-105 group-hover/logo:bg-tomato group-hover/logo:shadow-glow">
              <span className="font-display text-lg font-semibold leading-none">M</span>
            </span>
            <span className="font-display text-lg font-semibold text-ink">Main Quest</span>
          </div>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-smoke">
            An honest career guide built for US students. No SAT prep ads. No
            life-coach pitches. Just real options, real numbers, real next steps.
          </p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper px-3 py-1.5 text-xs font-medium text-smoke">
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-pulse-soft rounded-full bg-moss" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-moss" />
            </span>
            v0.1 · in early preview
          </p>
        </div>

        <div>
          <p className="label">Quick start</p>
          <ul className="mt-6 divide-y divide-ink/10">
            {quickLinks.map(({ href, label, sub, Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="group flex items-center justify-between gap-4 py-3 transition"
                >
                  <span className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 bg-paper text-ink transition group-hover:border-tomato group-hover:bg-tomato/10 group-hover:text-tomato">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-ink underline-link">
                        {label}
                      </span>
                      <span className="block text-xs text-smoke">{sub}</span>
                    </span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-ink/30 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-tomato" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-8">
          <SessionBackup />
          <div>
            <p className="label">About the data</p>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-smoke">
              Salary ranges and outlooks are US estimates for planning, not
              guarantees. Aligned with BLS / O*NET-style occupational data.
            </p>
            <div className="mt-6 inline-flex flex-col gap-2 text-xs text-smoke">
              <span className="label">For students · For counselors · For parents</span>
              <span className="font-mono text-[11px] tabular text-ash">
                No accounts. No upsells. Optional privacy-friendly analytics on deploy.
              </span>
            </div>
          </div>
        </div>
      </Container>
      <div className="border-t border-ink/10 bg-paper/50">
        <Container className="flex flex-col items-start justify-between gap-3 py-6 text-xs text-smoke md:flex-row md:items-center">
          <p className="label">© {new Date().getFullYear()} Main Quest · Built for students choosing their next step</p>
          <p className="label">Made with care · Open to feedback</p>
        </Container>
      </div>
    </footer>
  );
}
