"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { formatNGN, getProduct } from "@/lib/products";

export default function CartDrawer() {
  const { lines, open, setOpen, setQty, remove, subtotal, count } = useCart();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[80] bg-deep-brown/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            className="fixed right-0 top-0 z-[90] flex h-full w-full max-w-md flex-col bg-ivory shadow-luxe"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-label="Shopping bag"
          >
            <div className="flex items-center justify-between border-b border-espresso/10 px-7 py-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.4em] text-cocoa/70">
                  Your Bag
                </p>
                <p className="mt-1 font-display text-2xl text-espresso">
                  {count} {count === 1 ? "Item" : "Items"}
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close bag"
                className="flex h-10 w-10 items-center justify-center text-espresso/60 transition-colors hover:text-espresso"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-7 py-6">
              {lines.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="h-14 w-14 rounded-full border border-espresso/15" />
                  <p className="mt-6 font-display text-xl italic text-espresso/80">
                    Your bag is empty
                  </p>
                  <p className="mt-2 max-w-[220px] text-xs font-light text-cocoa/70">
                    Begin your ritual — discover the AfriEssence collection.
                  </p>
                  <Link
                    href="/shop"
                    onClick={() => setOpen(false)}
                    className="mt-8 bg-espresso px-8 py-3.5 text-[10px] font-medium uppercase tracking-luxe text-ivory transition-colors hover:bg-deep-brown"
                  >
                    Shop the Collection
                  </Link>
                </div>
              ) : (
                <ul className="space-y-6">
                  <AnimatePresence initial={false}>
                    {lines.map((l) => {
                      const p = getProduct(l.slug);
                      if (!p) return null;
                      return (
                        <motion.li
                          key={l.slug}
                          layout
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: 40 }}
                          className="flex gap-5"
                        >
                          <Link
                            href={`/product/${p.slug}`}
                            onClick={() => setOpen(false)}
                            className="block h-24 w-20 shrink-0 overflow-hidden bg-cream"
                          >
                            <Image
                              src={p.image}
                              alt={p.name}
                              width={160}
                              height={160}
                              className="h-full w-full object-cover"
                            />
                          </Link>
                          <div className="flex flex-1 flex-col">
                            <div className="flex items-start justify-between gap-3">
                              <Link
                                href={`/product/${p.slug}`}
                                onClick={() => setOpen(false)}
                                className="font-serif text-sm text-espresso hover:text-gold"
                              >
                                {p.name}
                              </Link>
                              <button
                                onClick={() => remove(p.slug)}
                                aria-label={`Remove ${p.name}`}
                                className="text-espresso/40 transition-colors hover:text-espresso"
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                                </svg>
                              </button>
                            </div>
                            <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-cocoa/60">
                              {p.category} · {p.size}
                            </p>
                            <div className="mt-auto flex items-center justify-between pt-2">
                              <div className="flex items-center border border-espresso/15">
                                <button
                                  onClick={() => setQty(p.slug, l.qty - 1)}
                                  className="flex h-8 w-8 items-center justify-center text-sm text-espresso/70 transition-colors hover:bg-espresso hover:text-ivory"
                                  aria-label="Decrease quantity"
                                >
                                  −
                                </button>
                                <span className="w-8 text-center text-xs text-espresso">
                                  {l.qty}
                                </span>
                                <button
                                  onClick={() => setQty(p.slug, l.qty + 1)}
                                  className="flex h-8 w-8 items-center justify-center text-sm text-espresso/70 transition-colors hover:bg-espresso hover:text-ivory"
                                  aria-label="Increase quantity"
                                >
                                  +
                                </button>
                              </div>
                              <p className="font-serif text-sm text-espresso">
                                {formatNGN(p.price * l.qty)}
                              </p>
                            </div>
                          </div>
                        </motion.li>
                      );
                    })}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {lines.length > 0 && (
              <div className="border-t border-espresso/10 px-7 py-6">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-cocoa/70">
                    Subtotal
                  </p>
                  <p className="font-display text-xl text-espresso">{formatNGN(subtotal)}</p>
                </div>
                <p className="mt-1 text-right text-[11px] font-light text-cocoa/60">
                  Complimentary shipping · Taxes included
                </p>
                <Link
                  href="/checkout"
                  onClick={() => setOpen(false)}
                  data-cursor="SHOP"
                  className="mt-5 flex w-full items-center justify-center gap-3 bg-espresso py-4 text-[11px] font-medium uppercase tracking-luxe text-ivory transition-colors duration-500 hover:bg-deep-brown"
                >
                  Proceed to Checkout
                </Link>
                <button
                  onClick={() => setOpen(false)}
                  className="mt-3 w-full py-2 text-center text-[11px] uppercase tracking-[0.3em] text-cocoa/70 transition-colors hover:text-espresso"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
