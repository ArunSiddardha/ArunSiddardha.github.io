import { useSyncExternalStore } from "react";
import { prefersReducedMotion } from "./scroll";

export type Theme = "dark" | "light";

const listeners = new Set<() => void>();

function readTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("theme", theme);
  } catch {
    /* storage unavailable (private mode) — the theme still applies for this visit */
  }
  listeners.forEach((listener) => listener());
}

/** Toggle the theme, revealing the new one as a circle growing from (x, y) where supported. */
export function toggleTheme(origin?: { x: number; y: number }) {
  const next: Theme = readTheme() === "dark" ? "light" : "dark";

  if (!document.startViewTransition || prefersReducedMotion()) {
    applyTheme(next);
    return;
  }

  const x = origin?.x ?? window.innerWidth / 2;
  const y = origin?.y ?? 0;
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

  const transition = document.startViewTransition(() => applyTheme(next));
  transition.ready
    .then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 550, easing: "cubic-bezier(0.65, 0, 0.35, 1)", pseudoElement: "::view-transition-new(root)" }
      );
    })
    .catch(() => {
      /* transition skipped — theme is already applied */
    });
}

export function useTheme(): Theme {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    readTheme,
    () => "dark"
  );
}
