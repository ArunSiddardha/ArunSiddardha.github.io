import { education, honors, publication } from "../lib/data";
import { ArrowUpRightIcon } from "./Icons";
import Reveal from "./Reveal";
import Section from "./Section";
import SpotlightCard from "./SpotlightCard";

export default function Research() {
  return (
    <Section id="research" index="05" eyebrow="Research & recognition" title="Papers, degrees and ranks.">
      <div className="grid gap-3 lg:grid-cols-[1.35fr_1fr]">
        <Reveal className="h-full">
          <SpotlightCard as="article" className="flex h-full flex-col p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em]">
              <span className="text-accent">Publication</span>
              <span className="text-line-strong">/</span>
              <span className="text-dim">
                {publication.venue} · {publication.date}
              </span>
            </div>
            <h3 className="mt-5 text-balance text-2xl font-semibold tracking-[-0.02em] text-fg md:text-3xl">
              {publication.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-dim">
              {publication.authors.map((author, i) => (
                <span key={author}>
                  <span className={author === publication.self ? "font-medium text-fg" : undefined}>{author}</span>
                  {i < publication.authors.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
            <p className="mt-5 flex-1 text-pretty leading-relaxed text-muted">{publication.abstract}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={`https://doi.org/${publication.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-85"
              >
                Read the paper
                <ArrowUpRightIcon className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <span className="font-mono text-[11px] text-dim">doi:{publication.doi}</span>
              <span className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                {publication.affiliation}
              </span>
            </div>
          </SpotlightCard>
        </Reveal>

        <div className="grid gap-3">
          <Reveal delay={0.08}>
            <SpotlightCard className="p-6 md:p-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">Education</p>
              <div className="mt-4 flex items-end justify-between gap-6">
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-fg">
                    <a
                      href={education.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-accent"
                    >
                      {education.school}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-muted">{education.degree}</p>
                  <p className="mt-1 font-mono text-[11px] text-dim">{education.detail}</p>
                </div>
                <p className="shrink-0 text-right">
                  <span className="block text-4xl font-semibold leading-none tracking-[-0.04em] text-fg">8.85</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-dim">CGPA</span>
                </p>
              </div>
            </SpotlightCard>
          </Reveal>

          <Reveal delay={0.14}>
            <SpotlightCard className="p-6 md:p-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">Honors & awards</p>
              <ul className="mt-2 divide-y divide-line">
                {honors.map((honor) => (
                  <li key={honor.title} className="flex items-center gap-5 py-4 last:pb-0">
                    <span className="w-24 shrink-0 text-2xl font-semibold tracking-[-0.03em] text-fg tabular-nums">
                      {honor.rank}
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-fg">{honor.title}</span>
                      <span className="block text-sm text-muted">{honor.detail}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
