import { useEffect, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks, profile } from "../lib/data";
import { scrollToTarget } from "../lib/scroll";
import { toggleTheme, useTheme } from "../lib/theme";
import { ArrowUpRightIcon, CloseIcon, MenuIcon, MoonIcon, SearchIcon, SunIcon } from "./Icons";

// "top" is included so no link stays highlighted once you scroll back up to the hero.
const SECTION_IDS = ["top", ...navLinks.map((link) => link.href.slice(1))];

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.userAgent);

export default function Navbar({ onOpenPalette }: { onOpenPalette: () => void }) {
  const active = useActiveSection(SECTION_IDS);
  const theme = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const go = (e: MouseEvent, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    scrollToTarget(href);
  };

  const onToggleTheme = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    toggleTheme({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
  };

  const raised = scrolled || menuOpen;

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:pt-4"
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <nav
        aria-label="Primary"
        className={`mx-auto flex max-w-6xl items-center justify-between gap-2 rounded-full border py-1.5 pl-1.5 pr-1.5 transition-[background-color,border-color,box-shadow] duration-300 md:w-fit md:justify-start ${
          raised ? "border-line bg-bg/75 shadow-(--shadow) backdrop-blur-xl" : "border-transparent"
        }`}
      >
        <a
          href="#top"
          onClick={(e) => go(e, "#top")}
          className="flex items-center gap-2.5 rounded-full py-0.5 pl-0.5 pr-3"
          aria-label={`${profile.name} — back to top`}
        >
          <img
            src={profile.avatar}
            alt=""
            width={400}
            height={400}
            className="size-8 shrink-0 rounded-full border border-line object-cover"
          />
          <span className="text-sm font-medium tracking-tight text-fg">{profile.name}</span>
        </a>

        <span className="mx-1 hidden h-5 w-px bg-line md:block" aria-hidden="true" />

        <ul className="hidden items-center md:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => go(e, link.href)}
                  aria-current={isActive ? "location" : undefined}
                  className={`relative isolate block rounded-full px-3 py-1.5 text-[13px] transition-colors ${
                    isActive ? "text-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-elev-2"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1 md:ml-2">
          <button
            type="button"
            onClick={onOpenPalette}
            aria-label="Open command menu"
            className="hidden items-center gap-2 rounded-full border border-line px-2.5 py-1 text-[12px] text-dim transition-colors hover:border-line-strong hover:text-fg sm:flex"
          >
            <SearchIcon className="size-3.5" />
            <kbd className="font-mono">{isMac ? "⌘K" : "Ctrl K"}</kbd>
          </button>
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            className="grid size-8 place-items-center rounded-full text-muted transition-colors hover:bg-elev-2 hover:text-fg"
          >
            {theme === "dark" ? <SunIcon className="size-4" /> : <MoonIcon className="size-4" />}
          </button>
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1 rounded-full bg-fg px-3.5 py-1.5 text-[13px] font-medium text-bg transition-opacity hover:opacity-85 md:inline-flex"
          >
            Résumé
            <ArrowUpRightIcon className="size-3.5" />
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="grid size-8 place-items-center rounded-full text-fg transition-colors hover:bg-elev-2 md:hidden"
          >
            {menuOpen ? <CloseIcon className="size-4" /> : <MenuIcon className="size-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="mx-auto mt-2 max-w-6xl rounded-3xl border border-line bg-bg/90 p-2 shadow-(--shadow) backdrop-blur-xl md:hidden"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <ul>
              {navLinks.map((link, i) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => go(e, link.href)}
                    className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-lg font-medium tracking-tight text-fg transition-colors hover:bg-elev-2"
                  >
                    {link.label}
                    <span className="font-mono text-[11px] text-dim">0{i + 1}</span>
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="m-2 flex items-center justify-center gap-1.5 rounded-2xl bg-fg py-3 text-sm font-medium text-bg"
            >
              Open résumé
              <ArrowUpRightIcon className="size-4" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
