"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";
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
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function isActive(href: string) {
    if (!mounted) return false;
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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
        "sticky top-0 z-50 transition-all duration-300",
        mounted && scrolled
          ? "border-b border-white/10 bg-paper/70 backdrop-blur-xl shadow-soft"
          : "border-b border-white/5 bg-paper/30 backdrop-blur-md"
      )}
    >
      <Container className="flex items-center justify-between py-4">
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label="Main Quest, home"
        >
          <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl">
            <span
              aria-hidden
              className="absolute inset-0 rounded-xl bg-aurora"
            />
            <span
              aria-hidden
              className="absolute inset-0 rounded-xl bg-aurora opacity-60 blur-md transition-opacity duration-300 group-hover:opacity-100"
            />
            <span className="relative font-display text-lg font-semibold leading-none text-white">
              M
            </span>
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-semibold tracking-tight text-ink">
              Main Quest
            </span>
            <span className="hidden font-mono text-[9px] uppercase tracking-[0.24em] text-smoke sm:inline-block">
              Pick your path
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 sm:flex">
          {nav.map(({ href, label }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "group/nav relative rounded-full px-4 py-2 text-sm font-medium transition",
                  active ? "text-ink" : "text-graphite hover:text-ink"
                )}
              >
                {active && (
                  <span
                    aria-hidden
                    className="absolute inset-0 -z-10 rounded-full bg-white/[0.06] ring-1 ring-white/10"
                  />
                )}
                <span>{label}</span>
                <span
                  className={cn(
                    "ml-2 inline-block h-1.5 w-1.5 rounded-full align-middle transition",
                    active
                      ? "bg-magenta shadow-[0_0_10px_rgba(236,72,153,0.8)]"
                      : "bg-magenta opacity-0 group-hover/nav:opacity-70"
                  )}
                />
              </Link>
            );
          })}
          <QuestButton href="/discover" size="sm" className="ml-3">
            <Sparkles className="h-3.5 w-3.5" />
            Start free
          </QuestButton>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-ink transition hover:border-electric/60 hover:text-electric sm:hidden"
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
          "overflow-hidden border-t border-white/10 bg-paper/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 ease-out",
          open ? "max-h-[420px] opacity-100" : "pointer-events-none max-h-0 opacity-0"
        )}
      >
        <Container className="py-2">
          <ul className="divide-y divide-white/10">
            {nav.map(({ href, label, hint }) => {
              const active = isActive(href);
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
                          ? "border-electric/60 bg-electric/15 text-electric shadow-glow"
                          : "border-white/15 text-ink"
                      )}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="border-t border-white/10 py-4">
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
