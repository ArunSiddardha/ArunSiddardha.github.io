import { navLinks, profile, socialLinks } from "../lib/data";
import { scrollToTarget } from "../lib/scroll";
import { ArrowUpIcon, GithubIcon, LinkedinIcon, MailIcon } from "./Icons";

const icons = { github: GithubIcon, linkedin: LinkedinIcon, email: MailIcon };

const sections = [...navLinks, { label: "Toolbox", href: "#toolbox" }];

const elsewhere = [
  { label: "GitHub", href: profile.github },
  { label: "LinkedIn", href: profile.linkedin },
  { label: "Résumé (PDF)", href: profile.resume },
  { label: profile.email, href: `mailto:${profile.email}` },
];

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <img
                src={profile.avatar}
                alt=""
                width={400}
                height={400}
                className="size-10 rounded-full border border-line object-cover"
              />
              <div className="text-sm leading-tight">
                <p className="font-medium text-fg">{profile.fullName}</p>
                <p className="mt-0.5 text-muted">
                  {profile.role} · {profile.company}
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-pretty text-sm leading-relaxed text-muted">
              LLM inference performance and production GPU serving — quantization, speculative decoding and
              multi-node fleets on NVIDIA Hopper and Blackwell.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 text-[12px] text-dim">
              <span className="pulse-dot size-1.5 rounded-full bg-accent" aria-hidden="true" />
              {profile.availability}
            </p>
          </div>

          <nav aria-label="Sections">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-dim">Sections</h2>
            <ul className="mt-4 space-y-2.5">
              {sections.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToTarget(link.href);
                    }}
                    className="text-sm text-muted transition-colors hover:text-fg"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Elsewhere">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-dim">Elsewhere</h2>
            <ul className="mt-4 space-y-2.5">
              {elsewhere.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                    className="break-words text-sm text-muted transition-colors hover:text-fg"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-dim">
            © {new Date().getFullYear()} {profile.fullName} · Updated {profile.lastUpdated} · Built with React,
            Tailwind CSS and Framer Motion.
          </p>
          <div className="flex items-center gap-1">
            {socialLinks.map((link) => {
              const Icon = icons[link.key];
              const external = link.key !== "email";
              return (
                <a
                  key={link.key}
                  href={link.href}
                  aria-label={link.label}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-elev-2 hover:text-fg"
                >
                  <Icon className="size-4" />
                </a>
              );
            })}
            <span className="mx-2 h-5 w-px bg-line" aria-hidden="true" />
            <button
              type="button"
              onClick={() => scrollToTarget(0)}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm text-muted transition-colors hover:bg-elev-2 hover:text-fg"
            >
              Back to top
              <ArrowUpIcon className="size-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
