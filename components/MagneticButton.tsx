"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/cn";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "outline" | "light" | "ghost";
  className?: string;
  type?: "button" | "submit";
  strength?: number;
}

export default function MagneticButton({
  children,
  href,
  onClick,
  variant = "solid",
  className,
  type = "button",
  strength = 0.35
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 16, mass: 0.4 });

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const base = cn(
    "group relative inline-flex items-center justify-center gap-3 overflow-hidden px-9 py-4 text-[11px] font-medium uppercase tracking-luxe transition-colors duration-500 select-none",
    variant === "solid" &&
      "bg-espresso text-ivory hover:bg-deep-brown",
    variant === "outline" &&
      "border border-espresso/40 text-espresso hover:border-espresso hover:bg-espresso hover:text-ivory",
    variant === "light" &&
      "bg-ivory text-espresso hover:bg-champagne hover:text-deep-brown",
    variant === "ghost" &&
      "border-b border-espresso/30 px-1 py-2 text-espresso hover:border-gold hover:text-gold",
    className
  );

  const inner = (
    <>
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
      <span className="relative z-10 inline-flex items-center gap-3">{children}</span>
    </>
  );

  const motionProps = {
    style: { x: sx, y: sy },
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    whileTap: { scale: 0.97 },
    "data-cursor": "tap"
  };

  return (
    <motion.div ref={ref} {...motionProps} className="inline-block">
      {href ? (
        <Link href={href} onClick={onClick} className={base} data-magnetic>
          {inner}
        </Link>
      ) : (
        <button type={type} onClick={onClick} className={base} data-magnetic>
          {inner}
        </button>
      )}
    </motion.div>
  );
}
