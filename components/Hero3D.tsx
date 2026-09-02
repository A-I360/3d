"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import ProductScene from "@/components/ProductScene";
import { PRODUCTS } from "@/lib/products";

const HERO_PRODUCTS = PRODUCTS.filter((p) =>
  ["lush-wood-body-oil", "shimmer-oil", "perfume-oil"].includes(p.slug)
);

export default function Hero3D() {
  const [active, setActive] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const bgX = useSpring(mx, { stiffness: 40, damping: 20 });
  const bgY = useSpring(my, { stiffness: 40, damping: 20 });
  const fgX = useSpring(mx, { stiffness: 60, damping: 20 });
  const fgY = useSpring(my, { stiffness: 60, damping: 20 });

  const hero = HERO_PRODUCTS[active];


  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    mx.set(x * 26);
    my.set(y * 26);
    setMouse({ x: e.clientX, y: e.clientY });
  };

  const lightStyle = useMemo(
    () => ({
      background: `radial-gradient(600px circle at ${mouse.x}px ${mouse.y}px, rgba(216,185,138,0.14), transparent 65%)`
    }),
    [mouse]
  );

  return (
    <section
      id="home"
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ivory"
      onMouseMove={onMove}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      {/* ---- background layer (slow) ---- */}
      <motion.div
        className="absolute inset-0"
        style={{ x: bgX, y: bgY, scale: 1.06 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_30%,#FBF7F0_0%,#F3EBDD_55%,#E9DCC7_100%)]" />
        <div className="absolute -left-[15%] top-[8%] h-[46vmin] w-[46vmin] rounded-full bg-sand/40 blur-[90px]" />
        <div className="absolute -right-[12%] bottom-[6%] h-[42vmin] w-[42vmin] rounded-full bg-champagne/30 blur-[90px]" />
        {/* subtle grain */}
        <div
          className="absolute inset-0 opacity-[0.05] mix-blend-multiply"
          style={{
            backgroundImage:
              "radial-gradient(rgba(58,42,30,0.8) 0.7px, transparent 0.7px)",
            backgroundSize: "26px 26px"
          }}
        />
      </motion.div>

      {/* lighting reacts to cursor */}
      <motion.div className="pointer-events-none absolute inset-0 z-10 mix-blend-screen" style={lightStyle} />

      {/* ---- product layer (mid) ---- */}
      <AnimatePresence mode="wait">
        <motion.div
          key={hero.slug}
          className="absolute inset-0 z-20"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <ProductScene
            model={hero.model}
            sparkles={hero.slug === "shimmer-oil"}
            interactive
            lowPower={false}
            className="absolute inset-0"
            cameraZ={4.6}
          />
        </motion.div>
      </AnimatePresence>

      {/* ---- foreground layer (fast) + copy ---- */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center px-6 text-center"
        style={{ x: fgX, y: fgY }}
      >
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9 }}
          className="mb-6 text-[10px] font-medium uppercase tracking-[0.5em] text-cocoa/90 sm:text-[11px]"
        >
          African Beauty&ensp;•&ensp;Modern Rituals
        </motion.p>

        <h1 className="font-display text-[13vw] font-medium leading-[0.95] tracking-wide text-espresso sm:text-7xl lg:text-[92px]">
          WHERE BEAUTY
          <br />
          <span className="italic text-cocoa">MEETS RADIANCE</span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.9 }}
          className="mt-7 max-w-xl text-sm font-light leading-relaxed text-cocoa/90 sm:text-base"
        >
          Thoughtfully crafted beauty rituals inspired by nature, created to
          nourish, elevate and reveal your natural radiance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.9 }}
          className="pointer-events-auto mt-10 flex flex-col items-center gap-4 sm:flex-row sm:gap-6"
        >
          <Link
            href="/shop"
            data-cursor="SHOP"
            className="group relative overflow-hidden bg-espresso px-10 py-4 text-[11px] font-medium uppercase tracking-luxe text-ivory transition-colors duration-500 hover:bg-deep-brown"
          >
            <span className="relative z-10">Shop the Collection</span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </Link>
          <a
            href="#collection"
            data-cursor="EXPLORE"
            className="group relative px-2 py-4 text-[11px] font-medium uppercase tracking-luxe text-espresso"
          >
            Discover AfriEssence
            <span className="absolute bottom-2 left-0 h-px w-full origin-left scale-x-100 bg-espresso/40 transition-transform duration-500 group-hover:scale-x-0" />
            <span className="absolute bottom-2 left-0 h-px w-full origin-right scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
          </a>
        </motion.div>

        {/* product switcher */}
        <div className="pointer-events-auto absolute bottom-28 flex items-center gap-3 sm:bottom-24">
          {HERO_PRODUCTS.map((p, i) => (
            <button
              key={p.slug}
              onClick={() => setActive(i)}
              aria-label={`Show ${p.name}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === active ? "w-10 bg-espresso" : "w-1.5 bg-espresso/30 hover:bg-espresso/60"
              }`}
            />
          ))}
        </div>
      </motion.div>

      {/* scroll cue */}
      <motion.a
        href="#collection"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 z-40 -translate-x-1/2"
        aria-label="Scroll to collection"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-[9px] uppercase tracking-[0.4em] text-cocoa/70">Scroll</span>
          <motion.span
            className="block h-10 w-px bg-gradient-to-b from-espresso/60 to-transparent"
            animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.a>

      {/* side labels */}
      <div className="absolute right-6 top-1/2 z-40 hidden -translate-y-1/2 rotate-90 items-center gap-6 lg:flex">
        <span className="text-[9px] uppercase tracking-[0.45em] text-cocoa/50">Est. Lagos</span>
        <span className="h-px w-14 bg-cocoa/30" />
      </div>
      <div className="absolute left-6 top-1/2 z-40 hidden -translate-y-1/2 -rotate-90 items-center gap-6 lg:flex">
        <span className="h-px w-14 bg-cocoa/30" />
        <span className="text-[9px] uppercase tracking-[0.45em] text-cocoa/50">01 — The Collection</span>
      </div>
    </section>
  );
}
