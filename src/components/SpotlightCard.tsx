import type { ElementType, MouseEvent, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

/** A surface whose border lights up around the cursor. Styles live in `.spotlight` (index.css). */
export default function SpotlightCard({ children, className = "", as: Tag = "div" }: Props) {
  const onMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <Tag
      onMouseMove={onMove}
      className={`spotlight rounded-2xl border border-line bg-elev shadow-(--shadow) ${className}`}
    >
      {children}
    </Tag>
  );
}
