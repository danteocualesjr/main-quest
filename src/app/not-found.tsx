import Link from "next/link";
import { ArrowRight, Compass, GraduationCap, Map } from "lucide-react";
import { Container } from "@/components/container";
import { SectionLabel } from "@/components/section-label";
import { QuestButton } from "@/components/quest-button";

const doors = [
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

export default function NotFound() {
  return (
    <Container className="page-wash py-28 md:py-36" size="prose">
      <div className="text-center">
        <SectionLabel variant="accent" className="justify-center">
          404 · Off the map
        </SectionLabel>
        <p className="mt-8 font-display text-display-1 font-light leading-none tracking-tightest text-ink">
          <span className="tabular">404</span>
        </p>
        <h1 className="mt-6 font-display text-display-2 font-light tracking-tight text-ink">
          This page isn&apos;t on the{" "}
          <em className="italic text-tomato">map.</em>
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-graphite">
          The link may be broken or the page may have moved. No dead ends here,
          pick a door below and keep going.
        </p>
        <div className="mt-10 flex justify-center">
          <QuestButton href="/" size="lg">
            Back to home
            <ArrowRight className="h-4 w-4" />
          </QuestButton>
        </div>
      </div>

      <ul className="mx-auto mt-14 max-w-md divide-y divide-ink/10 border-y border-ink/10 text-left">
        {doors.map(({ href, label, sub, Icon }) => (
          <li key={href}>
            <Link
              href={href}
              className="group flex items-center justify-between gap-4 py-4 transition"
            >
              <span className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-cream text-ink transition group-hover:border-tomato group-hover:bg-tomato/10 group-hover:text-tomato">
                  <Icon className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-sm font-medium text-ink underline-link">
                    {label}
                  </span>
                  <span className="block text-xs text-smoke">{sub}</span>
                </span>
              </span>
              <ArrowRight className="h-4 w-4 text-ink/30 transition group-hover:translate-x-0.5 group-hover:text-tomato" />
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
