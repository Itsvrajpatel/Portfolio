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
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        pixelate: {
          '0%': { filter: 'blur(20px) contrast(2)', opacity: '0', transform: 'scale(1.05) translateY(20px)' },
          '100%': { filter: 'blur(0) contrast(1)', opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        'pixel-fade': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' }
        }
      },
      animation: {
        'pixelate-in': 'pixelate 1.5s cubic-bezier(0.2, 0.8, 0.2, 1) both',
        'pixel-fade': 'pixel-fade 0.5s ease-out forwards',
      }
    },
  },
  plugins: [],
};
export default config;
