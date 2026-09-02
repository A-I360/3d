"use client";

import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Scene from "@/components/Scene";
import ViewportGate from "@/components/ViewportGate";
import { getProduct, type Product } from "@/lib/products";

interface Chapter {
  product: Product;
  kicker: string;
  headline: string;
  copy: string;
  notes: string[];
  bg: string;
  accent: string;
}

const CHAPTERS: Chapter[] = [
  {
    product: getProduct("lush-wood-body-oil")!,
    kicker: "Chapter I — The Ritual of Warmth",
    headline: "LUSH WOOD\nBODY OIL",
    copy: "Warm woods, soft amber and slow golden light. Massaged into skin with intention, Lush Wood turns an everyday moment into a ceremony of self-care.",
    notes: ["Sandalwood & amber", "Fast-absorbing golden oil", "The heart of the collection"],
    bg: "#EFE6D8",
    accent: "#8A6A4B"
  },
  {
    product: getProduct("herbal-glow-body-wash")!,
    kicker: "Chapter II — The Morning Ritual",
    headline: "HERBAL GLOW\nBODY WASH",
    copy: "Fresh botanicals, morning light, water. A cleansing ritual that refreshes the skin and leaves a soft veil of glow — the way every day should begin.",
    notes: ["Eucalyptus & green tea", "Gentle daily cleanse", "Luminous, never stripped"],
    bg: "#E4E8D8",
    accent: "#5C7050"
  }
];

const fadeMask = {
  WebkitMaskImage:
    "radial-gradient(115% 115% at 50% 50%, #000 55%, transparent 78%)",
  maskImage: "radial-gradient(115% 115% at 50% 50%, #000 55%, transparent 78%)"
};

export default function FeaturedStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [chapter, setChapter] = useState(0);
  const [ready, setReady] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setChapter(v > 0.52 ? 1 : 0);
  });

  /* environment crossfades with opacity — GPU-composited, no per-frame repaint */
  const bg0 = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const bg1 = useTransform(scrollYProgress, [0.5, 0.55], [0, 1]);
  const rotY = useTransform(scrollYProgress, [0, 1], [-22, 22]);
  const sceneScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.92, 0.94]);

  useEffect(() => setReady(false), [chapter]);

  const c = CHAPTERS[chapter];

  return (
    <section ref={containerRef} className="relative h-[420vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* crossfading environments */}
        <motion.div className="absolute inset-0" style={{ backgroundColor: CHAPTERS[0].bg, opacity: bg0 }} />
        <motion.div className="absolute inset-0" style={{ backgroundColor: CHAPTERS[1].bg, opacity: bg1 }} />

        {/* environment decor */}
        <div className="absolute left-[8%] top-[14%] h-64 w-64 rounded-full blur-[100px]" style={{ backgroundColor: c.accent, opacity: 0.18 }} />
        <div className="absolute bottom-[12%] right-[6%] h-80 w-80 rounded-full blur-[120px]" style={{ backgroundColor: c.accent, opacity: 0.14 }} />

        {/* progress rail */}
        <div className="absolute left-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex">
          {CHAPTERS.map((ch, i) => (
            <div key={ch.product.slug} className="flex items-center gap-3">
              <span
                className={`text-[9px] uppercase tracking-[0.3em] transition-colors duration-500 ${
                  i === chapter ? "text-espresso" : "text-espresso/35"
                }`}
              >
                {i === 0 ? "01" : "02"}
              </span>
              <span className={`h-10 w-px ${i === chapter ? "bg-espresso/60" : "bg-espresso/15"}`} />
            </div>
          ))}
        </div>

        {/* rotating product */}
        <div className="absolute left-1/2 top-1/2 z-10 h-[78vmin] w-[78vmin] -translate-x-1/2 -translate-y-1/2 sm:h-[62vmin] sm:w-[62vmin]">
          <motion.div
            className="absolute inset-0"
            style={{ rotateY: rotY, scale: sceneScale }}
          >
            {/* instant static fallback per chapter */}
            <motion.div
              key={`img-${c.product.slug}`}
              className="absolute inset-0"
              animate={{ opacity: ready ? 0 : 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <Image
                src={c.product.image}
                alt={c.product.name}
                fill
                sizes="62vmin"
                className="object-cover"
                style={fadeMask}
              />
            </motion.div>

            {/* WebGL once near the viewport */}
            <ViewportGate rootMargin="320px" className="absolute inset-0">
              <div
                className="absolute inset-0 transition-opacity duration-700"
                style={{ opacity: ready ? 1 : 0 }}
              >
                <Scene
                  model={c.product.model}
                  sparkles={c.product.slug === "shimmer-oil"}
                  interactive={false}
                  cameraZ={4.8}
                  onReady={() => setReady(true)}
                />
              </div>
            </ViewportGate>
          </motion.div>
        </div>

        {/* chapter panels */}
        {CHAPTERS.map((ch, i) => {
          const start = i === 0 ? 0 : 0.5;
          const end = i === 0 ? 0.5 : 1;
          const opacity = useTransform(scrollYProgress, [start, start + 0.04, end - 0.1, end], [0, 1, 1, 0]);
          return (
            <motion.div
              key={ch.product.slug}
              style={{ opacity }}
              className="absolute inset-0 z-20 flex items-center"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/5 to-transparent" />
              <div className="relative mx-auto flex w-full max-w-[1600px] flex-col justify-center px-6 lg:px-24">
                <div className="max-w-xl">
                  <p
                    className="text-[10px] uppercase tracking-[0.5em]"
                    style={{ color: ch.accent }}
                  >
                    {ch.kicker}
                  </p>
                  <h3 className="mt-5 whitespace-pre-line font-display text-4xl leading-[1.02] text-espresso sm:text-6xl lg:text-7xl">
                    {ch.headline}
                  </h3>
                  <p className="mt-6 max-w-md text-sm font-light leading-relaxed text-espresso/75 sm:text-base">
                    {ch.copy}
                  </p>
                  <ul className="mt-8 space-y-2.5">
                    {ch.notes.map((n) => (
                      <li key={n} className="flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-espresso/60">
                        <span className="h-1 w-4" style={{ backgroundColor: ch.accent }} />
                        {n}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/product/${ch.product.slug}`}
                    data-cursor="SHOP"
                    className="mt-10 inline-block border-b border-espresso/40 pb-1 text-[11px] font-medium uppercase tracking-luxe text-espresso transition-colors duration-400 hover:border-gold hover:text-gold"
                  >
                    Explore the Ritual
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
