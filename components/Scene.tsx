"use client";

import dynamic from "next/dynamic";

/**
 * The WebGL scene is the heaviest module on the site (three.js + R3F + drei).
 * It is loaded on demand so the first paint never waits for the 3D engine.
 */
const Scene = dynamic(() => import("@/components/ProductScene"), {
  ssr: false,
  loading: () => null
});

export default Scene;
