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
        // Aurora Quest palette - dark-mode native.
        // The old token names are preserved so existing components
        // inherit the new theme automatically. Semantics:
        //   paper/cream/void   = surface tones (darker -> lighter)
        //   ink/graphite/smoke = text tones (brightest -> dimmest)
        //   tomato/ember       = primary accent (electric rose)
        //   moss/clay          = secondary accents (mint / amber)
        paper: "#08060F",       // page background (midnight)
        void: "#050309",        // deepest surface (modals, header on scroll)
        cream: "#13101F",       // elevated surface (cards)
        nebula: "#1B1730",      // hover / chips
        surface: "#100D1D",     // alt card
        rule: "#FFFFFF14",      // hairline
        ruleHard: "#FFFFFF22",  // stronger hairline
        ink: "#F5F3FF",         // primary text (lavender white)
        graphite: "#C7C2E5",    // secondary text
        smoke: "#8C85B5",       // tertiary text
        ash: "#5C557E",         // muted text
        // Accents
        tomato: "#F43F5E",      // rose - primary accent
        ember: "#BE123C",       // deep rose hover
        moss: "#34D399",        // mint - secondary
        clay: "#FBBF24",        // amber - tertiary highlight
        slate: "#1F2937",
        // Aurora ramp (used for gradients + glow)
        electric: "#A78BFA",    // violet
        magenta: "#EC4899",     // hot pink
        flame: "#FB923C",       // sunset orange
        cyan: "#22D3EE",        // electric cyan
      },
      fontFamily: {
        display: ["var(--font-display)", "Times New Roman", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-1": ["clamp(3rem, 9.5vw, 8rem)", { lineHeight: "0.95", letterSpacing: "-0.045em" }],
        "display-2": ["clamp(2.25rem, 6vw, 4.75rem)", { lineHeight: "1.02", letterSpacing: "-0.035em" }],
        "display-3": ["clamp(1.75rem, 3.5vw, 2.75rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      boxShadow: {
        paper: "0 1px 0 rgba(255, 255, 255, 0.04)",
        soft: "0 4px 24px rgba(0, 0, 0, 0.4)",
        lift: "0 24px 80px -24px rgba(167, 139, 250, 0.28), 0 8px 24px -8px rgba(244, 63, 94, 0.18)",
        glow: "0 0 0 1px rgba(167, 139, 250, 0.35), 0 8px 32px -8px rgba(167, 139, 250, 0.6)",
        "glow-rose": "0 0 0 1px rgba(244, 63, 94, 0.4), 0 12px 40px -8px rgba(244, 63, 94, 0.55)",
      },
      backgroundImage: {
        aurora:
          "linear-gradient(135deg, #A78BFA 0%, #EC4899 45%, #FB923C 100%)",
        "aurora-soft":
          "linear-gradient(135deg, rgba(167,139,250,0.18) 0%, rgba(236,72,153,0.15) 45%, rgba(251,146,60,0.12) 100%)",
        "aurora-text":
          "linear-gradient(120deg, #C4B5FD 0%, #F0ABFC 35%, #FDBA74 100%)",
        grid:
          "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "marquee-slow": "marquee 60s linear infinite",
        "fade-up": "fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 0.6s ease-out both",
        "scale-in": "scale-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) both",
        "draw-line": "draw-line 1.1s cubic-bezier(0.65, 0, 0.35, 1) both",
        "pulse-soft": "pulse-soft 2.4s ease-in-out infinite",
        shimmer: "shimmer 1.8s linear infinite",
        aurora: "aurora 18s ease-in-out infinite",
        float: "float 8s ease-in-out infinite",
        "spin-slow": "spin 22s linear infinite",
        twinkle: "twinkle 4s ease-in-out infinite",
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
        aurora: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)", opacity: "0.55" },
          "33%": { transform: "translate(6%, -4%) scale(1.08)", opacity: "0.75" },
          "66%": { transform: "translate(-5%, 5%) scale(0.95)", opacity: "0.6" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "0.9" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
