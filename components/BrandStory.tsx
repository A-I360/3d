"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import Reveal from "@/components/Reveal";

const STATS = [
  { n: "07", l: "Signature rituals" },
  { n: "100%", l: "Natural origin" },
  { n: "01", l: "Philosophy — radiance" }
];

export default function BrandStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const decoY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section id="about" ref={ref} className="relative overflow-hidden bg-ivory py-28 lg:py-40">
      <div className="mx-auto grid max-w-[1600px] items-center gap-16 px-6 lg:grid-cols-2 lg:gap-24 lg:px-12">
        {/* imagery */}
        <div className="relative">
          <motion.div style={{ y: imgY }} className="relative overflow-hidden">
            <div className="aspect-[4/5] overflow-hidden">
              <Image
                src="/brand-story.jpg"
                alt="A woman in warm golden light, eyes closed in a serene AfriEssence beauty ritual"
                width={900}
                height={1125}
                className="h-full w-full scale-110 object-cover"
                priority
              />
            </div>
            {/* layered frame */}
            <div className="pointer-events-none absolute inset-0 border border-espresso/10" />
            <div className="pointer-events-none absolute -bottom-5 -right-5 h-full w-full border border-gold/40" />
          </motion.div>

          {/* floating product */}
          <motion.div
            style={{ y: decoY }}
            className="absolute -bottom-10 -left-6 hidden w-44 sm:block lg:w-52"
          >
            <div className="overflow-hidden border border-ivory/60 bg-cream shadow-luxe">
              <Image
                src="/products/body-butter.png"
                alt="AfriEssence Body Butter"
                width={400}
                height={400}
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mt-2 text-center text-[9px] uppercase tracking-[0.35em] text-cocoa/70">
              Body Butter
            </p>
          </motion.div>

          <span className="absolute -top-8 right-8 font-display text-7xl italic text-sand/60 select-none">
            “R”
          </span>
        </div>

        {/* copy */}
        <div>
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.5em] text-gold">Our Story</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 font-display text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
              ROOTED IN NATURE.
              <br />
              <span className="italic text-cocoa">CRAFTED FOR RADIANCE.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-8 max-w-xl text-sm font-light leading-loose text-cocoa/85 sm:text-base">
              AfriEssence is a modern beauty and wellness house inspired by
              nature and the beauty traditions of Africa. We believe radiance is
              not something you apply — it is something you reveal. Each formula
              unites botanicals harvested with respect, oils pressed with
              patience, and rituals designed for the pace of contemporary life.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <p className="mt-5 max-w-xl text-sm font-light leading-loose text-cocoa/85 sm:text-base">
              From the ancient wisdom of black soap and shea butter to the
              enduring strength of baobab oil, every AfriEssence product is a
              quiet act of reverence — small-batch, handcrafted in Lagos, and
              made to become part of your everyday ceremony.
            </p>
          </Reveal>

          <Reveal delay={0.28}>
            <div className="mt-12 flex gap-10 border-t border-espresso/10 pt-8">
              {STATS.map((s) => (
                <div key={s.l}>
                  <p className="font-display text-3xl text-espresso sm:text-4xl">{s.n}</p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-cocoa/60">
                    {s.l}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.34}>
            <Link
              href="/journal"
              data-cursor="EXPLORE"
              className="group mt-12 inline-block border-b border-espresso/40 pb-1 text-[11px] font-medium uppercase tracking-luxe text-espresso transition-colors duration-400 hover:border-gold hover:text-gold"
            >
              Read the Journal
              <span className="ml-3 inline-block transition-transform duration-400 group-hover:translate-x-2">→</span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
