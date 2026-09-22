import { marquee } from "../lib/data";

/** Decorative scrolling strip of the stack; the Toolbox section lists everything accessibly. */
export default function Marquee() {
  const items = [...marquee, ...marquee];

  return (
    <div aria-hidden="true" className="marquee-mask mx-auto max-w-6xl overflow-hidden py-14 md:py-20">
      <ul className="marquee-track flex w-max">
        {items.map((name, i) => (
          <li
            key={i}
            className="flex items-center whitespace-nowrap pr-10 font-mono text-[13px] uppercase tracking-[0.16em] text-dim"
          >
            {name}
            <span className="ml-10 size-1 rounded-full bg-line-strong" />
          </li>
        ))}
      </ul>
    </div>
  );
}
