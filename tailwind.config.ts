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
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" }
        },
        glow: {
          "0%, 100%": { opacity: "0.12", transform: "scale(1)" },
          "50%": { opacity: "0.22", transform: "scale(1.12)" }
        },
        particle: {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "12%": { opacity: "0.9" },
          "100%": { transform: "translateY(-60px)", opacity: "0" }
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        cue: {
          "0%, 100%": { transform: "scaleY(0.3)", opacity: "0.4" },
          "50%": { transform: "scaleY(1)", opacity: "1" }
        }
      },
      animation: {
        floaty: "floaty 7s ease-in-out infinite",
        glow: "glow 8s ease-in-out infinite",
        particle: "particle 7s linear infinite",
        marquee: "marquee 36s linear infinite",
        cue: "cue 2.2s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
