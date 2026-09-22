import { useEffect, useState } from "react";
import { profile } from "../lib/data";
import { copyToClipboard } from "../lib/toast";
import { ArrowUpRightIcon, CopyIcon, GithubIcon, LinkedinIcon, MailIcon, PinIcon } from "./Icons";
import Reveal from "./Reveal";
import SpotlightCard from "./SpotlightCard";

const timeFormat = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  timeZone: "Asia/Kolkata",
});

function useLocalTime() {
  const [time, setTime] = useState(() => timeFormat.format(new Date()));
  useEffect(() => {
    const id = setInterval(() => setTime(timeFormat.format(new Date())), 15_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

const links = [
  { label: "GitHub", href: profile.github, icon: GithubIcon },
  { label: "LinkedIn", href: profile.linkedin, icon: LinkedinIcon },
  { label: "Résumé", href: profile.resume, icon: ArrowUpRightIcon },
];

export default function Contact() {
  const time = useLocalTime();

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <SpotlightCard className="relative overflow-hidden px-6 py-16 text-center md:px-16 md:py-24">
            <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10 opacity-70" />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 -top-40 -z-10 mx-auto h-80 max-w-2xl rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)] blur-2xl"
            />

            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-dim">
              <span className="text-accent">06</span>
              <span className="mx-2 text-line-strong">/</span>
              Contact
            </p>
            <h2
              id="contact-title"
              className="mx-auto mt-6 max-w-3xl text-balance text-[clamp(2.5rem,6.5vw,5rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-fg"
            >
              Let's make something{" "}
              <span className="font-serif font-normal italic tracking-[-0.02em] text-accent">fast.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted">
              I'm always up for conversations about LLM inference, GPU serving, speculative decoding and agentic
              systems — a role, a collaboration, or a hard performance problem.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg transition-opacity hover:opacity-85"
              >
                <MailIcon className="size-4" />
                {profile.email}
              </a>
              <button
                type="button"
                onClick={() => copyToClipboard(profile.email, "Email copied to clipboard")}
                className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-3 text-sm font-medium text-fg transition-colors hover:bg-elev-2"
              >
                <CopyIcon className="size-4" />
                Copy
              </button>
            </div>

            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              {links.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
                  >
                    <Icon className="size-4" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-12 inline-flex items-center gap-2 font-mono text-[11px] text-dim">
              <PinIcon className="size-3.5" />
              {profile.location} · {time} IST
            </p>
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  );
}
