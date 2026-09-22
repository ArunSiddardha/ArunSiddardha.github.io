import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { experiences, type Experience as Role } from "../lib/data";
import { ArrowUpRightIcon } from "./Icons";
import Reveal from "./Reveal";
import Section from "./Section";

const PREVIEW_POINTS = 4;

/** Keep only the first `limit` highlights across all groups, dropping groups left empty. */
function takePoints(groups: Role["groups"], limit: number) {
  const result: Role["groups"] = [];
  let remaining = limit;
  for (const group of groups) {
    if (remaining <= 0) break;
    const points = group.points.slice(0, remaining);
    remaining -= points.length;
    result.push({ ...group, points });
  }
  return result;
}

function RoleEntry({ role }: { role: Role }) {
  const [expanded, setExpanded] = useState(false);
  const totalPoints = role.groups.reduce((n, g) => n + g.points.length, 0);
  const collapsible = totalPoints > PREVIEW_POINTS + 1;
  const current = role.date.includes("Present");
  const groups = collapsible && !expanded ? takePoints(role.groups, PREVIEW_POINTS) : role.groups;

  return (
    <li className="grid gap-5 border-t border-line py-10 first:border-t-0 first:pt-0 md:grid-cols-[200px_1fr] md:gap-10 md:py-12">
      <div className="font-mono text-[12px] md:pt-1.5">
        <p className="flex items-center gap-2 text-muted">
          {current && <span className="pulse-dot size-1.5 rounded-full bg-accent" aria-hidden="true" />}
          {role.date}
        </p>
        <p className="mt-1 text-dim">{role.location}</p>
      </div>

      <div>
        <h3 className="text-xl font-semibold tracking-tight text-fg md:text-2xl">
          {role.title}
          <span className="font-normal text-dim"> · </span>
          {role.companyUrl ? (
            <a
              href={role.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 text-fg transition-colors hover:text-accent"
            >
              {role.company}
              <ArrowUpRightIcon className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          ) : (
            role.company
          )}
        </h3>

        {role.summary && <p className="mt-3 max-w-3xl text-pretty leading-relaxed text-muted">{role.summary}</p>}

        {groups.map((group) => (
          <div key={group.label ?? "highlights"} className="mt-7">
            {group.label && (
              <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">{group.label}</h4>
            )}
            <ul className="mt-3 space-y-3.5">
              <AnimatePresence initial={false}>
                {group.points.map((point) => (
                  <motion.li
                    key={point.text}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative max-w-3xl pl-5 text-pretty text-[15px] leading-relaxed text-muted"
                  >
                    <span className="absolute left-0 top-[0.8em] h-px w-2.5 bg-line-strong" aria-hidden="true" />
                    {point.lead && <span className="font-medium text-fg">{point.lead} </span>}
                    {point.text}
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>
        ))}

        {collapsible && (
          <button
            type="button"
            onClick={() => setExpanded((open) => !open)}
            aria-expanded={expanded}
            className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-1.5 text-[13px] text-muted transition-colors hover:border-line-strong hover:text-fg"
          >
            {expanded ? "Show fewer highlights" : `Show ${totalPoints - PREVIEW_POINTS} more highlights`}
          </button>
        )}

        <ul className="mt-7 flex flex-wrap gap-1.5" aria-label="Technologies">
          {role.tech.map((tech) => (
            <li key={tech} className="rounded-md border border-line bg-elev-2/60 px-2 py-0.5 font-mono text-[11px] text-muted">
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export default function Experience() {
  return (
    <Section
      id="experience"
      index="02"
      eyebrow="Experience"
      title="Where I've worked."
      description="Two-plus years shipping ML systems — from Azure migration tooling at Microsoft to frontier-model serving at BlackBox AI."
    >
      <Reveal>
        <ol>
          {experiences.map((role) => (
            <RoleEntry key={role.title} role={role} />
          ))}
        </ol>
      </Reveal>
    </Section>
  );
}
