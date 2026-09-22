import { motion } from "framer-motion";
import { otherProjects, profile, projects, type Project, type ProjectViz } from "../lib/data";
import { ArrowRightIcon, ArrowUpRightIcon, GithubIcon } from "./Icons";
import Reveal from "./Reveal";
import Section from "./Section";
import SpotlightCard from "./SpotlightCard";

function Caption({ children }: { children: string }) {
  return <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-dim">{children}</p>;
}

function Viz({ viz }: { viz: ProjectViz }) {
  if (viz.kind === "rank") {
    return (
      <div>
        <Caption>{viz.caption}</Caption>
        <ol className="mt-3 grid grid-cols-7 gap-1.5" aria-label={`Ranked ${viz.position} of ${viz.total}`}>
          {Array.from({ length: viz.total }, (_, i) => {
            const isUs = i + 1 === viz.position;
            return (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.05, duration: 0.4 }}
                className={`flex h-10 items-center justify-center rounded-lg border font-mono text-[11px] ${
                  isUs ? "border-accent/50 bg-accent/15 font-medium text-accent" : "border-line text-dim"
                }`}
              >
                #{i + 1}
              </motion.li>
            );
          })}
        </ol>
      </div>
    );
  }

  if (viz.kind === "bars") {
    const max = viz.max ?? Math.max(...viz.items.map((item) => item.value));
    return (
      <div>
        <Caption>{viz.caption}</Caption>
        <div className="mt-3 space-y-3">
          {viz.items.map((item) => (
            <div key={item.label}>
              <div className="flex items-baseline justify-between gap-4 font-mono text-[11px]">
                <span className={item.highlight ? "text-fg" : "text-dim"}>{item.label}</span>
                <span className={`tabular-nums ${item.highlight ? "text-accent" : "text-dim"}`}>
                  {item.approx ? "~" : ""}
                  {item.value}
                  {viz.unit}
                </span>
              </div>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-line">
                <motion.div
                  className={`h-full rounded-full ${item.highlight ? "bg-accent" : "bg-dim/60"}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(item.value / max) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <Caption>{viz.caption}</Caption>
      <ol className="mt-3 flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
        {viz.steps.map((step, i) => (
          <li key={step} className="flex items-center gap-1.5">
            <span className="rounded-lg border border-line bg-elev px-2.5 py-1.5 text-muted">{step}</span>
            {i < viz.steps.length - 1 && <ArrowRightIcon className="size-3.5 text-dim" />}
          </li>
        ))}
      </ol>
    </div>
  );
}

function FeaturedProject({ project }: { project: Project }) {
  return (
    // On md+ the card is a subgrid spanning two rows of the parent grid, so the visual panels (row 1)
    // and the text bodies (row 2) line up across each pair of cards.
    <SpotlightCard
      as="article"
      className="grid h-full grid-rows-[auto_1fr] overflow-hidden md:row-span-2 md:grid-rows-subgrid"
    >
      <div className="flex flex-col justify-between gap-8 border-b border-line bg-elev-2/40 p-6 md:p-8">
        {project.metric && (
          <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-[clamp(2.25rem,4vw,3rem)] font-semibold leading-none tracking-[-0.045em] text-fg">
              {project.metric.value}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-dim">{project.metric.label}</span>
          </p>
        )}
        <Viz viz={project.viz} />
      </div>
      <div className="flex flex-1 flex-col p-6 md:p-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">{project.eyebrow}</p>
        <h3 className="mt-3 text-balance text-2xl font-semibold tracking-[-0.02em] text-fg">
          {project.link ? (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
              {project.title}
            </a>
          ) : (
            project.title
          )}
        </h3>
        <p className="mt-3 flex-1 text-pretty text-[15px] leading-relaxed text-muted">{project.description}</p>
        <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.tech.map((tech) => (
            <li key={tech} className="rounded-md border border-line bg-elev-2/60 px-2 py-0.5 font-mono text-[11px] text-muted">
              {tech}
            </li>
          ))}
        </ul>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent"
          >
            {project.linkLabel ?? "View project"}
            <ArrowUpRightIcon className="size-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
          </a>
        )}
      </div>
    </SpotlightCard>
  );
}

export default function Projects() {
  return (
    <Section
      id="work"
      index="03"
      eyebrow="Selected work"
      title={
        <>
          Systems I've built, <span className="font-serif font-normal italic tracking-[-0.02em]">measured.</span>
        </>
      }
      description="Most of this runs in production at BlackBox AI, so the code is private. Here's what each system does and how it measured up."
    >
      <div className="grid gap-3 md:grid-cols-2 md:gap-y-0">
        {projects.map((project, i) => (
          <Reveal
            key={project.title}
            delay={(i % 2) * 0.08}
            className="md:row-span-2 md:mb-3 md:grid md:grid-rows-subgrid"
          >
            <FeaturedProject project={project} />
          </Reveal>
        ))}
      </div>

      <div className="mt-24">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h3 className="text-2xl font-semibold tracking-[-0.02em] text-fg">More work</h3>
            <p className="mt-2 text-muted">Serving infrastructure, platforms and developer tools.</p>
          </div>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
          >
            <GithubIcon className="size-4" />
            More on GitHub
            <ArrowUpRightIcon className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </Reveal>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {otherProjects.map((project, i) => (
            <Reveal key={project.title} delay={(i % 3) * 0.06} className="h-full">
              <SpotlightCard
                as="article"
                className="flex h-full flex-col p-6 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-dim">{String(i + 1).padStart(2, "0")}</span>
                  {(project.link ?? project.github) && (
                    <a
                      href={project.link ?? project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${project.title}`}
                      className="text-dim transition-colors hover:text-fg"
                    >
                      <ArrowUpRightIcon className="size-4" />
                    </a>
                  )}
                </div>
                <h4 className="mt-6 text-lg font-semibold tracking-tight text-fg">{project.title}</h4>
                <p className="mt-2 flex-1 text-pretty text-sm leading-relaxed text-muted">{project.description}</p>
                <p className="mt-5 font-mono text-[11px] text-dim">{project.tech.join(" · ")}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
