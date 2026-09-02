"use client";

import { useEffect } from "react";
import { useSite } from "@/lib/site";

const WORD = "AFRIESSENCE".split("");
const STORAGE_KEY = "afriessence-loaded";

/**
 * Brand intro.
 *
 * Safety by design:
 *  - The overlay renders IDENTICALLY on server and client (no storage in the
 *    render path) — no hydration mismatch, ever.
 *  - It fades out via a pure CSS animation (`af-fade`, forwards fill) even if
 *    JavaScript never runs or is throttled.
 *  - `pointer-events: none` — it can never block clicks or scrolling.
 *  - No scroll locking.
 *  - Repeat visits within a session skip straight to the site.
 */
export default function Preloader() {
  const { loaded, setLoaded } = useSite();

  useEffect(() => {
    let skip = false;
    try {
      skip = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      /* ignore */
    }
    if (skip) {
      setLoaded(true);
      return;
    }
    /* finish after the CSS fade is done (fade starts at 2s, ends ~2.7s) */
    const t = window.setTimeout(() => {
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* ignore */
      }
      setLoaded(true);
    }, 2600);
    return () => window.clearTimeout(t);
  }, [setLoaded]);

  if (loaded) return null;

  return (
    <div className="af-preloader" aria-hidden>
      <div className="af-glow" />
      <img src="/icon.svg" alt="" className="af-mark" />
      <div className="af-words">
        {WORD.map((ch, i) => (
          <span
            key={i}
            className="af-letter"
            style={{ animationDelay: `${80 + i * 70}ms` }}
          >
            {ch}
          </span>
        ))}
      </div>
      <p className="af-tagline">Where Beauty Meets Radiance</p>
      <div className="af-track">
        <span className="af-progress" />
      </div>
    </div>
  );
}
