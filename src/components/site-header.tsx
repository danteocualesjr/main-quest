"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Map, Search, Target } from "lucide-react";
import { QuestButton } from "@/components/quest-button";
import { Container } from "@/components/container";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/discover", label: "Discover", icon: Search },
  { href: "/path", label: "Path", icon: Target },
  { href: "/explore", label: "Explore", icon: Map },
];

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b backdrop-blur-md transition-colors",
        isHome
          ? "border-transparent bg-quest-bg/70"
          : "border-quest-border bg-quest-surface/90"
      )}
    >
      <Container className="flex items-center justify-between py-3 md:py-4">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-quest-navy shadow-soft ring-1 ring-quest-navy/10">
            <Compass className="h-5 w-5 text-quest-coral" />
          </div>
          <div className="hidden sm:block">
            <span className="font-display text-lg font-semibold tracking-tight text-quest-ink group-hover:text-quest-coral">
              Main Quest
            </span>
            <p className="text-[11px] font-medium text-quest-muted">Your career, decoded</p>
          </div>
        </Link>

        <nav className="flex items-center gap-1 md:gap-2">
          {nav.map(({ href, label, icon: Icon }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition md:px-4",
                  active
                    ? "bg-quest-navy text-white shadow-soft"
                    : "text-quest-muted hover:bg-quest-card hover:text-quest-ink"
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden md:inline">{label}</span>
              </Link>
            );
          })}
          <QuestButton href="/discover" size="sm" className="ml-1 hidden sm:inline-flex">
            Get started
          </QuestButton>
        </nav>
      </Container>
    </header>
  );
}
