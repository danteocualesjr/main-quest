import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

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

export const metadata: Metadata = {
  title: "Main Quest | Pick your next move with clarity",
  description:
    "An honest career guide for US students. Match careers to who you are, reverse-engineer paths to dream jobs, and explore real salary and growth data.",
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
      <body suppressHydrationWarning className="relative overflow-x-hidden">
        {/* Ambient aurora field - sits behind everything, never scrolls away. */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        >
          {/* Animated aurora blobs */}
          <div
            className="aurora-blob animate-aurora"
            style={{
              top: "-12%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "62rem",
              height: "62rem",
              background:
                "radial-gradient(circle, rgba(167,139,250,0.55) 0%, rgba(167,139,250,0) 60%)",
              animationDelay: "0s",
            }}
          />
          <div
            className="aurora-blob animate-aurora"
            style={{
              top: "10%",
              right: "-8%",
              width: "40rem",
              height: "40rem",
              background:
                "radial-gradient(circle, rgba(236,72,153,0.4) 0%, rgba(236,72,153,0) 60%)",
              animationDelay: "-6s",
            }}
          />
          <div
            className="aurora-blob animate-aurora"
            style={{
              top: "50%",
              left: "-10%",
              width: "44rem",
              height: "44rem",
              background:
                "radial-gradient(circle, rgba(34,211,238,0.28) 0%, rgba(34,211,238,0) 60%)",
              animationDelay: "-12s",
            }}
          />
          {/* Faint subway grid */}
          <div
            className="absolute inset-0 opacity-[0.025] bg-grid"
            style={{ backgroundSize: "44px 44px" }}
          />
          {/* Twinkling stars */}
          <div className="absolute inset-0 starfield opacity-50 animate-twinkle" />
        </div>

        <SiteHeader />
        <main className="relative">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
