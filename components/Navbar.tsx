"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { useSite } from "@/lib/site";
import { cn } from "@/lib/cn";

const LINKS = [
  { label: "HOME", href: "/" },
  { label: "SHOP", href: "/shop" },
  { label: "ABOUT", href: "/#about" },
  { label: "JOURNAL", href: "/journal" },
  { label: "CONTACT", href: "/#contact" }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, setOpen } = useCart();
  const { setSearchOpen, loaded } = useSite();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: loaded ? 0 : -80, opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-espresso/10 bg-ivory/70 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <nav className="mx-auto flex h-[76px] max-w-[1600px] items-center justify-between px-6 lg:px-12">
          {/* left: menu (mobile) / links (desktop) */}
          <div className="flex flex-1 items-center">
            <button
              className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span
                className={cn(
                  "block h-px w-6 bg-espresso transition-all duration-400",
                  menuOpen && "translate-y-[3.5px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "block h-px w-6 bg-espresso transition-all duration-400",
                  menuOpen && "-translate-y-[3.5px] -rotate-45"
                )}
              />
            </button>
            <ul className="hidden items-center gap-9 lg:flex">
              {LINKS.slice(0, 3).map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className={cn(
                      "group relative text-[11px] font-medium uppercase tracking-[0.28em] transition-colors duration-300",
                      pathname === l.href ? "text-gold" : "text-espresso/80 hover:text-espresso"
                    )}
                  >
                    {l.label}
                    <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-400 group-hover:scale-x-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* center: logo */}
          <Link href="/" className="flex items-center gap-3" aria-label="AfriEssence home">
            <Image
              src="/icon.svg"
              alt="AfriEssence radiance mark"
              width={30}
              height={30}
              className="h-7 w-7"
              priority
            />
            <span className="font-display text-xl tracking-[0.32em] text-espresso sm:text-[22px]">
              AFRIESSENCE
            </span>
          </Link>

          {/* right: links + actions */}
          <div className="flex flex-1 items-center justify-end gap-2 sm:gap-4">
            <ul className="mr-4 hidden items-center gap-9 lg:flex">
              {LINKS.slice(3).map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className={cn(
                      "group relative text-[11px] font-medium uppercase tracking-[0.28em] transition-colors duration-300",
                      pathname === l.href ? "text-gold" : "text-espresso/80 hover:text-espresso"
                    )}
                  >
                    {l.label}
                    <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-400 group-hover:scale-x-100" />
                  </Link>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setSearchOpen(true)}
              className="flex h-10 w-10 items-center justify-center text-espresso/80 transition-colors hover:text-espresso"
              aria-label="Search products"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" strokeLinecap="round" />
              </svg>
            </button>
            <button
              className="hidden h-10 w-10 items-center justify-center text-espresso/80 transition-colors hover:text-espresso sm:flex"
              aria-label="Account"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c1.5-4 5-5.5 8-5.5s6.5 1.5 8 5.5" strokeLinecap="round" />
              </svg>
            </button>
            <button
              onClick={() => setOpen(true)}
              className="relative flex h-10 w-10 items-center justify-center text-espresso/80 transition-colors hover:text-espresso"
              aria-label={`Shopping bag, ${count} items`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M6 8h12l1 13H5L6 8Z" strokeLinejoin="round" />
                <path d="M9 8V6a3 3 0 0 1 6 0v2" strokeLinecap="round" />
              </svg>
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gold px-1 text-[9px] font-semibold text-deep-brown"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-ivory lg:hidden"
            initial={{ opacity: 0, clipPath: "circle(0% at 12% 6%)" }}
            animate={{ opacity: 1, clipPath: "circle(140% at 12% 6%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 12% 6%)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="flex flex-col items-center gap-7">
              {LINKS.map((l, i) => (
                <motion.li
                  key={l.label}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.6 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-display text-4xl tracking-[0.2em] text-espresso transition-colors hover:text-gold"
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-12 text-[10px] uppercase tracking-[0.4em] text-cocoa/60"
            >
              Where Beauty Meets Radiance
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
