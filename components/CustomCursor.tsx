"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Elegant circular cursor for desktop (pointer: fine) only.
 * Expands and shows a label over interactive elements via [data-cursor].
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState("");
  const [hovering, setHovering] = useState(false);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const rx = useSpring(mx, { stiffness: 400, damping: 38, mass: 0.6 });
  const ry = useSpring(my, { stiffness: 400, damping: 38, mass: 0.6 });
  const dx = useSpring(mx, { stiffness: 900, damping: 60, mass: 0.3 });
  const dy = useSpring(my, { stiffness: 900, damping: 60, mass: 0.3 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      setVisible(true);
      const t = e.target as HTMLElement;
      const labelled = t.closest("[data-cursor]") as HTMLElement | null;
      if (labelled?.dataset.cursor) {
        setLabel(labelled.dataset.cursor.toUpperCase());
        setHovering(true);
      } else if (t.closest("a, button, input, [role='button']")) {
        setLabel("");
        setHovering(true);
      } else {
        setLabel("");
        setHovering(false);
      }
    };
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [mx, my]);

  if (!enabled) return null;

  return (
    <>
      {/* trailing ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[120] hidden items-center justify-center rounded-full border border-gold/70 lg:flex"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering && label ? 84 : hovering ? 52 : 32,
          height: hovering && label ? 84 : hovering ? 52 : 32,
          opacity: visible ? 1 : 0,
          backgroundColor: hovering ? "rgba(176,141,87,0.12)" : "rgba(176,141,87,0)"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      >
        <span
          className="text-[9px] font-medium uppercase tracking-[0.25em] text-espresso"
          style={{ opacity: label ? 1 : 0 }}
        >
          {label}
        </span>
      </motion.div>
      {/* precise dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[120] h-1.5 w-1.5 rounded-full bg-gold"
        style={{ x: dx, y: dy, translateX: "-50%", translateY: "-50%", opacity: visible ? 1 : 0 }}
      />
    </>
  );
}
