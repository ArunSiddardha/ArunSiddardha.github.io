import { profile, socialLinks } from "../lib/data";
import { scrollToTarget } from "../lib/scroll";
import { ArrowUpIcon, GithubIcon, LinkedinIcon, MailIcon } from "./Icons";

const icons = { github: GithubIcon, linkedin: LinkedinIcon, email: MailIcon };

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <p className="text-sm font-medium text-fg">{profile.fullName}</p>
          <p className="mt-1 text-sm text-dim">
            © {new Date().getFullYear()} · Designed & built with React, Tailwind CSS and Framer Motion.
          </p>
        </div>
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
    </footer>
  );
}
