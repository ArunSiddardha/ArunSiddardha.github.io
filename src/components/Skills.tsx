import { skills } from "../lib/data";
import Reveal from "./Reveal";
import Section from "./Section";
import SpotlightCard from "./SpotlightCard";

export default function Skills() {
  return (
    <Section
      id="toolbox"
      index="04"
      eyebrow="Toolbox"
      title="From kernels to front-ends."
      description="What I reach for day to day — weighted heavily toward inference, with enough full-stack to ship the platform around it."
    >
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => (
          <Reveal
            key={group.label}
            delay={(i % 3) * 0.06}
            className={`h-full ${group.wide ? "lg:col-span-2" : ""} ${i === 0 ? "md:col-span-2" : ""}`}
          >
            <SpotlightCard className="h-full p-6">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">{group.label}</h3>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-line bg-elev-2/50 px-2.5 py-1 text-[13px] text-fg/90 transition-colors hover:border-line-strong"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
