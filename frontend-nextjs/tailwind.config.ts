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
        background: "#050510",
        foreground: "#e0e0e0",
        primary: {
          DEFAULT: "#00f0ff",
          dark: "#0099cc",
        },
        ai: {
          DEFAULT: "#b026ff",
          dark: "#7000cc",
        },
        telemetry: {
          DEFAULT: "#00ffff",
        },
        alert: {
          DEFAULT: "#ff003c",
        },
        success: {
          DEFAULT: "#00ff66",
        },
        panel: "#0b0c1b",
        panelBorder: "#1a1c2e",
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-roboto-mono)'],
      },
      backgroundImage: {
        'grid-pattern': "url('/grid.svg')",
        'glow-gradient': "radial-gradient(circle at 50% 50%, rgba(176,38,255,0.15) 0%, rgba(0,240,255,0.05) 50%, transparent 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
