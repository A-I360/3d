"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Mounts children only once they are near the viewport, so below-the-fold
 * canvases and heavy DOM are not built until the user scrolls toward them.
 */
export default function ViewportGate({
  children,
  rootMargin = "240px",
  className
}: {
  children: ReactNode;
  rootMargin?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShow(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={className}>
      {show ? children : null}
    </div>
  );
}
