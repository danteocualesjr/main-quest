import type { Metadata } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const display = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
});

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Main Quest — Find your path",
  description:
    "Discover careers that fit you, reverse-engineer your dream job, and explore US career paths with salaries and growth data.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable}`}
      suppressHydrationWarning
    >
      <body className="font-body" suppressHydrationWarning>
        <SiteHeader />
        <main className="mx-auto min-h-[calc(100vh-8rem)] max-w-6xl px-4 pb-16 pt-8">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
