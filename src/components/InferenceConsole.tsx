import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import SpotlightCard from "./SpotlightCard";

const CONVERSATIONS = [
  {
    q: "Who is Arun?",
    a: "A Senior ML Engineer at BlackBox AI. He owns the inference stack behind BlackBox's #1-of-7 throughput on NVIDIA Nemotron 3 Ultra, and serves frontier MoE models up to 2.8T parameters on Hopper and Blackwell GPUs.",
  },
  {
    q: "How does he make models fast?",
    a: "NVFP4, MXFP4 and FP8 quantization, EAGLE3 and DFlash speculative-decoding drafts, distributed KV-cache with Mooncake and LMCache, and cache-aware routing across 8×B300 fleets sustaining 51M tokens per minute.",
  },
  {
    q: "What else has he built?",
    a: "A verify-then-escalate coding agent at 94.7% pass@1 on Terminal-Bench 2.1, a TDX confidential-computing enclave, and 1,300+ commits across BlackBox's API gateway, enterprise API and CLI. Before that: Microsoft and IIT Hyderabad.",
  },
];

// Tokens released per decode step — speculative decoding accepts several draft tokens at once.
const BURSTS = [3, 5, 2, 4, 4, 1, 5, 3, 4, 2, 5, 4, 3];
const PREFILL_MS = 650;
const STEP_MS = 90;
const DWELL_MS = 5200;

export default function InferenceConsole() {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { margin: "-10% 0px" });
  const [convo, setConvo] = useState(0);
  const [shown, setShown] = useState(0);
  const [steps, setSteps] = useState(0);

  const tokens = CONVERSATIONS[convo].a.split(" ");
  const total = tokens.length;
  const visible = reduceMotion ? total : Math.min(shown, total);
  const phase = visible === 0 ? "prefill" : visible < total ? "streaming" : "done";

  useEffect(() => {
    if (reduceMotion || !inView) return;
    const timer = setTimeout(
      () => {
        if (shown < total) {
          setShown((n) => n + BURSTS[steps % BURSTS.length]);
          setSteps((n) => n + 1);
        } else {
          setConvo((c) => (c + 1) % CONVERSATIONS.length);
          setShown(0);
          setSteps(0);
        }
      },
      shown === 0 ? PREFILL_MS : shown < total ? STEP_MS : DWELL_MS
    );
    return () => clearTimeout(timer);
  }, [reduceMotion, inView, shown, steps, total]);

  const ask = (i: number) => {
    setConvo(i);
    setShown(0);
    setSteps(0);
  };

  const acceptRate = steps > 0 ? (visible / steps).toFixed(1) : "—";

  return (
    <div ref={rootRef} className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-8 -z-10 rounded-[3rem] bg-[radial-gradient(closest-side,var(--glow),transparent)] blur-2xl"
      />
      <SpotlightCard className="overflow-hidden">
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="size-2.5 rounded-full bg-line-strong" />
              <span className="size-2.5 rounded-full bg-line-strong" />
              <span className="size-2.5 rounded-full bg-line-strong" />
            </span>
            <span className="truncate font-mono text-[11px] text-dim">POST /v1/chat/completions</span>
          </div>
          <span className="flex shrink-0 items-center gap-1.5 font-mono text-[11px] text-dim">
            <span
              className={`size-1.5 rounded-full ${phase === "done" ? "bg-dim" : "pulse-dot bg-accent"}`}
              aria-hidden="true"
            />
            {phase}
          </span>
        </div>

        <div className="px-5 py-5">
          <p className="font-mono text-[12px] text-dim">
            model: <span className="text-accent">"arun-siddardha"</span> · stream: true
          </p>

          <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-dim">user</p>
          <p className="mt-1.5 text-[15px] text-fg">{CONVERSATIONS[convo].q}</p>

          <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-dim">assistant</p>
          {/* Every answer is stacked invisibly in one grid cell so the card is always as tall as the
              longest one — streaming text never changes the page layout. */}
          <div className="mt-1.5 grid text-[15px] leading-relaxed">
            {CONVERSATIONS.map((c) => (
              <p key={c.q} className="invisible [grid-area:1/1]" aria-hidden="true">
                {c.a}
              </p>
            ))}
            <p className="text-muted [grid-area:1/1]" aria-hidden="true">
              {phase === "prefill" ? (
                <span className="inline-flex gap-1 py-2" aria-label="Thinking">
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="size-1.5 animate-bounce rounded-full bg-dim"
                      style={{ animationDelay: `${d * 120}ms` }}
                    />
                  ))}
                </span>
              ) : (
                <>
                  {tokens.slice(0, visible).join(" ")}
                  {phase === "streaming" && <span className="caret" aria-hidden="true" />}
                </>
              )}
            </p>
          </div>
          {/* Screen readers get the full answer at once rather than a word-by-word stream. */}
          <p className="sr-only">{CONVERSATIONS[convo].a}</p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line px-4 py-2.5 font-mono text-[11px] text-dim">
          <span>8×B300 · NVFP4 · EAGLE3</span>
          <span className="tabular-nums">
            {visible} tok · {acceptRate} tok/step
          </span>
        </div>
      </SpotlightCard>

      <div className="mt-4 flex flex-wrap gap-2" aria-label="Ask a question">
        {CONVERSATIONS.map((c, i) => (
          <button
            key={c.q}
            type="button"
            onClick={() => ask(i)}
            aria-pressed={convo === i}
            className={`rounded-full border px-3 py-1.5 text-[12px] transition-colors ${
              convo === i
                ? "border-line-strong bg-elev text-fg"
                : "border-line text-dim hover:border-line-strong hover:text-fg"
            }`}
          >
            {c.q}
          </button>
        ))}
      </div>
    </div>
  );
}
