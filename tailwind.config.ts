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
          bg: "#FFFBF7",
          surface: "#FFFFFF",
          card: "#F7F3EE",
          subtle: "#EDE8E1",
          ink: "#141824",
          muted: "#5C6370",
          border: "#E4DDD4",
          coral: "#E85D4C",
          "coral-dark": "#C94535",
          navy: "#1E2A4A",
          mint: "#1FA896",
          gold: "#C4841D",
          lavender: "#7C5CBF",
          sky: "#3B82C4",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 8px rgba(20, 24, 36, 0.06)",
        card: "0 1px 2px rgba(20, 24, 36, 0.04), 0 8px 24px rgba(20, 24, 36, 0.07)",
        lift: "0 12px 40px rgba(20, 24, 36, 0.12), 0 4px 12px rgba(20, 24, 36, 0.06)",
        glow: "0 0 0 1px rgba(232, 93, 76, 0.12), 0 20px 50px rgba(232, 93, 76, 0.15)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 2s infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
