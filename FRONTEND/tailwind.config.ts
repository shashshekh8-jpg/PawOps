import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  safelist: [
    'bg-blue-500',
    'bg-teal',
    'bg-accent',
    'bg-coral',
    'w-full',
    'w-3/4',
    'w-1/2',
    'w-1/3'
  ],
  theme: {
    extend: {
      colors: {
        background: "#0F172A",
        coral: "#FF6B6B",
        teal: "#4ECDC4",
        accent: "#FFE66D",
        cardBg: "rgba(255, 255, 255, 0.05)",
      },
    },
  },
  plugins: [],
};
export default config;
