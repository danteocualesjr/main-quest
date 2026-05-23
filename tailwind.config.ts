import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F5F1EA",
        cream: "#FBF8F1",
        ink: "#141312",
        graphite: "#3D3A36",
        smoke: "#6B6660",
        ash: "#A8A29A",
        rule: "#1A1A180F",
        ruleHard: "#1A1A1822",
        tomato: "#D43E1A",
        ember: "#9B2C0E",
        moss: "#4F5E3D",
        clay: "#C7956D",
        slate: "#1F2937",
      },
      fontFamily: {
        display: ["var(--font-display)", "Times New Roman", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-1": ["clamp(3rem, 9vw, 7.5rem)", { lineHeight: "0.95", letterSpacing: "-0.04em" }],
        "display-2": ["clamp(2.25rem, 6vw, 4.5rem)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        "display-3": ["clamp(1.75rem, 3.5vw, 2.75rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      boxShadow: {
        paper: "0 1px 0 rgba(20, 19, 18, 0.05)",
        soft: "0 4px 24px rgba(20, 19, 18, 0.06)",
        lift: "0 20px 60px -20px rgba(20, 19, 18, 0.18)",
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "marquee-slow": "marquee 60s linear infinite",
        "fade-up": "fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 0.6s ease-out both",
        "scale-in": "scale-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) both",
        "draw-line": "draw-line 1.1s cubic-bezier(0.65, 0, 0.35, 1) both",
        "pulse-soft": "pulse-soft 2.4s ease-in-out infinite",
        "shimmer": "shimmer 1.8s linear infinite",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.96)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "draw-line": {
          from: { transform: "scaleX(0)" },
          to: { transform: "scaleX(1)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.55" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
