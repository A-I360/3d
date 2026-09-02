"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";
import { getProduct, type Product } from "@/lib/products";

export interface CartLine {
  slug: string;
  qty: number;
}

interface CartCtx {
  lines: CartLine[];
  count: number;
  subtotal: number;
  open: boolean;
  toast: string | null;
  add: (p: Product, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
  setOpen: (v: boolean) => void;
  showToast: (msg: string) => void;
}

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("afriessence-cart");
      if (raw) setLines(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("afriessence-cart", JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2400);
  }, []);

  const add = useCallback(
    (p: Product, qty = 1) => {
      setLines((prev) => {
        const existing = prev.find((l) => l.slug === p.slug);
        if (existing)
          return prev.map((l) =>
            l.slug === p.slug ? { ...l, qty: l.qty + qty } : l
          );
        return [...prev, { slug: p.slug, qty }];
      });
      showToast(`${p.name} added to your bag`);
    },
    [showToast]
  );

  const setQty = useCallback((slug: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.slug !== slug)
        : prev.map((l) => (l.slug === slug ? { ...l, qty } : l))
    );
  }, []);

  const remove = useCallback((slug: string) => {
    setLines((prev) => prev.filter((l) => l.slug !== slug));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const { count, subtotal } = useMemo(() => {
    let c = 0;
    let s = 0;
    for (const l of lines) {
      const p = getProduct(l.slug);
      if (!p) continue;
      c += l.qty;
      s += p.price * l.qty;
    }
    return { count: c, subtotal: s };
  }, [lines]);

  const value = useMemo(
    () => ({
      lines,
      count,
      subtotal,
      open,
      toast,
      add,
      setQty,
      remove,
      clear,
      setOpen,
      showToast
    }),
    [lines, count, subtotal, open, toast, add, setQty, remove, clear, showToast]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
