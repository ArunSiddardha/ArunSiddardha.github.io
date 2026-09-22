import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks, profile } from "../lib/data";
import { getLenis, scrollToTarget } from "../lib/scroll";
import { toggleTheme } from "../lib/theme";
import { copyToClipboard } from "../lib/toast";
import {
  CopyIcon,
  FileIcon,
  GithubIcon,
  HashIcon,
  LinkedinIcon,
  MailIcon,
  SearchIcon,
  SunIcon,
} from "./Icons";

interface Command {
  id: string;
  group: "Navigate" | "Links" | "Actions";
  label: string;
  icon: ReactNode;
  keywords?: string;
  run: () => void;
}

const iconClass = "size-4";

const openExternal = (url: string) => window.open(url, "_blank", "noopener,noreferrer");

const COMMANDS: Command[] = [
  ...navLinks.map<Command>((link) => ({
    id: link.href,
    group: "Navigate",
    label: link.label,
    icon: <HashIcon className={iconClass} />,
    run: () => scrollToTarget(link.href),
  })),
  {
    id: "#toolbox",
    group: "Navigate",
    label: "Toolbox",
    keywords: "skills stack technologies",
    icon: <HashIcon className={iconClass} />,
    run: () => scrollToTarget("#toolbox"),
  },
  {
    id: "resume",
    group: "Links",
    label: "Open résumé (PDF)",
    keywords: "cv resume download",
    icon: <FileIcon className={iconClass} />,
    run: () => openExternal(profile.resume),
  },
  {
    id: "github",
    group: "Links",
    label: "GitHub",
    keywords: "code repositories",
    icon: <GithubIcon className={iconClass} />,
    run: () => openExternal(profile.github),
  },
  {
    id: "linkedin",
    group: "Links",
    label: "LinkedIn",
    icon: <LinkedinIcon className={iconClass} />,
    run: () => openExternal(profile.linkedin),
  },
  {
    id: "copy-email",
    group: "Actions",
    label: "Copy email address",
    keywords: `${profile.email} contact`,
    icon: <CopyIcon className={iconClass} />,
    run: () => void copyToClipboard(profile.email, "Email copied to clipboard"),
  },
  {
    id: "send-email",
    group: "Actions",
    label: "Send an email",
    keywords: "contact hire mail",
    icon: <MailIcon className={iconClass} />,
    run: () => {
      window.location.href = `mailto:${profile.email}`;
    },
  },
  {
    id: "theme",
    group: "Actions",
    label: "Toggle light / dark theme",
    keywords: "appearance mode",
    icon: <SunIcon className={iconClass} />,
    run: () => toggleTheme(),
  },
];

function lockScroll() {
  getLenis()?.stop();
  document.documentElement.style.overflow = "hidden";
}

function unlockScroll() {
  document.documentElement.style.overflow = "";
  getLenis()?.start();
}

function Palette({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COMMANDS;
    return COMMANDS.filter((c) => `${c.label} ${c.keywords ?? ""} ${c.group}`.toLowerCase().includes(q));
  }, [query]);

  const activeIndex = Math.min(index, results.length - 1);

  useEffect(() => {
    lockScroll();
    return unlockScroll;
  }, []);

  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${activeIndex}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const execute = (command: Command | undefined) => {
    if (!command) return;
    unlockScroll();
    onClose();
    command.run();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((activeIndex + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((activeIndex - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      execute(results[activeIndex]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[14vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      <div className="absolute inset-0 bg-black/45 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Command menu"
        onKeyDown={onKeyDown}
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-line-strong bg-elev shadow-2xl shadow-black/40"
        initial={{ opacity: 0, scale: 0.97, y: -8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: -4 }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <SearchIcon className="size-4 shrink-0 text-dim" />
          <input
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIndex(0);
            }}
            placeholder="Search sections, links, actions…"
            aria-label="Search commands"
            role="combobox"
            aria-expanded="true"
            aria-controls="command-list"
            aria-activedescendant={results.length ? `command-${activeIndex}` : undefined}
            className="h-14 w-full bg-transparent text-[15px] text-fg placeholder:text-dim focus:outline-none"
          />
          <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-dim">esc</kbd>
        </div>

        <ul
          id="command-list"
          ref={listRef}
          role="listbox"
          data-lenis-prevent
          className="max-h-[min(55vh,420px)] overflow-y-auto p-2"
        >
          {results.length === 0 && <li className="px-3 py-8 text-center text-sm text-dim">No results for “{query}”</li>}
          {results.map((command, i) => (
            <li key={command.id} role="presentation">
              {(i === 0 || results[i - 1].group !== command.group) && (
                <p className="px-3 pb-1.5 pt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-dim first:pt-1">
                  {command.group}
                </p>
              )}
              <button
                type="button"
                id={`command-${i}`}
                data-index={i}
                role="option"
                aria-selected={i === activeIndex}
                tabIndex={-1}
                onMouseMove={() => i !== activeIndex && setIndex(i)}
                onClick={() => execute(command)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                  i === activeIndex ? "bg-elev-2 text-fg" : "text-muted"
                }`}
              >
                <span className={i === activeIndex ? "text-accent" : "text-dim"}>{command.icon}</span>
                {command.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4 border-t border-line px-4 py-2.5 font-mono text-[10px] text-dim">
          <span>↑↓ navigate</span>
          <span>↵ select</span>
          <span className="ml-auto">{profile.name}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  return <AnimatePresence>{open && <Palette onClose={onClose} />}</AnimatePresence>;
}
