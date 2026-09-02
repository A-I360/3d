"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSite } from "@/lib/site";
import { CATEGORIES, formatNGN, PRODUCTS } from "@/lib/products";

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useSite();
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      setQ("");
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setSearchOpen]);

  const results = q.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(q.toLowerCase()) ||
          p.category.toLowerCase().includes(q.toLowerCase())
      )
    : PRODUCTS;

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          className="fixed inset-0 z-[95] flex flex-col bg-ivory"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          role="dialog"
          aria-label="Search"
        >
          <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-6 pt-28">
            <div className="flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-[0.5em] text-cocoa/70">
                Search the Collection
              </p>
              <button
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
                className="flex h-10 w-10 items-center justify-center text-espresso/60 transition-colors hover:text-espresso"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="mt-8 border-b border-espresso/20 pb-4">
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search products, rituals, ingredients…"
                className="w-full bg-transparent font-display text-2xl font-light text-espresso placeholder:text-espresso/30 focus:outline-none sm:text-4xl"
                aria-label="Search products"
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setQ(c === "ALL" ? "" : c)}
                  className="border border-espresso/15 px-4 py-1.5 text-[10px] uppercase tracking-[0.25em] text-cocoa/80 transition-all hover:border-espresso hover:bg-espresso hover:text-ivory"
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="mt-8 flex-1 overflow-y-auto pb-24">
              {results.length === 0 ? (
                <p className="py-16 text-center font-serif text-lg italic text-cocoa/60">
                  Nothing found for “{q}” — try another ritual.
                </p>
              ) : (
                <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {results.map((p, i) => (
                    <motion.li
                      key={p.slug}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.5 }}
                    >
                      <Link
                        href={`/product/${p.slug}`}
                        onClick={() => setSearchOpen(false)}
                        className="group flex items-center gap-5 border border-transparent p-3 transition-all duration-400 hover:border-espresso/10 hover:bg-cream/60"
                      >
                        <div className="h-20 w-16 shrink-0 overflow-hidden bg-cream">
                          <Image
                            src={p.image}
                            alt={p.name}
                            width={128}
                            height={128}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-serif text-base text-espresso">{p.name}</p>
                          <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-cocoa/60">
                            {p.category}
                          </p>
                        </div>
                        <p className="font-serif text-sm text-espresso/80">{formatNGN(p.price)}</p>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
