"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Reveal from "@/components/Reveal";

const FLOATING = [
  { src: "/products/baovera-hair-oil.png", alt: "Baovera Hair Oil", pos: "left-[4%] top-[12%] w-36 lg:w-44", delay: 0 },
  { src: "/products/body-butter.png", alt: "Body Butter", pos: "right-[5%] top-[20%] w-32 lg:w-40", delay: 1.2 },
  { src: "/products/perfume-oil.png", alt: "Perfume Oil", pos: "left-[10%] bottom-[14%] w-28 lg:w-36", delay: 2.1 },
  { src: "/products/lush-wood-body-oil.png", alt: "Lush Wood Body Oil", pos: "right-[9%] bottom-[18%] w-32 lg:w-44", delay: 0.6 }
];

const INGREDIENTS = [
  "SHEA BUTTER", "BAOBAB OIL", "MARULA OIL", "HIBISCUS", "COCOA BUTTER",
  "ALOE VERA", "BLACK SOAP", "COCONUT OIL", "SANDALWOOD", "SWEET ALMOND"
];

export default function IngredientsSection() {
  return (
    <section className="relative overflow-hidden bg-deep-brown py-28 text-ivory lg:py-40">
      {/* slow botanical drift */}
      {FLOATING.map((f) => (
        <motion.div
          key={f.src}
          className={`absolute ${f.pos} opacity-[0.16] grayscale-[35%]`}
          animate={{ y: [0, -22, 0], rotate: [0, 3, 0] }}
          transition={{ duration: 11 + f.delay, repeat: Infinity, ease: "easeInOut", delay: f.delay }}
        >
          <Image src={f.src} alt={f.alt} width={320} height={320} className="w-full" />
        </motion.div>
      ))}

      <div className="relative mx-auto max-w-[1600px] px-6 text-center lg:px-12">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.5em] text-champagne">
            The Ingredients
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-6 font-display text-4xl leading-[1.05] sm:text-6xl lg:text-7xl">
            FROM NATURE TO
            <br />
            <span className="italic text-champagne">YOUR RITUAL.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-7 max-w-xl text-sm font-light leading-loose text-ivory/60 sm:text-base">
            Every formula begins with botanicals — pressed, harvested and
            blended with patience. Nothing synthetic. Nothing rushed. Only
            nature, translated into radiance.
          </p>
        </Reveal>
      </div>

      {/* ingredient marquee */}
      <div className="relative mt-20 overflow-hidden border-y border-ivory/10 py-6">
        <motion.div
          className="flex w-max gap-14 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
        >
          {[...INGREDIENTS, ...INGREDIENTS].map((ing, i) => (
            <span key={i} className="flex items-center gap-14">
              <span className="font-display text-xl italic text-ivory/50">{ing}</span>
              <span className="h-1 w-1 rounded-full bg-champagne/60" />
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
