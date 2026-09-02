"use client";

import Reveal from "@/components/Reveal";

const PILLARS = [
  { n: "01", t: "Skin", d: "Nourished, softened, deeply cared for — the canvas of your radiance." },
  { n: "02", t: "Hair", d: "Scalp and strand rituals that restore strength, shine and life." },
  { n: "03", t: "Cleansing", d: "Gentle, botanical purification that respects the skin's natural balance." },
  { n: "04", t: "Fragrance", d: "Scent as memory — intimate oils that unfold slowly on the skin." },
  { n: "05", t: "Radiance", d: "A luminous finish that catches the light, wherever you go." },
  { n: "06", t: "Self-Care", d: "The pause, the intention, the moment that is entirely yours." }
];

export default function RitualSection() {
  return (
    <section className="relative overflow-hidden bg-cream py-28 lg:py-40">
      <div className="pointer-events-none absolute right-[-10%] top-[-10%] h-[34rem] w-[34rem] rounded-full bg-sand/30 blur-[120px]" />

      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.5em] text-gold">The Philosophy</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 font-display text-4xl leading-[1.05] sm:text-6xl lg:text-7xl">
              BEAUTY IS <span className="italic text-cocoa">A RITUAL.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-7 text-sm font-light leading-loose text-cocoa/85 sm:text-base">
              Beauty is not simply about products. It is about creating elevated
              everyday rituals — small ceremonies of care that turn routine into
              meaning, and skin into radiance.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-px overflow-hidden border border-espresso/10 bg-espresso/10 sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal key={p.n} delay={0.05 * i} className="h-full">
              <div
                data-cursor="EXPLORE"
                className="group relative h-full bg-cream p-9 transition-colors duration-500 hover:bg-ivory sm:p-11"
              >
                <div className="flex items-start justify-between">
                  <span className="font-display text-sm italic text-gold">{p.n}</span>
                  <span className="h-px w-10 bg-espresso/20 transition-all duration-500 group-hover:w-16 group-hover:bg-gold" />
                </div>
                <h3 className="mt-8 font-display text-3xl text-espresso transition-colors duration-500 group-hover:text-gold">
                  {p.t}
                </h3>
                <p className="mt-4 text-[13px] font-light leading-relaxed text-cocoa/75">
                  {p.d}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
