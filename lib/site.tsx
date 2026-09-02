"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode
} from "react";

interface SiteCtx {
  /** app finished the premium loading sequence */
  loaded: boolean;
  setLoaded: (v: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
}

const Ctx = createContext<SiteCtx | null>(null);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = searchOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [searchOpen]);

  return (
    <Ctx.Provider value={{ loaded, setLoaded, searchOpen, setSearchOpen }}>
      {children}
    </Ctx.Provider>
  );
}

export function useSite() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSite must be used inside SiteProvider");
  return ctx;
}
