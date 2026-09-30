# Codebase Audit

## Purpose and Shape

This repository is a single-page personal portfolio for Rajan Kumar Gupta. It is a client-rendered React 18 + TypeScript application built with Vite and styled primarily with Tailwind CSS. There is no application router: the page is composed of sections and navigation uses in-page `#hash` links.

The HTML entry point is `index.html`, which mounts `src/main.tsx`. `main.tsx` loads global styles and wraps `App` in React `StrictMode` and the shared `ErrorBoundary`.

## Main Flow

- `src/App.tsx` owns the page composition, active-section tracking, selected-project state, and global toast host.
- `src/components/Layout.tsx` provides the fixed desktop sidebar and mobile navigation around the section content.
- `src/components/Sidebar.tsx` and `src/components/MobileNav.tsx` provide navigation to section IDs. `App` tracks the most-visible `section[id]` with `IntersectionObserver` and supports opening a valid section from the URL hash.
- The rendered sections, in order, are `Home`, `About`, `Skills`, `Projects`, `DevOpsCaseStudies`, `DevOpsTimeline`, `Certifications`, `Education`, `Blog`, `GitHubProjects`, `Contact`, then `NewFooter`.
- `Projects` sends a selected `ProjectType` back to `App`; `App` conditionally renders `ProjectModal`.
- Most sections use the shared `src/hooks/useInView.tsx` hook for entrance visibility/animation behavior.

## Source Map

- `src/sections/`: page-level content grouped by portfolio section.
- `src/components/`: shared layout, navigation, project presentation, timeline/visualization, status, and error-boundary components.
- `src/hooks/`: shared React hooks; currently includes the IntersectionObserver-based `useInView` hook.
- `src/types.ts`: shared project and certification data types.
- `src/index.css`: Tailwind directives, global section/scroll styles, animation utilities, and toast styles.
- `public/`: static files served from the site root, including images, screenshots, certificates, and the CV PDF.
- `assets/`: checked-in build-related assets; `dist/` is generated output and should not be edited as source.

## Content and Data Ownership

Portfolio content is generally hard-coded in the section that renders it, rather than loaded from a CMS or local data layer. For example, project records live in `src/sections/Projects.tsx`, blog-style technical notes live in `src/sections/Blog.tsx`, and repository cards live in `src/sections/GitHubProjects.tsx`. Update those arrays when editing that content. Project records follow `ProjectType` from `src/types.ts`.

The contact form is the confirmed network-backed feature. `src/sections/Contact.tsx` posts with Axios to Formspree. It reads `VITE_FORMSPREE_ENDPOINT` and falls back to the endpoint embedded in the source; `.env.example` documents the variable. Vite client variables must use the `VITE_` prefix and are public in the browser bundle, so do not put secrets in them.

The GitHub projects and technical notes are curated local content, not live GitHub/blog API results. Dependencies such as Supabase and `react-intersection-observer` are present in `package.json`, but their presence alone does not mean they are used in the current page flow.

## Styling and UI Conventions

- Tailwind CSS 3 utility classes are the main styling mechanism; Tailwind scans `index.html` and `src/**/*.{js,ts,jsx,tsx}`.
- `src/index.css` holds global styles and reusable animation class names.
- Icons are available from both `lucide-react` and `react-icons`.
- Several sections animate when entering the viewport. Preserve reduced-motion handling in `src/index.css` when changing animation behavior.
- Section navigation depends on each section having a unique `id` matching the navigation hash. Keep IDs, links, and `App` section tracking in sync.

## Commands

Run from the repository root:

```sh
npm install
npm run dev
npm run typecheck
npm run lint
npm run build
npm run preview
```

`typecheck` runs strict TypeScript checking against `src` with `tsconfig.app.json`. `lint` runs ESLint over the repository. `build` creates the production bundle in `dist/`. No dedicated test script is currently defined in `package.json`.

## Deployment and Asset Notes

- Vite is configured with `base: '/'`; public assets are referenced by root-relative paths such as `/screenshots/...` and `/images/...`.
- `public/CNAME` indicates a custom-domain deployment setup. If deploying beneath a path instead of the domain root, review both Vite `base` and root-relative asset references.
- Put browser-served images and documents under `public/` and reference them by their public URL, not by a filesystem path.
- Some image rendering paths include fallbacks or hide failed screenshots, but verify new asset paths against the actual files under `public/`.

## Change Guidance for Future Agents

- For a new visible portfolio section, create a section component under `src/sections/`, add it to `src/App.tsx`, and add its matching section ID to desktop/mobile navigation as appropriate.
- For project-card content or modal detail, update the project records in `src/sections/Projects.tsx` and keep the shape compatible with `src/types.ts` and `src/components/ProjectModal.tsx`.
- For contact delivery changes, inspect the endpoint and `.env.example`; keep credentials and private configuration out of client-side variables.
- Prefer focused changes in the owning section/component. Do not edit generated `dist/` output to implement application behavior.
- After changes, run the narrowest relevant check; for general application changes use `npm run typecheck`, `npm run lint`, and/or `npm run build`.

## Audit Boundaries

This is a structural handoff, not a full security, accessibility, dependency-freshness, or visual regression audit. Findings above are based on the checked-in application structure and configuration; verify runtime behavior when changing integrations or deployment settings.