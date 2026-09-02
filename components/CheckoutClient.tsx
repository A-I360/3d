"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { formatNGN, getProduct } from "@/lib/products";
import { cn } from "@/lib/cn";

const inputCls =
  "w-full border border-espresso/15 bg-ivory px-4 py-3.5 text-sm font-light text-espresso placeholder:text-espresso/30 focus:border-gold focus:outline-none transition-colors";

export default function CheckoutClient() {
  const { lines, subtotal, setQty, remove, clear, showToast } = useCart();
  const [placed, setPlaced] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    phone: ""
  });

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setOrderId("AE-" + Math.floor(100000 + Math.random() * 899999));
      setProcessing(false);
      setPlaced(true);
      clear();
      showToast("Order placed — welcome to the ritual");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1600);
  };

  /* ---------- success ---------- */
  if (placed) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-ivory px-6 pt-[76px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-lg text-center"
        >
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-gold/50">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#B08D57" strokeWidth="1.6">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="mt-8 text-[10px] uppercase tracking-[0.5em] text-gold">Order Confirmed</p>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl">
            YOUR RITUAL
            <br />
            <span className="italic text-cocoa">BEGINS.</span>
          </h1>
          <p className="mt-6 text-sm font-light leading-loose text-cocoa/80">
            Thank you. Your order <span className="text-espresso">{orderId}</span> is being
            prepared by hand in Lagos. A confirmation letter is on its way to{" "}
            <span className="text-espresso">{form.email || "your inbox"}</span>.
          </p>
          <Link
            href="/shop"
            className="mt-10 inline-block bg-espresso px-12 py-4 text-[11px] font-medium uppercase tracking-luxe text-ivory transition-colors hover:bg-deep-brown"
          >
            Continue Shopping
          </Link>
        </motion.div>
      </main>
    );
  }

  /* ---------- empty ---------- */
  if (lines.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-ivory px-6 pt-[76px]">
        <div className="max-w-md text-center">
          <p className="text-[10px] uppercase tracking-[0.5em] text-gold">Checkout</p>
          <h1 className="mt-4 font-display text-4xl">YOUR BAG IS <span className="italic text-cocoa">EMPTY</span></h1>
          <p className="mt-5 text-sm font-light leading-loose text-cocoa/75">
            Every ritual begins with a single choice. Discover the collection
            and begin yours.
          </p>
          <Link
            href="/shop"
            className="mt-9 inline-block bg-espresso px-12 py-4 text-[11px] font-medium uppercase tracking-luxe text-ivory transition-colors hover:bg-deep-brown"
          >
            Shop the Collection
          </Link>
        </div>
      </main>
    );
  }

  /* ---------- checkout ---------- */
  return (
    <main className="bg-ivory pt-[76px]">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-12 lg:py-24">
        <p className="text-[10px] uppercase tracking-[0.5em] text-gold">Checkout</p>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl">
          COMPLETE YOUR <span className="italic text-cocoa">RITUAL</span>
        </h1>

        <div className="mt-14 grid grid-cols-1 gap-14 lg:grid-cols-5 lg:gap-20">
          {/* form */}
          <form onSubmit={placeOrder} className="space-y-10 lg:col-span-3">
            <fieldset>
              <legend className="font-serif text-lg text-espresso">Contact</legend>
              <div className="mt-5">
                <input required type="email" placeholder="Email address" className={inputCls} value={form.email} onChange={update("email")} />
              </div>
            </fieldset>

            <fieldset>
              <legend className="font-serif text-lg text-espresso">Delivery</legend>
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input required placeholder="First name" className={inputCls} value={form.firstName} onChange={update("firstName")} />
                <input required placeholder="Last name" className={inputCls} value={form.lastName} onChange={update("lastName")} />
                <input required placeholder="Street address" className={cn(inputCls, "sm:col-span-2")} value={form.address} onChange={update("address")} />
                <input required placeholder="City" className={inputCls} value={form.city} onChange={update("city")} />
                <input required placeholder="State" className={inputCls} value={form.state} onChange={update("state")} />
                <input required placeholder="Phone" className={cn(inputCls, "sm:col-span-2")} value={form.phone} onChange={update("phone")} />
              </div>
            </fieldset>

            <fieldset>
              <legend className="font-serif text-lg text-espresso">Payment</legend>
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  { id: "card", label: "Card Payment", note: "Visa · Mastercard · Verve" },
                  { id: "cod", label: "Pay on Delivery", note: "Cash or transfer on arrival" }
                ].map((opt, i) => (
                  <label
                    key={opt.id}
                    className={cn(
                      "flex cursor-pointer items-center justify-between border p-5 transition-all",
                      i === 0 ? "border-espresso bg-ivory" : "border-espresso/15 hover:border-espresso/40"
                    )}
                  >
                    <span>
                      <span className="block text-sm text-espresso">{opt.label}</span>
                      <span className="mt-1 block text-[11px] font-light text-cocoa/60">{opt.note}</span>
                    </span>
                    <span className={cn("h-4 w-4 rounded-full border-2", i === 0 ? "border-gold bg-gold" : "border-espresso/30")} />
                  </label>
                ))}
              </div>
              <p className="mt-4 text-[11px] font-light text-cocoa/60">
                This is a demonstration store — no payment is actually collected.
              </p>
            </fieldset>

            <button
              type="submit"
              disabled={processing}
              data-cursor="SHOP"
              className={cn(
                "w-full bg-espresso py-5 text-[11px] font-medium uppercase tracking-luxe text-ivory transition-all duration-500 hover:bg-deep-brown",
                processing && "cursor-wait opacity-70"
              )}
            >
              {processing ? "Placing your order…" : `Place Order — ${formatNGN(subtotal)}`}
            </button>
          </form>

          {/* summary */}
          <aside className="lg:col-span-2">
            <div className="border border-espresso/10 bg-cream/50 p-7 lg:sticky lg:top-24">
              <p className="text-[10px] uppercase tracking-[0.4em] text-cocoa/70">Order Summary</p>
              <ul className="mt-6 space-y-5">
                <AnimatePresence initial={false}>
                  {lines.map((l) => {
                    const p = getProduct(l.slug);
                    if (!p) return null;
                    return (
                      <motion.li
                        key={l.slug}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 24 }}
                        className="flex items-center gap-4"
                      >
                        <div className="relative h-16 w-14 shrink-0 overflow-hidden bg-cream">
                          <Image src={p.image} alt={p.name} width={112} height={112} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <p className="font-serif text-sm text-espresso">{p.name}</p>
                          <p className="mt-0.5 text-[10px] uppercase tracking-[0.25em] text-cocoa/60">
                            Qty {l.qty} · {p.size}
                          </p>
                        </div>
                        <p className="font-serif text-sm text-espresso">{formatNGN(p.price * l.qty)}</p>
                      </motion.li>
                    );
                  })}
                </AnimatePresence>
              </ul>

              <div className="mt-7 space-y-3 border-t border-espresso/10 pt-6 text-sm">
                <div className="flex justify-between text-cocoa/80">
                  <span>Subtotal</span>
                  <span>{formatNGN(subtotal)}</span>
                </div>
                <div className="flex justify-between text-cocoa/80">
                  <span>Shipping</span>
                  <span className="text-gold">Complimentary</span>
                </div>
                <div className="flex justify-between border-t border-espresso/10 pt-4 font-serif text-lg text-espresso">
                  <span>Total</span>
                  <span>{formatNGN(subtotal)}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
