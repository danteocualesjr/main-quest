import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { BackToTop } from "@/components/back-to-top";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["opsz", "SOFT"],
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://main-quest.app";
const description =
  "An honest career guide for US students. Match careers to who you are, reverse-engineer paths to dream jobs, and explore real salary and growth data.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Main Quest | Pick your next move with clarity",
    template: "%s | Main Quest",
  },
  description,
  applicationName: "Main Quest",
  keywords: [
    "career guide",
    "students",
    "career quiz",
    "career roadmap",
    "salary data",
    "college planning",
  ],
  openGraph: {
    type: "website",
    siteName: "Main Quest",
    url: siteUrl,
    title: "Main Quest | Pick your next move with clarity",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Main Quest | Pick your next move with clarity",
    description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F3EDE4" },
    { media: "(prefers-color-scheme: dark)", color: "#1C1917" },
  ],
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-cream"
        >
          Skip to main content
        </a>
        <ScrollProgress />
        <SiteHeader />
        <main id="main-content" className="min-h-[calc(100vh-12rem)] pb-10">
          {children}
        </main>
        <SiteFooter />
        <BackToTop />
      </body>
    </html>
  );
}
