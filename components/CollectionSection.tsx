"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { CATEGORIES, PRODUCTS } from "@/lib/products";
import { cn } from "@/lib/cn";

export default function CollectionSection() {
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("ALL");

  const filtered = useMemo(
    () => (cat === "ALL" ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat)),
    [cat]
  );

  return (
    <section id="collection" className="relative overflow-hidden bg-ivory py-28 lg:py-40">
      {/* ambient */}
      <div className="pointer-events-none absolute -left-40 top-40 h-[36rem] w-[36rem] rounded-full bg-sand/25 blur-[130px]" />
      <div className="pointer-events-none absolute -right-40 bottom-20 h-[30rem] w-[30rem] rounded-full bg-champagne/20 blur-[130px]" />

      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-12">
        {/* header */}
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
          <div>
            <Reveal>
              <p className="text-[10px] uppercase tracking-[0.5em] text-gold">
                The Collection
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 font-display text-4xl leading-[1.02] sm:text-6xl lg:text-7xl">
                THE AFRIESSENCE
                <br />
                <span className="italic text-cocoa">COLLECTION</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 font-serif text-lg italic text-cocoa/80">
                Seven rituals. One philosophy of radiance.
              </p>
            </Reveal>
          </div>

          {/* category selector */}
          <Reveal delay={0.2}>
            <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Filter by category">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  role="tab"
                  aria-selected={cat === c}
                  onClick={() => setCat(c)}
                  data-cursor="SHOP"
                  className={cn(
                    "relative px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.28em] transition-colors duration-400",
                    cat === c ? "text-ivory" : "text-espresso/60 hover:text-espresso"
                  )}
                >
                  {cat === c && (
                    <motion.span
                      layoutId="cat-pill"
                      className="absolute inset-0 bg-espresso"
                      transition={{ type: "spring", stiffness: 320, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{c}</span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {/* editorial grid */}
        <motion.div layout className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        <Reveal className="mt-20 text-center" delay={0.1}>
          <p className="text-[11px] uppercase tracking-[0.4em] text-cocoa/60">
            Each ritual is handcrafted in small batches in Lagos, Nigeria
          </p>
        </Reveal>
      </div>
    </section>
  );
}
