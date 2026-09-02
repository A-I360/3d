"use client";

import SocialButton3D, { SOCIAL_LINKS } from "@/components/Social3D";

/**
 * Floating social dock:
 *  - desktop: vertical stack on the right edge, labels slide out on hover
 *  - mobile:  compact stack bottom-right (fullscreen menu covers it)
 */
export default function SocialDock() {
  return (
    <>
      {/* desktop */}
      <aside className="fixed right-7 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-5 lg:flex">
        <span
          className="text-[9px] uppercase tracking-[0.5em] text-cocoa/50"
          style={{ writingMode: "vertical-rl" }}
        >
          Connect
        </span>
        <span className="h-10 w-px bg-espresso/15" />
        {SOCIAL_LINKS.map((s) => (
          <SocialButton3D key={s.id} item={s} size="dock" />
        ))}
      </aside>

      {/* mobile */}
      <div className="fixed bottom-5 right-4 z-30 flex flex-col items-end gap-2.5 lg:hidden">
        {SOCIAL_LINKS.map((s) => (
          <SocialButton3D key={s.id} item={s} size="compact" />
        ))}
      </div>
    </>
  );
}
