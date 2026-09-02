"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

const POSTS = [
  {
    id: "post-1",
    img: "/brand-story.jpg",
    tag: "Rituals",
    title: "The Morning Ritual: Why Your Skin Deserves a Ceremony",
    excerpt:
      "Five intentional minutes that turn an ordinary morning into a quiet act of self-respect.",
    date: "August 2026"
  },
  {
    id: "post-2",
    img: "/products/baovera-hair-oil.png",
    tag: "Ingredients",
    title: "Baobab: The Tree of Life, Now in Your Hair Care",
    excerpt:
      "For centuries, the baobab has nourished the continent. Here is what it can do for your strands.",
    date: "July 2026"
  },
  {
    id: "post-3",
    img: "/products/perfume-oil.png",
    tag: "Fragrance",
    title: "Scent as Memory: The Art of the Perfume Oil",
    excerpt:
      "Why concentrated oils — not sprays — are the most intimate way to wear fragrance.",
    date: "June 2026"
  }
];

export default function JournalSection() {
  return (
    <section className="relative bg-ivory py-28 lg:py-40">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <Reveal>
              <p className="text-[10px] uppercase tracking-[0.5em] text-gold">Editorial</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 font-display text-4xl leading-[1.02] sm:text-6xl">
                THE AFRIESSENCE <span className="italic text-cocoa">JOURNAL</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.14}>
            <Link
              href="/journal"
              data-cursor="READ"
              className="group inline-block border-b border-espresso/40 pb-1 text-[11px] font-medium uppercase tracking-luxe text-espresso transition-colors duration-400 hover:border-gold hover:text-gold"
            >
              View All Stories
              <span className="ml-3 inline-block transition-transform duration-400 group-hover:translate-x-2">→</span>
            </Link>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-3">
          {POSTS.map((post, i) => (
            <Reveal key={post.id} delay={0.08 * i}>
              <Link
                href={`/journal#${post.id}`}
                data-cursor="READ"
                className="group block"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-cream">
                  <Image
                    src={post.img}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-all duration-1000 ease-luxe group-hover:scale-[1.08]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-brown/30 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                  <span className="absolute left-5 top-5 bg-ivory/90 px-3.5 py-1.5 text-[9px] uppercase tracking-[0.3em] text-espresso backdrop-blur">
                    {post.tag}
                  </span>
                </div>
                <div className="pt-6">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-cocoa/60">
                    {post.date}
                  </p>
                  <h3 className="mt-3 font-serif text-xl leading-snug text-espresso transition-colors duration-400 group-hover:text-gold">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-[13px] font-light leading-relaxed text-cocoa/75">
                    {post.excerpt}
                  </p>
                  <span className="mt-5 inline-block text-[10px] font-medium uppercase tracking-[0.3em] text-cocoa/80 transition-colors duration-400 group-hover:text-gold">
                    Read the Story →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
