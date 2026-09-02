"use client";

import { useEffect, useState } from "react";

/**
 * Detects low-power devices (phones, tablets, weak CPUs) so WebGL can be
 * dialed down: DPR 1, fewer particles, no heavy post-processing.
 */
export function useLowPower(): boolean {
  const [low, setLow] = useState(false);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const small = window.innerWidth < 768;
    const cores = navigator.hardwareConcurrency ?? 8;
    const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory;
    setLow(coarse || small || cores <= 4 || (memory !== undefined && memory <= 4));
  }, []);

  return low;
}
