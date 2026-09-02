"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const SHOP_LINKS = ["Lush Wood Body Oil", "Herbal Glow Body Wash", "Baovera Hair Oil", "Body Butter", "Perfume Oil", "Shimmer Oil", "Black Luxe Soap"];

const slugOf = (name: string) => name.toLowerCase().replace(/ /g, "-");

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSubscribed(true);
  };

  return (
    <footer id="contact" className="relative overflow-hidden bg-deep-brown text-ivory">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-gold/10 blur-[120px]" />

      <div className="relative mx-auto max-w-[1600px] px-6 pb-10 pt-20 lg:px-12 lg:pt-28">
        {/* newsletter */}
        <div className="flex flex-col items-start justify-between gap-10 border-b border-ivory/10 pb-16 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <p className="text-[10px] uppercase tracking-[0.5em] text-champagne">Newsletter</p>
            <h3 className="mt-4 font-display text-4xl italic leading-tight sm:text-5xl">
              Join the Radiance
            </h3>
            <p className="mt-4 text-sm font-light leading-relaxed text-ivory/60">
              Discover new rituals, launches and stories from AfriEssence.
            </p>
          </div>
          {subscribed ? (
            <motion.p className="text-sm tracking-wide text-champagne">
              Welcome to the ritual. Your first letter arrives soon.
            </motion.p>
          ) : (
            <form onSubmit={submit} className="flex w-full max-w-md items-end gap-3">
              <div className="flex-1">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full border-b border-ivory/25 bg-transparent py-3 text-sm font-light text-ivory placeholder:text-ivory/35 focus:border-champagne focus:outline-none"
                />
              </div>
              <button
                type="submit"
                data-cursor="JOIN"
                className="whitespace-nowrap border border-champagne/60 px-7 py-3 text-[10px] font-medium uppercase tracking-[0.3em] text-champagne transition-all duration-500 hover:bg-champagne hover:text-deep-brown"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>

        {/* main grid */}
        <div className="grid grid-cols-2 gap-10 py-16 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3">
              <Image src="/icon.svg" alt="AfriEssence radiance mark" width={34} height={34} className="h-8 w-8" />
              <span className="font-display text-2xl tracking-[0.3em]">AFRIESSENCE</span>
            </div>
            <p className="mt-4 text-[10px] uppercase tracking-[0.4em] text-champagne/90">
              Where Beauty Meets Radiance
            </p>
            <p className="mt-6 max-w-sm text-sm font-light leading-relaxed text-ivory/55">
              Thoughtfully crafted beauty rituals inspired by nature and African
              beauty traditions — created to nourish, elevate and reveal your
              natural radiance.
            </p>
            <div className="mt-8 flex items-center gap-6">
              {[
                { label: "Instagram", icon: "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm5 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm5.5-3.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" },
                { label: "TikTok", icon: "M16 3c.3 2.2 1.8 3.9 4 4.2v3c-1.6 0-3-.5-4-1.3v6.4a6.2 6.2 0 1 1-6.2-6.2c.35 0 .7.03 1 .1v3.1a3.1 3.1 0 1 0 2.2 3V3h3Z" },
                { label: "Facebook", icon: "M13.5 21v-8h2.7l.4-3.2h-3.1V7.7c0-.9.3-1.6 1.7-1.6h1.5V3.2c-.3 0-1.2-.1-2.2-.1-2.2 0-3.8 1.4-3.8 3.9v2.8H8v3.2h2.7v8h2.8Z" }
              ].map((s) => (
                <a
                  key={s.label}
                  href="#contact"
                  aria-label={s.label}
                  data-cursor="SHOP"
                  className="text-ivory/50 transition-colors duration-300 hover:text-champagne"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d={s.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-champagne">Shop</p>
            <ul className="mt-6 space-y-3">
              {SHOP_LINKS.slice(0, 4).map((name) => (
                <li key={name}>
                  <Link
                    href={`/product/${slugOf(name)}`}
                    className="text-sm font-light text-ivory/60 transition-colors hover:text-ivory"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-champagne">Company</p>
            <ul className="mt-6 space-y-3">
              {[
                { label: "About", href: "/#about" },
                { label: "Journal", href: "/journal" },
                { label: "Contact", href: "/#contact" },
                { label: "FAQ", href: "/#faq" },
                { label: "Shipping & Returns", href: "/#faq" },
                { label: "Privacy", href: "/#faq" }
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm font-light text-ivory/60 transition-colors hover:text-ivory">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* legal */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-ivory/10 pt-8 sm:flex-row">
          <p className="text-[11px] tracking-wide text-ivory/35">
            © {new Date().getFullYear()} AfriEssence. All rights reserved.
          </p>
          <p className="text-[10px] uppercase tracking-[0.35em] text-ivory/35">
            Handcrafted in Lagos, Nigeria
          </p>
        </div>
      </div>
    </footer>
  );
}

