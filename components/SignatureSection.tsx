"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Reveal from "@/components/Reveal";
import { formatNGN, SIGNATURE_ROTATION } from "@/lib/products";

export default function SignatureSection() {
  const [idx, setIdx] = useState(0);
  const p = SIGNATURE_ROTATION[idx];

  useEffect(() => {
    const t = setInterval(() => setIdx((v) => (v + 1) % SIGNATURE_ROTATION.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative overflow-hidden bg-noir py-28 text-ivory lg:py-40">
      {/* animated light */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        animate={{ opacity: [0.12, 0.2, 0.12], scale: [1, 1.12, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: "radial-gradient(circle, rgba(201,174,126,0.5), transparent 62%)"
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-champagne/40 to-transparent" />

      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-12">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.55em] text-champagne">
              The Signature Ritual
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-4xl leading-[1.05] sm:text-6xl lg:text-8xl">
              THE RITUAL OF
              <br />
              <span className="italic text-champagne">RADIANCE</span>
            </h2>
          </Reveal>

          {/* rotating product */}
          <div className="relative mt-14 flex h-[46vmin] min-h-[300px] w-full max-w-3xl items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 40, rotate: -4, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, rotate: 4, scale: 1.04 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-full w-full"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="relative h-[70%] w-auto"
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Image
                      src={p.image}
                      alt={p.name}
                      width={440}
                      height={440}
                      className="h-full w-auto object-contain drop-shadow-[0_50px_60px_rgba(0,0,0,0.55)]"
                      priority
                    />
                  </motion.div>
                </div>
                {/* orbiting label */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
                  <p className="font-display text-2xl italic text-ivory sm:text-3xl">{p.name}</p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.4em] text-champagne/80">
                    {p.category} · {formatNGN(p.price)}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <Reveal delay={0.15}>
            <Link
              href={`/product/${p.slug}`}
              data-cursor="EXPLORE"
              className="group relative mt-12 inline-block overflow-hidden bg-champagne px-12 py-[18px] text-[11px] font-medium uppercase tracking-luxe text-deep-brown transition-colors duration-500 hover:bg-ivory"
            >
              Explore the Ritual
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </Link>
          </Reveal>

          {/* progress dots */}
          <div className="mt-10 flex gap-2.5">
            {SIGNATURE_ROTATION.map((s, i) => (
              <button
                key={s.slug}
                onClick={() => setIdx(i)}
                aria-label={`Feature ${s.name}`}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === idx ? "w-8 bg-champagne" : "w-1 bg-ivory/25 hover:bg-ivory/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
