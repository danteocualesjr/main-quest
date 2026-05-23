"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { QuestButton } from "@/components/quest-button";
import { Container } from "@/components/container";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/discover", label: "Discover", hint: "Quiz" },
  { href: "/path", label: "Path", hint: "Roadmap" },
  { href: "/explore", label: "Explore", hint: "Catalog" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while mobile menu is open.
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-paper/85 backdrop-blur-md transition-colors duration-300",
        scrolled
          ? "border-ink/15 shadow-[0_1px_0_rgba(20,19,18,0.04)]"
          : "border-ink/10"
      )}
    >
      <Container className="flex items-center justify-between py-4">
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label="Main Quest, home"
        >
          <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-ink text-cream transition group-hover:bg-tomato">
            <span className="font-display text-lg font-semibold leading-none">M</span>
            <span
              aria-hidden
              className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-tomato opacity-0 transition group-hover:opacity-100"
            />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-semibold tracking-tight text-ink">
              Main Quest
            </span>
            <span className="hidden font-mono text-[9px] uppercase tracking-[0.22em] text-smoke sm:inline-block">
              Pick your path
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 sm:flex">
          {nav.map(({ href, label }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "group/nav relative rounded-full px-4 py-2 text-sm font-medium transition",
                  active ? "text-ink" : "text-smoke hover:text-ink"
                )}
              >
                <span>{label}</span>
                <span
                  className={cn(
                    "ml-2 inline-block h-1 w-1 rounded-full align-middle transition",
                    active
                      ? "bg-tomato opacity-100"
                      : "bg-tomato opacity-0 group-hover/nav:opacity-100"
                  )}
                />
              </Link>
            );
          })}
          <QuestButton href="/discover" size="sm" className="ml-2">
            Start free
          </QuestButton>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink transition hover:border-tomato hover:text-tomato sm:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </Container>

      {/* Mobile sheet */}
      <div
        id="mobile-nav"
        className={cn(
          "sm:hidden",
          "overflow-hidden border-t border-ink/10 bg-paper transition-[max-height,opacity] duration-300 ease-out",
          open ? "max-h-[420px] opacity-100" : "pointer-events-none max-h-0 opacity-0"
        )}
      >
        <Container className="py-2">
          <ul className="divide-y divide-ink/10">
            {nav.map(({ href, label, hint }) => {
              const active = pathname === href || pathname.startsWith(`${href}/`);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={cn(
                      "flex items-center justify-between py-4 transition",
                      active ? "text-ink" : "text-graphite"
                    )}
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="font-display text-2xl font-light tracking-tight">
                        {label}
                      </span>
                      <span className="label">{hint}</span>
                    </span>
                    <span
                      className={cn(
                        "inline-flex h-9 w-9 items-center justify-center rounded-full border transition",
                        active
                          ? "border-tomato bg-tomato text-cream"
                          : "border-ink/15 text-ink"
                      )}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="border-t border-ink/10 py-4">
            <QuestButton href="/discover" size="lg" className="w-full">
              Start free
              <ArrowRight className="h-4 w-4" />
            </QuestButton>
          </div>
        </Container>
      </div>
    </header>
  );
}
