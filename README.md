# Arun Siddardha — Portfolio

Personal site built with React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion and Lenis.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run lint
```

## Editing content

All copy lives in **`src/lib/data.ts`** — profile links, headline stats, experience, projects,
skills, publication and honors. Components only handle layout.

- **Résumé:** replace `public/Arun_Siddardha_Resume.pdf` (path set by `profile.resume`).
- **Photo:** drop a square image in `public/` and set `profile.photo` (e.g. `"/profile.jpg"`);
  until then the About card shows an “AS” monogram.
- **Hero console Q&A:** `CONVERSATIONS` in `src/components/InferenceConsole.tsx`.
- **Theme colours:** CSS variables at the top of `src/index.css` (`:root` = dark, `[data-theme="light"]`).

## Features

- Dark / light theme (follows the system, remembers the choice, circular View-Transition reveal)
- ⌘K / Ctrl K command palette for navigation, links, copying the email and switching theme
- Streaming "inference console" hero, count-up stats bento and cursor-spotlight cards
- Respects `prefers-reduced-motion` (no smooth scroll, streaming or count-ups)
- SEO: meta + Open Graph tags and a schema.org `Person` block in `index.html`
