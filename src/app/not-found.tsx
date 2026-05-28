import Link from "next/link";
import { ArrowRight, Compass, GraduationCap, Map } from "lucide-react";
import { Container } from "@/components/container";
import { QuestButton } from "@/components/quest-button";
import { SectionLabel } from "@/components/section-label";

const doors = [
  { href: "/discover", label: "Discover Me", sub: "Quiz · 2 min", Icon: Compass },
  { href: "/path", label: "Path to a Goal", sub: "Build a roadmap", Icon: GraduationCap },
  { href: "/explore", label: "Career Map", sub: "30+ careers", Icon: Map },
];

export default function NotFound() {
  return (
    <Container className="page-wash py-28 md:py-36" size="prose">
      <div className="text-center">
        <SectionLabel variant="accent" className="justify-center">
          404
        </SectionLabel>
        <h1 className="mt-6 font-display text-display-2 font-light tracking-tight text-ink">
          This page is <em className="italic text-tomato">off the map.</em>
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-graphite">
          The page you&apos;re after doesn&apos;t exist (or moved). No dead ends here,
          though, pick a door and keep going.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <QuestButton href="/" size="lg">
            Back to home
            <ArrowRight className="h-4 w-4" />
          </QuestButton>
          <QuestButton href="/explore" variant="ghost" size="lg">
            Browse all careers
          </QuestButton>
        </div>
      </div>

      <ul className="mx-auto mt-16 grid max-w-xl gap-3 sm:grid-cols-3">
        {doors.map(({ href, label, sub, Icon }) => (
          <li key={href}>
            <Link
              href={href}
              className="group flex h-full flex-col gap-3 rounded-2xl border border-ink/10 bg-cream p-5 text-left transition hover:-translate-y-0.5 hover:border-tomato/25 hover:shadow-lift"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-paper text-ink transition group-hover:border-tomato group-hover:bg-tomato/10 group-hover:text-tomato">
                <Icon className="h-4 w-4" />
              </span>
              <span>
                <span className="block font-display text-lg font-light tracking-tight text-ink transition group-hover:text-tomato">
                  {label}
                </span>
                <span className="mt-0.5 block text-xs text-smoke">{sub}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
