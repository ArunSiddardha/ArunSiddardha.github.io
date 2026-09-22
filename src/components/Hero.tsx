import type { MouseEvent } from "react";
import { motion, type Variants } from "framer-motion";
import { profile } from "../lib/data";
import { scrollToTarget } from "../lib/scroll";
import { copyToClipboard } from "../lib/toast";
import { ArrowRightIcon, ArrowUpRightIcon, CopyIcon } from "./Icons";
import InferenceConsole from "./InferenceConsole";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

const facts = [
  { label: "Previously", value: "Microsoft · Cloud + AI" },
  { label: "Education", value: "IIT Hyderabad · B.Tech AI" },
  { label: "Based in", value: profile.location },
];

export default function Hero() {
  const go = (e: MouseEvent, href: string) => {
    e.preventDefault();
    scrollToTarget(href);
  };

  return (
    <section id="top" className="relative pb-16 pt-32 md:pb-24 md:pt-44">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 md:px-8 lg:grid-cols-[1.12fr_1fr] lg:gap-16">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-elev/60 py-1 pl-2.5 pr-3.5 text-[12px] text-muted backdrop-blur"
          >
            <span className="pulse-dot size-1.5 rounded-full bg-accent" aria-hidden="true" />
            {profile.availability}
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-6 text-balance text-[clamp(2.9rem,7.4vw,5.6rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-fg"
          >
            I make frontier LLMs{" "}
            <span className="font-serif font-normal italic tracking-[-0.02em] text-accent">fast.</span>
          </motion.h1>

          <motion.p variants={item} className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-muted">
            I'm <span className="text-fg">{profile.name}</span>, a machine learning engineer working on LLM
            inference performance and production GPU serving — quantization, speculative decoding,
            distributed KV-cache and multi-node fleets on NVIDIA Hopper and Blackwell.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              onClick={(e) => go(e, "#work")}
              className="group inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-85"
            >
              See selected work
              <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-5 py-2.5 text-sm font-medium text-fg transition-colors hover:bg-elev-2"
            >
              Résumé
              <ArrowUpRightIcon className="size-4" />
            </a>
            <button
              type="button"
              onClick={() => copyToClipboard(profile.email, "Email copied to clipboard")}
              className="inline-flex items-center gap-2 rounded-full px-3 py-2.5 text-sm text-muted transition-colors hover:text-fg"
            >
              <CopyIcon className="size-4" />
              Copy email
            </button>
          </motion.div>

          <motion.dl variants={item} className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-dim">{fact.label}</dt>
                <dd className="mt-1 text-sm text-fg">{fact.value}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <InferenceConsole />
        </motion.div>
      </div>

      <motion.a
        href="#about"
        onClick={(e) => go(e, "#about")}
        aria-label="Scroll to About"
        className="mx-auto mt-16 hidden w-fit flex-col items-center gap-2 text-dim transition-colors hover:text-fg lg:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <span className="h-10 w-px bg-gradient-to-b from-line-strong to-transparent" aria-hidden="true" />
      </motion.a>
    </section>
  );
}
