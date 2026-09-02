"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

const ARTICLES = [
  {
    id: "post-1",
    tag: "Rituals",
    date: "August 2026",
    read: "6 min",
    title: "The Morning Ritual: Why Your Skin Deserves a Ceremony",
    dek: "Five intentional minutes that turn an ordinary morning into a quiet act of self-respect.",
    img: "/brand-story.jpg",
    body: [
      "Every morning, before the day begins, there is a small window of silence. In it lives the difference between a routine and a ritual.",
      "A routine is performed. A ritual is entered. The distinction is intention — the breath you take before your hands touch skin, the warmth you bring to the oil between your palms, the slowness you allow yourself in a world that rewards speed.",
      "Begin with warmth. Warm a few drops of body oil between your palms — not to apply it, but to wake it. Oil responds to heat the way skin responds to care: slowly, fully, gratefully.",
      "Massage in circles, outward from the heart. This is not technique; it is attention. Spend thirty seconds on each limb, and notice how the mind follows the hands into stillness.",
      "Then pause. One breath, held and released, before the day claims you. That pause is the ritual. The product is simply its vessel."
    ],
    quote: "A routine is performed. A ritual is entered."
  },
  {
    id: "post-2",
    tag: "Ingredients",
    date: "July 2026",
    read: "5 min",
    title: "Baobab: The Tree of Life, Now in Your Hair Care",
    dek: "For centuries, the baobab has nourished the continent. Here is what it can do for your strands.",
    img: "/products/baovera-hair-oil.png",
    body: [
      "The baobab does not hurry. It grows for a thousand years, stores water in its vast trunk, and offers fruit so nourishing that the ancient trade routes called it the tree of life.",
      "Its seeds yield an oil of extraordinary character — light, fast-absorbing, rich in omega-3, 6 and 9 fatty acids. Where heavier oils sit on the strand, baobab sinks in, softening from within and sealing the cuticle against the day.",
      "For hair that has known heat, colour or the Lagos humidity, baobab is a quiet restoration. A few drops massaged into the scalp wake the follicles; the same drops, worked through the lengths, return the elasticity that styling takes away.",
      "In Baovera Hair Oil, baobab is joined by aloe and rosemary — a trinity that balances, soothes and strengthens. Not a treatment you endure; a ritual you look forward to."
    ],
    quote: "Where heavier oils sit on the strand, baobab sinks in."
  },
  {
    id: "post-3",
    tag: "Fragrance",
    date: "June 2026",
    read: "4 min",
    title: "Scent as Memory: The Art of the Perfume Oil",
    dek: "Why concentrated oils — not sprays — are the most intimate way to wear fragrance.",
    img: "/products/perfume-oil.png",
    body: [
      "Scent is the only sense wired directly into memory. A fragrance is not worn; it is remembered into being — and the way you wear it changes the story it tells.",
      "A spray announces. It fills a room, then fades, leaving a trail of what it was. A perfume oil confides. Applied to the pulse points — wrists, neck, behind the ears — it warms against the skin and unfolds over hours, changing as your body heat changes.",
      "Alcohol-free and concentrated, an oil sits closer to the skin: a scent for the person who steps into your space, not for the room you leave behind.",
      "Apply a single drop. Do not rub — rubbing crushes the top notes. Let it bloom. By midday, the amber deepens; by evening, the woods come forward. The fragrance lives, and so does the memory of the day you wore it."
    ],
    quote: "A spray announces. A perfume oil confides."
  }
];

export default function JournalPage() {
  return (
    <main className="bg-ivory pt-[76px]">
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[70rem] -translate-x-1/2 rounded-full bg-champagne/20 blur-[120px]" />
        <div className="relative mx-auto max-w-[1600px] px-6 text-center lg:px-12">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.55em] text-gold">Editorial</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 font-display text-5xl leading-[1.02] sm:text-7xl">
              THE AFRIESSENCE <span className="italic text-cocoa">JOURNAL</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-7 max-w-xl text-sm font-light leading-loose text-cocoa/80">
              Essays on beauty rituals, natural ingredients and the art of
              everyday radiance.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-4xl space-y-24 px-6 pb-32 lg:px-0">
        {ARTICLES.map((a, i) => (
          <article
            key={a.id}
            id={a.id}
            className="scroll-mt-32 border-t border-espresso/10 pt-16"
          >
            <Reveal>
              <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.35em] text-cocoa/60">
                <span className="bg-espresso px-3 py-1 text-ivory">{a.tag}</span>
                <span>{a.date}</span>
                <span className="h-px flex-1 bg-espresso/10" />
                <span>{a.read} read</span>
              </div>
              <h2 className="mt-6 font-display text-3xl leading-tight sm:text-5xl">
                {a.title}
              </h2>
              <p className="mt-4 font-serif text-lg italic text-cocoa/80">{a.dek}</p>
            </Reveal>

            <Reveal delay={0.1} className="mt-10">
              <div className="aspect-[16/9] overflow-hidden bg-cream">
                <Image
                  src={a.img}
                  alt={a.title}
                  width={1280}
                  height={720}
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-10 space-y-6">
                {a.body.slice(0, 2).map((p, j) => (
                  <p key={j} className="text-[15px] font-light leading-loose text-cocoa/85">
                    {p}
                  </p>
                ))}
                <blockquote className="border-l-2 border-gold py-2 pl-6 font-display text-2xl italic text-espresso sm:text-3xl">
                  “{a.quote}”
                </blockquote>
                {a.body.slice(2).map((p, j) => (
                  <p key={j} className="text-[15px] font-light leading-loose text-cocoa/85">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-12 flex items-center justify-between border-t border-espresso/10 pt-6">
                <p className="text-[10px] uppercase tracking-[0.3em] text-cocoa/50">
                  AfriEssence Journal · {a.tag}
                </p>
                <Link
                  href="/shop"
                  className="text-[10px] font-medium uppercase tracking-[0.3em] text-espresso underline-offset-4 hover:text-gold hover:underline"
                >
                  Shop the Collection →
                </Link>
              </div>
            </Reveal>
          </article>
        ))}
      </div>
    </main>
  );
}
