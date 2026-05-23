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
        quest: {
          bg: "#FAFAF8",
          surface: "#FFFFFF",
          card: "#F5F4F0",
          subtle: "#EEEDEA",
          ink: "#1C1917",
          muted: "#78716C",
          border: "#E7E5E4",
          gold: "#B45309",
          amber: "#EA580C",
          teal: "#0F766E",
          purple: "#6D28D9",
          indigo: "#4338CA",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 3px rgba(28, 25, 23, 0.06), 0 8px 24px rgba(28, 25, 23, 0.06)",
        card: "0 1px 2px rgba(28, 25, 23, 0.05), 0 4px 16px rgba(28, 25, 23, 0.06)",
        lift: "0 4px 12px rgba(28, 25, 23, 0.08), 0 12px 32px rgba(28, 25, 23, 0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
