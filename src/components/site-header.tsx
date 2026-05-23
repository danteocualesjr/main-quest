"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { QuestButton } from "@/components/quest-button";
import { Container } from "@/components/container";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/discover", label: "Discover" },
  { href: "/path", label: "Path" },
  { href: "/explore", label: "Explore" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/85 backdrop-blur-md">
      <Container className="flex items-center justify-between py-4">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-cream transition group-hover:bg-tomato">
            <span className="font-display text-lg font-semibold leading-none">M</span>
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-ink">
            Main Quest
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          {nav.map(({ href, label }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition",
                  active
                    ? "text-ink"
                    : "text-smoke hover:text-ink"
                )}
              >
                {label}
                {active && (
                  <span className="ml-2 inline-block h-1 w-1 rounded-full bg-tomato align-middle" />
                )}
              </Link>
            );
          })}
          <QuestButton href="/discover" size="sm" className="ml-2 hidden sm:inline-flex">
            Start free
          </QuestButton>
        </nav>
      </Container>
    </header>
  );
}
