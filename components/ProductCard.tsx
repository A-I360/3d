"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type MouseEvent } from "react";
import { useCart } from "@/lib/cart";
import { formatNGN, type Product } from "@/lib/products";
import { cn } from "@/lib/cn";

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { add } = useCart();
  const dark = !!product.theme.dark;

  /* transform springs — mousemove never re-renders React */
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 18 });
  const sry = useSpring(ry, { stiffness: 200, damping: 18 });
  const lift = useSpring(0, { stiffness: 260, damping: 24 });
  const ix = useSpring(0, { stiffness: 130, damping: 18 });
  const iy = useSpring(0, { stiffness: 130, damping: 18 });
  const izoom = useSpring(1, { stiffness: 220, damping: 24 });

  const [hover, setHover] = useState(false);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    rx.set(-py * 8);
    ry.set(px * 10);
    ix.set(px * 14);
    iy.set(py * 10);
  };

  const onEnter = () => {
    setHover(true);
    lift.set(-10);
    izoom.set(1.08);
  };

  const onLeave = () => {
    setHover(false);
    rx.set(0);
    ry.set(0);
    ix.set(0);
    iy.set(0);
    lift.set(0);
    izoom.set(1);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92, y: 24 }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1000 }}
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        data-cursor="SHOP"
        className="group relative transition-[box-shadow] duration-500 ease-luxe"
        style={{
          boxShadow: hover
            ? "0 42px 80px -24px rgba(36,24,18,0.45)"
            : "0 18px 40px -18px rgba(36,24,18,0.22)"
        }}
      >
        <motion.div
          style={{ rotateX: srx, rotateY: sry, y: lift, transformStyle: "preserve-3d" }}
        >
          <div
            className={cn(
              "relative aspect-[4/5] overflow-hidden",
              dark ? "bg-[#1d1510]" : "bg-cream"
            )}
          >
            {/* backdrop tint */}
            <div
              className="absolute inset-0 transition-transform duration-700"
              style={{
                background: `radial-gradient(80% 60% at 50% 40%, ${product.theme.bg}, transparent 75%)`,
                transform: hover ? "scale(1.08)" : "scale(1)"
              }}
            />
            {/* image moves independently — spring-driven, no re-render */}
            <motion.div className="absolute inset-0" style={{ x: ix, y: iy, scale: izoom }}>
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
            </motion.div>

            {/* number */}
            <span
              className={cn(
                "absolute left-5 top-5 font-display text-sm italic",
                dark ? "text-ivory/40" : "text-espresso/40"
              )}
            >
              0{index + 1}
            </span>

            {/* category */}
            <span
              className={cn(
                "absolute right-5 top-5 text-[9px] uppercase tracking-[0.35em]",
                dark ? "text-champagne/80" : "text-cocoa/70"
              )}
            >
              {product.category}
            </span>

            {/* hover actions */}
            <div
              className={cn(
                "absolute inset-x-0 bottom-0 flex translate-y-full flex-col gap-2 p-5 transition-transform duration-500 ease-luxe",
                hover && "translate-y-0"
              )}
            >
              <button
                onClick={() => add(product)}
                className="w-full bg-espresso/95 py-3.5 text-[10px] font-medium uppercase tracking-[0.3em] text-ivory backdrop-blur transition-colors hover:bg-deep-brown"
              >
                Add to Bag
              </button>
              <Link
                href={`/product/${product.slug}`}
                className="w-full border border-ivory/40 bg-ivory/10 py-3.5 text-center text-[10px] font-medium uppercase tracking-[0.3em] text-ivory backdrop-blur transition-colors hover:bg-ivory hover:text-espresso"
              >
                View Product
              </Link>
            </div>
          </div>

          {/* content — shifts a few px on hover */}
          <div
            className={cn("pt-5", dark ? "text-ivory" : "text-espresso")}
            style={{
              transform: hover ? "translateY(-4px)" : "translateY(0)",
              transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)"
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <h3
                className={cn(
                  "font-serif text-lg leading-snug transition-colors duration-400",
                  dark ? "text-ivory" : "text-espresso",
                  hover && "text-gold"
                )}
              >
                {product.name}
              </h3>
              <p className="whitespace-nowrap font-serif text-base">{formatNGN(product.price)}</p>
            </div>
            <p className={cn("mt-2 line-clamp-2 text-[13px] font-light leading-relaxed", dark ? "text-ivory/55" : "text-cocoa/75")}>
              {product.blurb}
            </p>
            <div className="mt-3 flex items-center justify-between">
              <span className={cn("text-[9px] uppercase tracking-[0.3em]", dark ? "text-ivory/40" : "text-espresso/40")}>
                {product.size}
              </span>
              <span className={cn("h-px flex-1 mx-4", dark ? "bg-ivory/15" : "bg-espresso/15")} />
              <span className={cn("text-[9px] uppercase tracking-[0.3em]", dark ? "text-champagne/80" : "text-cocoa/70")}>
                Ritual {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
}
