import type { ReactNode } from "react";
import Reveal from "./Reveal";

interface Props {
  id: string;
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
}

export default function Section({ id, index, eyebrow, title, description, children }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-dim">
            <span className="text-accent">{index}</span>
            <span className="mx-2 text-line-strong">/</span>
            {eyebrow}
          </p>
          <h2
            id={`${id}-title`}
            className="group/anchor mt-4 max-w-3xl text-balance text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-fg"
          >
            {title}
            <a
              href={`#${id}`}
              aria-label={`Link to this section`}
              className="ml-3 align-middle font-mono text-2xl text-accent opacity-0 transition-opacity focus-visible:opacity-100 group-hover/anchor:opacity-100"
            >
              #
            </a>
          </h2>
          {description && (
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted">{description}</p>
          )}
        </Reveal>
        <div className="mt-12 md:mt-16">{children}</div>
      </div>
    </section>
  );
}
