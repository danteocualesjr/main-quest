"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Map, Search, Target } from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/discover", label: "Discover Me", icon: Search },
  { href: "/path", label: "Path to Goal", icon: Target },
  { href: "/explore", label: "Explore Careers", icon: Map },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-quest-border bg-quest-bg/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-quest-indigo shadow-soft">
            <Compass className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="font-display text-lg font-bold tracking-tight text-quest-ink group-hover:text-quest-indigo">
              Main Quest
            </span>
            <p className="text-[11px] font-medium uppercase tracking-widest text-quest-muted">
              Find your path
            </p>
          </div>
        </Link>

        <nav className="flex items-center gap-1">
          {nav.map(({ href, label, icon: Icon }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-medium transition md:gap-2 md:px-3 md:text-sm",
                  active
                    ? "bg-quest-indigo/10 text-quest-indigo"
                    : "text-quest-muted hover:bg-quest-card hover:text-quest-ink"
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
