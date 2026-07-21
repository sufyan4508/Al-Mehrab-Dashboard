import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mehrab: {
          bg: "#0b0d10",          // Luxury Ultra Dark Corporate Base
          panel: "#12161a",       // Premium Sleek Card/Panel Background
          panel2: "#181e24",      // Hover / Elevated Panel state
          maroon: "#800e28",      // Rich Liquid Corporate Maroon
          maroonDeep: "#420512",  // Shadow Metallic Maroon
          gold: "#dfb15b",        // Brushed Metallic Champagne Gold
          goldSoft: "#ecd39b",    // Subtle Premium Gold Accents
          textMuted: "#8e9ba5",   // Clean Slate Grey for secondary text
          textLight: "#f1f4f6",   // Crisp Off-White for high readability
          green: "#10b981",       // Success Status
          amber: "#f59e0b",       // In-Progress Status
          rose: "#ef4444",        // Delayed / Critical Status
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-plex)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      backgroundImage: {
        "grid-pattern": "linear-gradient(to right, rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.015) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
export default config;
