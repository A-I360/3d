"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Reveal from "@/components/Reveal";

const FAQS = [
  {
    q: "Where is AfriEssence made?",
    a: "Every AfriEssence product is handcrafted in small batches in Lagos, Nigeria — blended, poured and finished by hand, using botanicals sourced with care."
  },
  {
    q: "What are your shipping times and costs?",
    a: "Delivery within Lagos takes 1–2 business days, across Nigeria 2–5 business days, and international orders 7–14 business days. Shipping is complimentary on all orders — no thresholds, no surprises."
  },
  {
    q: "What is your returns policy?",
    a: "We want every ritual to feel right. If a product does not suit you, return it within 14 days of delivery, unopened and unused, for a full refund. Email us at care@afriessence.com to begin."
  },
  {
    q: "Are your products natural and cruelty-free?",
    a: "Yes. AfriEssence formulas are built on natural botanicals, are vegan, and are never tested on animals. We avoid parabens, sulphates and synthetic colourants."
  }
];

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-cream py-28 lg:py-36">
      <div className="mx-auto max-w-4xl px-6 lg:px-12">
        <Reveal className="text-center">
          <p className="text-[10px] uppercase tracking-[0.5em] text-gold">Questions</p>
          <h2 className="mt-5 font-display text-4xl sm:text-5xl">
            FREQUENTLY <span className="italic text-cocoa">ASKED</span>
          </h2>
        </Reveal>

        <div className="mt-14 divide-y divide-espresso/10 border-y border-espresso/10">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  data-cursor="EXPLORE"
                >
                  <span className={`font-serif text-lg transition-colors duration-300 ${isOpen ? "text-gold" : "text-espresso"}`}>
                    {f.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-espresso/20 text-lg text-espresso"
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
                      <p className="max-w-2xl pb-7 text-sm font-light leading-relaxed text-cocoa/80">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <Reveal className="mt-10 text-center">
          <p className="text-sm font-light text-cocoa/70">
            Still curious? Write to us —{" "}
            <a href="mailto:care@afriessence.com" className="text-gold underline-offset-4 hover:underline">
              care@afriessence.com
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
