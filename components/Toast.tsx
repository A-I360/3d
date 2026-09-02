"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/lib/cart";

export default function Toast() {
  const { toast } = useCart();
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key={toast}
          initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: 12 }}
          className="fixed bottom-8 left-1/2 z-[110] -translate-x-1/2"
          role="status"
        >
          <div className="flex items-center gap-3 border border-champagne/40 bg-deep-brown px-6 py-3.5 shadow-luxe">
            <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
            <p className="whitespace-nowrap text-[11px] uppercase tracking-[0.25em] text-ivory">
              {toast}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
