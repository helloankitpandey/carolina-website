'use client';

import { useEffect, useState } from "react";

const interactiveSelectors =
  'a, button, [role="button"], input, textarea, select, summary, [data-cursor="interactive"]';

const supportsFinePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;

export default function NeonCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(supportsFinePointer());
    const listener = () => setEnabled(supportsFinePointer());

    window.matchMedia("(pointer: fine)").addEventListener("change", listener);

    return () => window.matchMedia("(pointer: fine)").removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      setVisible(true);
      setPosition({ x: event.clientX, y: event.clientY });

      const target = event.target as Element | null;
      setActive(!!target?.closest(interactiveSelectors));
    };

    const handlePointerLeave = () => setVisible(false);

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-screen transition-opacity duration-200"
      style={{
        opacity: visible ? 1 : 0,
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      <div
        className={`h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-teal/90 blur-[6px] transition-all duration-200 ${
          active ? "scale-150 opacity-90 shadow-[0_0_25px_rgba(75,225,255,0.8)]" : "opacity-100"
        }`}
      />
    </div>
  );
}

