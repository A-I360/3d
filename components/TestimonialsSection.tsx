"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Reveal from "@/components/Reveal";

const QUOTES = [
  {
    q: "A new ritual for every day.",
    name: "Amara O.",
    role: "Lagos · Ritual devotee",
    stars: 5
  },
  {
    q: "My skin has never felt this cared for. It is not a product — it is a ceremony.",
    name: "Zainab A.",
    role: "Abuja · Body Butter believer",
    stars: 5
  },
  {
    q: "The perfume oil is poetry. One drop, and the whole day changes.",
    name: "Kemi D.",
    role: "Accra · Fragrance collector",
    stars: 5
  }
];

export default function TestimonialsSection() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((v) => (v + 1) % QUOTES.length), 6500);
    return () => clearInterval(t);
  }, []);

  const q = QUOTES[idx];

  return (
    <section className="relative overflow-hidden bg-ivory py-28 lg:py-40">
      <div className="mx-auto max-w-5xl px-6 text-center lg:px-12">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.5em] text-gold">Words of Radiance</p>
        </Reveal>

        <div className="relative mt-10 min-h-[280px] sm:min-h-[240px]">
          <span className="pointer-events-none absolute -top-14 left-1/2 -translate-x-1/2 font-display text-[10rem] leading-none text-sand/40 select-none">
            “
          </span>
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={idx}
              initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -24, filter: "blur(6px)" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <p className="font-display text-3xl italic leading-snug text-espresso sm:text-5xl">
                “{q.q}”
              </p>
              <footer className="mt-8">
                <div className="flex items-center justify-center gap-1">
                  {Array.from({ length: q.stars }).map((_, i) => (
                    <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#B08D57">
                      <path d="M12 2.5l2.9 6.2 6.6.8-4.9 4.6 1.3 6.6L12 17.4l-5.9 3.3 1.3-6.6L2.5 9.5l6.6-.8L12 2.5Z" />
                    </svg>
                  ))}
                </div>
                <p className="mt-4 font-serif text-base text-espresso">{q.name}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.35em] text-cocoa/60">
                  {q.role}
                </p>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex justify-center gap-2.5">
          {QUOTES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Show testimonial ${i + 1}`}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === idx ? "w-8 bg-espresso" : "w-1 bg-espresso/25 hover:bg-espresso/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
