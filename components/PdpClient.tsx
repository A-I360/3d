"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Scene from "@/components/Scene";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { useCart } from "@/lib/cart";
import { formatNGN, PRODUCTS, type Product } from "@/lib/products";
import { useLowPower } from "@/lib/useLowPower";
import { cn } from "@/lib/cn";

const SECTIONS = ["BENEFITS", "INGREDIENTS", "HOW TO USE", "DETAILS"] as const;
type Section = (typeof SECTIONS)[number];

const fadeMask = {
  WebkitMaskImage:
    "radial-gradient(115% 115% at 50% 50%, #000 55%, transparent 78%)",
  maskImage: "radial-gradient(115% 115% at 50% 50%, #000 55%, transparent 78%)"
};

export default function PdpClient({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const [openSection, setOpenSection] = useState<Section | null>("BENEFITS");
  const [autoRotate, setAutoRotate] = useState(true);
  const [env, setEnv] = useState<"ivory" | "noir">("ivory");
  const [ready, setReady] = useState(false);
  const lowPower = useLowPower();
  const { add } = useCart();
  const router = useRouter();
  const dark = !!product.theme.dark;

  useEffect(() => setReady(false), [product.slug]);

  const related = PRODUCTS.filter((p) => p.slug !== product.slug)
    .sort((a, b) =>
      (a.category === product.category ? 0 : 1) - (b.category === product.category ? 0 : 1)
    )
    .slice(0, 3);

  const content = (s: Section) => {
    switch (s) {
      case "BENEFITS":
        return product.benefits;
      case "INGREDIENTS":
        return product.ingredients;
      case "HOW TO USE":
        return product.howToUse;
      case "DETAILS":
        return product.details;
    }
  };

  return (
    <main className="bg-ivory pt-[76px]">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        {/* breadcrumb */}
        <nav className="pt-8 text-[10px] uppercase tracking-[0.3em] text-cocoa/60" aria-label="Breadcrumb">
          <Link href="/" className="transition-colors hover:text-espresso">Home</Link>
          <span className="mx-3">/</span>
          <Link href="/shop" className="transition-colors hover:text-espresso">Shop</Link>
          <span className="mx-3">/</span>
          <span className="text-gold">{product.name}</span>
        </nav>

        <div className="mt-6 grid grid-cols-1 gap-12 pb-24 lg:grid-cols-2 lg:gap-20">
          {/* ---- interactive 3D viewer ---- */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Reveal>
              <div
                className={cn(
                  "relative overflow-hidden",
                  env === "ivory" ? "bg-cream" : "bg-noir"
                )}
                style={{
                  background:
                    env === "ivory"
                      ? "radial-gradient(80% 60% at 50% 42%, #FBF7F0, #EFE6D8)"
                      : "radial-gradient(80% 60% at 50% 42%, #2A1D14, #17100B)"
                }}
              >
                <div className="relative aspect-[4/5]">
                  {/* instant static fallback */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{ opacity: ready ? 0 : 1 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                      style={fadeMask}
                    />
                  </motion.div>

                  {/* WebGL viewer */}
                  <div
                    className="absolute inset-0 transition-opacity duration-700"
                    style={{ opacity: ready ? 1 : 0 }}
                  >
                    <Scene
                      model={product.model}
                      sparkles={product.slug === "shimmer-oil" && !lowPower}
                      autoRotate={autoRotate}
                      interactive
                      lowPower={lowPower}
                      cameraZ={4.6}
                      onReady={() => setReady(true)}
                    />
                  </div>
                </div>

                {/* viewer controls */}
                <div className="absolute bottom-5 left-5 flex items-center gap-2">
                  <button
                    onClick={() => setAutoRotate((v) => !v)}
                    className={cn(
                      "border px-4 py-2 text-[9px] uppercase tracking-[0.25em] backdrop-blur transition-colors",
                      autoRotate
                        ? "border-espresso/30 bg-espresso/80 text-ivory"
                        : "border-espresso/20 bg-ivory/70 text-espresso"
                    )}
                  >
                    ⟳ Auto
                  </button>
                  <button
                    onClick={() => setEnv((v) => (v === "ivory" ? "noir" : "ivory"))}
                    className={cn(
                      "border px-4 py-2 text-[9px] uppercase tracking-[0.25em] backdrop-blur transition-colors",
                      env === "noir"
                        ? "border-champagne/40 bg-noir/80 text-champagne"
                        : "border-espresso/20 bg-ivory/70 text-espresso"
                    )}
                  >
                    {env === "ivory" ? "Dark Studio" : "Ivory Studio"}
                  </button>
                </div>
                <p className="absolute bottom-5 right-5 hidden text-[9px] uppercase tracking-[0.25em] text-espresso/50 sm:block">
                  Drag to rotate · Scroll to zoom
                </p>
              </div>
            </Reveal>
          </div>

          {/* ---- info ---- */}
          <div className="max-w-xl">
            <Reveal>
              <p className="text-[10px] uppercase tracking-[0.45em] text-gold">
                {product.category} · {product.size}
              </p>
              <h1 className="mt-4 font-display text-4xl leading-[1.05] sm:text-6xl">
                {product.name}
              </h1>
              <p className="mt-4 font-serif text-2xl text-espresso">{formatNGN(product.price)}</p>
              <p className="mt-6 text-sm font-light leading-loose text-cocoa/85">
                {product.description}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              {/* quantity + actions */}
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <div className="flex items-center border border-espresso/20">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="flex h-14 w-12 items-center justify-center text-lg text-espresso/70 transition-colors hover:bg-espresso hover:text-ivory"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="w-10 text-center font-serif text-lg text-espresso">{qty}</span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="flex h-14 w-12 items-center justify-center text-lg text-espresso/70 transition-colors hover:bg-espresso hover:text-ivory"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => add(product, qty)}
                  data-cursor="SHOP"
                  className="group relative flex-1 overflow-hidden bg-espresso px-8 py-4 text-[11px] font-medium uppercase tracking-luxe text-ivory transition-colors duration-500 hover:bg-deep-brown"
                >
                  <span className="relative z-10">Add to Bag</span>
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </button>
                <button
                  onClick={() => {
                    add(product, qty);
                    router.push("/checkout");
                  }}
                  className="flex-1 border border-espresso/30 px-8 py-4 text-[11px] font-medium uppercase tracking-luxe text-espresso transition-all duration-500 hover:border-espresso hover:bg-espresso hover:text-ivory"
                >
                  Buy Now
                </button>
              </div>
              <p className="mt-4 text-[11px] font-light text-cocoa/60">
                Complimentary shipping · Handcrafted in small batches in Lagos
              </p>
            </Reveal>

            {/* expandable sections */}
            <Reveal delay={0.16}>
              <div className="mt-12 divide-y divide-espresso/10 border-y border-espresso/10">
                {SECTIONS.map((s) => {
                  const isOpen = openSection === s;
                  const items = content(s);
                  return (
                    <div key={s}>
                      <button
                        onClick={() => setOpenSection(isOpen ? null : s)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between py-5 text-left"
                        data-cursor="EXPLORE"
                      >
                        <span className={cn("text-[11px] font-medium uppercase tracking-[0.35em]", isOpen ? "text-gold" : "text-espresso")}>
                          {s}
                        </span>
                        <motion.span
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          transition={{ duration: 0.4 }}
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-espresso/15 text-base text-espresso"
                        >
                          +
                        </motion.span>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <ul className="space-y-3 pb-6">
                              {items.map((item, i) => (
                                <li key={item} className="flex items-start gap-3 text-sm font-light leading-relaxed text-cocoa/85">
                                  <span className="mt-2 h-1 w-3 shrink-0 bg-gold" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </Reveal>

            {/* trust row */}
            <Reveal delay={0.2}>
              <div className="mt-10 grid grid-cols-3 gap-4 border border-espresso/10 p-6">
                {[
                  { t: "Natural", d: "Botanical formulas" },
                  { t: "Vegan", d: "Cruelty-free, always" },
                  { t: "Small Batch", d: "Handcrafted in Lagos" }
                ].map((x) => (
                  <div key={x.t} className="text-center">
                    <p className="font-display text-lg text-espresso">{x.t}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-cocoa/60">{x.d}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        {/* related */}
        <div className="border-t border-espresso/10 py-20">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-3xl sm:text-4xl">
              COMPLETE THE <span className="italic text-cocoa">RITUAL</span>
            </h2>
            <Link
              href="/shop"
              className="hidden border-b border-espresso/40 pb-1 text-[11px] font-medium uppercase tracking-luxe text-espresso transition-colors hover:border-gold hover:text-gold sm:block"
            >
              View All
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
