import { education, profile } from "../lib/data";
import Reveal from "./Reveal";
import Section from "./Section";
import SpotlightCard from "./SpotlightCard";

const glance = [
  { label: "Currently", value: `${profile.role}, ${profile.company}` },
  { label: "Previously", value: "Software Engineer, Microsoft (Cloud + AI)" },
  { label: "Education", value: `${education.degree}, IIT Hyderabad` },
  { label: "Publication", value: "PerfMon — ACM SoCC '25" },
  { label: "Based in", value: profile.location },
];

const link = "text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent";

export default function About() {
  return (
    <Section
      id="about"
      index="01"
      eyebrow="About"
      title={
        <>
          Where models meet <span className="font-serif font-normal italic tracking-[-0.02em]">hardware.</span>
        </>
      }
    >
      <div className="grid gap-10 lg:grid-cols-[1.45fr_1fr] lg:gap-16">
        <Reveal className="space-y-6 text-pretty text-lg leading-relaxed text-muted">
          <p>
            I'm a machine learning engineer who lives at the point where models meet hardware. My work is
            making frontier LLMs serve faster and cheaper —{" "}
            <span className="text-fg">quantizing to NVFP4, MXFP4 and FP8</span>, training speculative-decoding
            drafts, building distributed KV-cache, and tuning multi-node fleets on NVIDIA H100 through B300.
          </p>
          <p>
            At{" "}
            <a href="https://www.blackbox.ai" target="_blank" rel="noopener noreferrer" className={link}>
              BlackBox AI
            </a>{" "}
            I own inference performance and production serving — the stack behind BlackBox's{" "}
            <span className="text-fg">#1-of-7 throughput on NVIDIA Nemotron 3 Ultra</span> and its #2-of-17
            result on GLM-5.2 on Artificial Analysis. I'm also a core contributor, with 1,300+ commits across
            the LLM API gateway, enterprise API, CLI and developer tooling.
          </p>
          <p>
            Before that I was at Microsoft (Cloud + AI), building RAG-based automation agents and ML-driven
            Azure migration tools. I studied Artificial Intelligence at{" "}
            <a href={education.url} target="_blank" rel="noopener noreferrer" className={link}>
              IIT Hyderabad
            </a>{" "}
            and co-authored PerfMon, an eBPF-based network monitoring system published at ACM SoCC '25.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <SpotlightCard className="p-6 md:p-7">
            {profile.photo ? (
              <figure className="-m-6 mb-0 md:-m-7 md:mb-0">
                <img
                  src={profile.photo}
                  alt={`${profile.fullName} speaking at a conference`}
                  width={800}
                  height={800}
                  loading="lazy"
                  className="aspect-[4/3] w-full rounded-t-2xl border-b border-line object-cover object-center"
                />
              </figure>
            ) : null}
            <div className={`flex items-center gap-4 ${profile.photo ? "pt-6" : ""}`}>
              {!profile.photo && (
                <span className="grid size-14 place-items-center rounded-full border border-line bg-elev-2 font-serif text-2xl italic text-fg">
                  AS
                </span>
              )}
              <div>
                <p className="font-medium text-fg">{profile.fullName}</p>
                <p className="text-sm text-muted">ML Engineer · LLM inference</p>
              </div>
            </div>
            <dl className="mt-6 divide-y divide-line border-t border-line">
              {glance.map((row) => (
                <div key={row.label} className="grid grid-cols-[96px_1fr] gap-4 py-3.5">
                  <dt className="pt-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-dim">{row.label}</dt>
                  <dd className="text-sm text-fg">{row.value}</dd>
                </div>
              ))}
            </dl>
          </SpotlightCard>
        </Reveal>
      </div>
    </Section>
  );
}
