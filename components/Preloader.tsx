"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useSite } from "@/lib/site";

const WORD = "AFRIESSENCE".split("");

const STORAGE_KEY = "afriessence-loaded";

export default function Preloader() {
  const { loaded, setLoaded } = useSite();
  const [progress, setProgress] = useState(0);
  const raf = useRef<number | null>(null);
  const [skip] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (loaded) return;
    if (skip) {
      setLoaded(true);
      return;
    }
    const start = performance.now();
    const dur = 1500;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        raf.current = requestAnimationFrame(tick);
      } else {
        try {
          sessionStorage.setItem(STORAGE_KEY, "1");
        } catch {
          /* ignore */
        }
        setTimeout(() => setLoaded(true), 200);
      }
    };
    raf.current = requestAnimationFrame(tick);
    document.documentElement.style.overflow = "hidden";
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      document.documentElement.style.overflow = "";
    };
  }, [loaded, setLoaded, skip]);

  if (skip || loaded) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-deep-brown"
      exit={{ y: "-100%", transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
      aria-hidden
    >
      {/* ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,174,126,0.16),transparent_65%)]" />

      {/* brand mark */}
      <motion.img
        src="/icon.svg"
        alt=""
        className="mb-8 h-12 w-12"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="flex overflow-hidden">
        {WORD.map((ch, i) => (
          <motion.span
            key={i}
            className="font-display text-3xl tracking-[0.3em] text-ivory sm:text-5xl"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.08 * i, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {ch}
          </motion.span>
        ))}
      </div>

      <motion.p
        className="mt-5 text-[10px] uppercase tracking-[0.5em] text-champagne/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        Where Beauty Meets Radiance
      </motion.p>

      <div className="mt-10 h-px w-56 overflow-hidden bg-ivory/15 sm:w-80">
        <motion.div
          className="h-full bg-gradient-to-r from-champagne to-gold"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-4 font-mono text-[10px] tracking-[0.3em] text-ivory/50">
        {progress}%
      </p>
    </motion.div>
  );
}
