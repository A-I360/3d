import type { Metadata } from "next";
import CollectionSection from "@/components/CollectionSection";
import FinalCta from "@/components/FinalCta";
import Reveal from "@/components/Reveal";

export default function ShopPage() {
  return (
    <main className="bg-ivory pt-[76px]">
      {/* shop hero */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[70rem] -translate-x-1/2 rounded-full bg-champagne/20 blur-[120px]" />
        <div className="relative mx-auto max-w-[1600px] px-6 text-center lg:px-12">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.55em] text-gold">
              The AfriEssence Collection
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 font-display text-5xl leading-[1.02] sm:text-7xl lg:text-8xl">
              SHOP THE <span className="italic text-cocoa">RITUALS</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-7 max-w-xl text-sm font-light leading-loose text-cocoa/80 sm:text-base">
              Seven rituals. One philosophy of radiance. Each product is
              handcrafted in small batches — when it is gone, it is gone until
              the next batch is ready.
            </p>
          </Reveal>
        </div>
      </section>

      <CollectionSection />
      <FinalCta />
    </main>
  );
}

export const metadata: Metadata = {
  title: "Shop — AFRIESSENCE"
};
