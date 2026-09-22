import { useEffect, useRef } from "react";

/** Fixed decorative backdrop: faint grid, aurora glow, film grain and a soft cursor light. */
export default function Background() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.setProperty("--cx", `${e.clientX}px`);
        el.style.setProperty("--cy", `${e.clientY}px`);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="bg-aurora absolute inset-0" />
      <div className="bg-grid absolute inset-0" />
      <div ref={glowRef} className="cursor-glow absolute inset-0" />
      <div className="bg-noise absolute inset-0" />
    </div>
  );
}
