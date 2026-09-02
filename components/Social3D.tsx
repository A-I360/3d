"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/* ---------- icons ---------- */
export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" />
      <circle cx="12" cy="12" r="4.1" />
      <circle cx="17.3" cy="6.7" r="1.15" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2.4a9.6 9.6 0 0 0-8.3 14.5L2.4 21.6l4.9-1.3A9.6 9.6 0 1 0 12 2.4Zm0 1.9a7.7 7.7 0 1 1-3.9 14.3l-.5-.3-2.9.8.8-2.8-.3-.5A7.7 7.7 0 0 1 12 4.3Zm-3 3.7c-.2 0-.5 0-.7.3-.2.3-.9.9-.9 2.1s.9 2.4 1 2.6c.2.3 1.8 2.8 4.5 3.9 2.1.9 2.6.7 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.3-.2-.6-.3l-2-1c-.3-.1-.5-.2-.7.1l-1 1.2c-.2.2-.3.3-.6.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4 0-.5.1-.7l.5-.6c.2-.2.2-.4.3-.6.1-.2 0-.4 0-.5l-.9-2.2c-.2-.5-.4-.4-.6-.4Z" />
    </svg>
  );
}

export function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M16.6 3c.4 2.1 1.9 3.8 4 4.2v3.1c-1.5 0-2.9-.5-4-1.3v6.5a6.3 6.3 0 1 1-6.3-6.3c.35 0 .7 0 1 .1v3.2a3.1 3.1 0 1 0 2.2 3V3h3.1Z" />
    </svg>
  );
}

export function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M6.6 3c-.5 0-1 .2-1.3.5l-1.6 1.6c-.7.7-.9 1.8-.5 2.7 2.3 5.6 6.5 9.8 12.1 12.1.9.4 2 .2 2.7-.5l1.6-1.6c.6-.6.6-1.6 0-2.2l-2.4-2.4c-.6-.6-1.6-.6-2.2 0l-.9.9c-2.2-.9-4.3-2.9-5.2-5.2l.9-.9c.6-.6.6-1.6 0-2.2L8.9 3.5C8.6 3.2 8.1 3 7.6 3h-1Z" />
    </svg>
  );
}

/* ---------- data ---------- */
export interface SocialItem {
  id: string;
  handle: string;
  href: string;
  aria: string;
  icon: ReactNode;
}

export const SOCIAL_LINKS: SocialItem[] = [
  {
    id: "instagram",
    handle: "@afri.essence__",
    href: "https://www.instagram.com/afri.essence__",
    aria: "AfriEssence on Instagram — @afri.essence__",
    icon: <InstagramIcon />
  },
  {
    id: "whatsapp",
    handle: "0816 290 3238",
    href: "https://wa.me/2348162903238?text=Hello%20AfriEssence",
    aria: "Message AfriEssence on WhatsApp — 08162903238",
    icon: <WhatsAppIcon />
  },
  {
    id: "tiktok",
    handle: "@afriessenceholistics",
    href: "https://www.tiktok.com/@afriessenceholistics",
    aria: "AfriEssence on TikTok — @afriessenceholistics",
    icon: <TikTokIcon />
  }
];

/* ---------- 3D tilt button ---------- */
export default function SocialButton3D({
  item,
  size = "dock"
}: {
  item: SocialItem;
  size?: "dock" | "compact";
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 170, damping: 18 });
  const sry = useSpring(ry, { stiffness: 170, damping: 18 });

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 18);
    rx.set(-py * 16);
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  const dim = size === "dock" ? "h-14 w-14" : "h-12 w-12";
  const iconCls = size === "dock" ? "h-5 w-5" : "h-[18px] w-[18px]";
  const showPill = size === "dock";

  return (
    <motion.a
      ref={ref}
      href={item.href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={item.aria}
      data-cursor="OPEN"
      onMouseMove={onMove}
      onMouseLeave={reset}
      whileTap={{ scale: 0.94 }}
      className="group relative block"
      style={{ perspective: 700 }}
    >
      <motion.div
        className="relative h-14 w-14"
        style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
      >
        {/* pedestal — pushes the button off the surface */}
        <span
          aria-hidden
          className={cn("absolute right-0 top-0 rounded-full bg-deep-brown/90", dim)}
          style={{
            transform: "translateZ(-16px)",
            boxShadow: "0 24px 34px -14px rgba(23,16,11,0.55)"
          }}
        />

        {/* handle pill — slides out on hover */}
        {showPill && (
          <span
            className="absolute right-0 top-0 z-0 flex h-14 items-center overflow-hidden rounded-full border border-ivory/10 bg-deep-brown/95 pl-5 pr-[74px] text-ivory opacity-0 shadow-luxe-sm transition-all duration-500 ease-luxe group-hover:translate-x-0 group-hover:opacity-100"
            style={{ transform: "translateX(14px)" }}
          >
            <span className="whitespace-nowrap text-[10px] tracking-wider text-ivory/90">
              {item.handle}
            </span>
          </span>
        )}

        {/* icon plate — floats above the pedestal */}
        <span
          className={cn(
            "relative z-10 flex items-center justify-center rounded-full border border-gold/50 bg-gradient-to-b from-ivory to-cream text-espresso transition-colors duration-500 group-hover:border-gold",
            dim
          )}
          style={{
            transform: "translateZ(12px)",
            boxShadow: "0 16px 30px -12px rgba(36,24,18,0.5)"
          }}
        >
          <span className={cn("transition-transform duration-500 group-hover:scale-110", iconCls)}>
            {item.icon}
          </span>
          {/* glow */}
          <span className="absolute inset-0 rounded-full bg-gold/0 transition-colors duration-500 group-hover:bg-gold/15" />
          {/* shine sweep */}
          <span className="pointer-events-none absolute inset-0 -translate-x-[130%] rounded-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[130%]" />
        </span>
      </motion.div>
    </motion.a>
  );
}
