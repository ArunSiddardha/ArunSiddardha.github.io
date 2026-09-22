import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { stats, type Stat } from "../lib/data";
import Reveal from "./Reveal";
import SpotlightCard from "./SpotlightCard";

function formatStat(n: number, stat: Stat) {
  const number = n.toLocaleString("en-US", {
    minimumFractionDigits: stat.decimals ?? 0,
    maximumFractionDigits: stat.decimals ?? 0,
  });
  return `${stat.prefix ?? ""}${number}${stat.suffix ?? ""}`;
}

function CountUp({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const reduceMotion = useReducedMotion();
  const value = useMotionValue(reduceMotion ? stat.value : (stat.from ?? 0));
  const text = useTransform(value, (v) =>
    formatStat(stat.decimals ? v : Math.round(v), stat)
  );

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(value, stat.value, { duration: 1.8, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [inView, reduceMotion, stat.value, value]);

  // The invisible final value reserves the box, so the animating text can never reflow the page.
  return (
    <span className="inline-grid whitespace-nowrap">
      <span className="invisible [grid-area:1/1]" aria-hidden="true">
        {formatStat(stat.value, stat)}
      </span>
      <motion.span ref={ref} className="[grid-area:1/1]" aria-hidden="true">
        {text}
      </motion.span>
      <span className="sr-only">{formatStat(stat.value, stat)}</span>
    </span>
  );
}

export default function Stats() {
  return (
    <section aria-label="Highlights" className="relative">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.06}
              className={stat.span === "wide" ? "col-span-2" : "col-span-2 sm:col-span-1"}
            >
              <SpotlightCard className="flex h-full flex-col justify-between gap-8 p-6 md:p-7">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-[clamp(2.4rem,4.2vw,3.4rem)] font-semibold leading-none tracking-[-0.045em] text-fg tabular-nums">
                    <CountUp stat={stat} />
                  </p>
                  {stat.tag && (
                    <span className="shrink-0 rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                      {stat.tag}
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-fg">{stat.label}</p>
                  <p className="mt-1 text-pretty text-sm leading-relaxed text-muted">{stat.detail}</p>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
