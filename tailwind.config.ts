import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F9F6F0",
        foreground: "#1A1A1A",
        "adwa-green": "#1E3A32",
        terracotta: "#B95C42",
        "habesha-gold": "#D4A373",
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "Noto Sans Ethiopic", "sans-serif"],
        body: ["var(--font-inter)", "Noto Sans Ethiopic", "sans-serif"],
        ethiopic: ["var(--font-noto-ethiopic)", "sans-serif"],
      },
      boxShadow: {
        tibeb: "0 10px 40px rgba(30, 58, 50, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
