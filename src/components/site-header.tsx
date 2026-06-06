"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { QuestButton } from "@/components/quest-button";
import { Container } from "@/components/container";
import { ThemeToggle } from "@/components/theme-toggle";
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
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => {
      const top = window.scrollY;
      setScrolled(top > 8);
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      setProgress(scrollable > 0 ? Math.min(1, Math.max(0, top / scrollable)) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

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
        "sticky top-0 z-50 border-b bg-paper/92 backdrop-blur-lg transition-[border-color,box-shadow,background-color] duration-300",
        mounted && scrolled
          ? "border-ink/15 shadow-soft"
          : "border-ink/10"
      )}
    >
      <Container className="flex items-center justify-between py-4">
        <Link
          href="/"
          className="group flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tomato/40 focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
          aria-label="Main Quest, home"
        >
          <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-ink text-cream shadow-paper transition group-hover:scale-105 group-hover:bg-tomato group-hover:shadow-glow">
            <span className="font-display text-lg font-semibold leading-none">M</span>
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

        <nav className="hidden items-center gap-1 sm:flex">
          {nav.map(({ href, label, hint }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group/nav relative rounded-2xl px-3.5 py-2 text-sm font-medium transition",
                  active ? "nav-pill-active text-ink" : "text-smoke transition duration-200 hover:bg-ink/[0.04] hover:text-ink focus-visible:ring-2 focus-visible:ring-tomato/30 focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                )}
              >
                <span className="flex flex-col leading-none">
                  <span>{label}</span>
                  <span className="mt-1 hidden font-mono text-[9px] uppercase tracking-[0.18em] text-ash group-hover/nav:text-smoke lg:block">
                    {hint}
                  </span>
                </span>
                {active && (
                  <span
                    aria-hidden
                    className="absolute bottom-1 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-tomato"
                  />
                )}
              </Link>
            );
          })}
          <ThemeToggle className="ml-1" />
          <QuestButton href="/discover" size="sm" className="ml-1">
            Start free
          </QuestButton>
        </nav>

        <div className="flex items-center gap-2 sm:hidden">
          <ThemeToggle className="h-10 w-10" />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink transition hover:border-tomato hover:text-tomato focus-visible:ring-2 focus-visible:ring-tomato/40 focus-visible:ring-offset-2 focus-visible:ring-offset-paper active:scale-[0.98]"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </Container>

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
              const active = isActive(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between py-4 transition",
                      active ? "text-ink" : "text-graphite hover:bg-ink/[0.03]"
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

      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r from-tomato to-ember transition-opacity duration-300",
          mounted && scrolled ? "opacity-100" : "opacity-0"
        )}
        style={{ transform: `scaleX(${mounted ? progress : 0})` }}
      />
    </header>
  );
}
