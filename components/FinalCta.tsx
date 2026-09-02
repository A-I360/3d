"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-noir py-32 text-center text-ivory lg:py-44">
      {/* animated light — CSS keyframes */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 animate-glow rounded-full"
        style={{
          animationDuration: "9s",
          background: "radial-gradient(circle, rgba(201,174,126,0.55), transparent 60%)"
        }}
      />
      {/* drifting particles — pure CSS, compositor-driven */}
      {Array.from({ length: 14 }).map((_, i) => (
        <span
          key={i}
          className="absolute h-1 w-1 animate-particle rounded-full bg-champagne/50"
          style={{
            left: `${(i * 37) % 100}%`,
            top: `${(i * 53) % 100}%`,
            animationDuration: `${6 + (i % 5)}s`,
            animationDelay: `${i * 0.7}s`
          }}
        />
      ))}

      <div className="relative mx-auto max-w-4xl px-6">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.55em] text-champagne">
            Begin the Ritual
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-7 font-display text-5xl leading-[1.02] sm:text-7xl lg:text-8xl">
            YOUR RADIANCE
            <br />
            <span className="italic text-champagne">STARTS HERE.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="mx-auto mt-8 max-w-xl text-sm font-light leading-loose text-ivory/60 sm:text-base">
            Discover beauty rituals designed to nourish, care, fragrance and
            illuminate your everyday routine.
          </p>
        </Reveal>
        <Reveal delay={0.26}>
          <Link
            href="/shop"
            data-cursor="SHOP"
            className="group relative mt-12 inline-block overflow-hidden bg-champagne px-14 py-5 text-[11px] font-medium uppercase tracking-luxe text-deep-brown transition-colors duration-500 hover:bg-ivory"
          >
            Shop AfriEssence
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
