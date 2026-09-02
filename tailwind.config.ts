import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#F7F2EA",
        cream: "#EFE6D8",
        sand: "#D9C8AE",
        champagne: "#C9AE7E",
        gold: "#B08D57",
        cocoa: "#6B4F3A",
        espresso: "#3A2A1E",
        "deep-brown": "#241812",
        noir: "#17100B"
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"]
      },
      letterSpacing: {
        luxe: "0.35em",
        wide2: "0.18em"
      },
      transitionTimingFunction: {
        luxe: "cubic-bezier(0.22, 1, 0.36, 1)"
      },
      transitionDuration: {
        400: "400ms"
      },
      boxShadow: {
        luxe: "0 40px 80px -24px rgba(36, 24, 18, 0.35)",
        "luxe-sm": "0 18px 40px -16px rgba(36, 24, 18, 0.28)"
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" }
        }
      },
      animation: {
        shimmer: "shimmer 3.5s linear infinite",
        floaty: "floaty 7s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
