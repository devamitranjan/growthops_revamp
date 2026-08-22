# GrowthOps Asia

The marketing site for [GrowthOps Asia](https://www.growthops.asia), a growth marketing and creative agency helping ASEAN brands accelerate performance through data-driven strategy, creative, and technology. Built with Next.js 16 (App Router), React 19, Tailwind CSS v4, and GSAP.

## Getting Started

This project uses [pnpm](https://pnpm.io) (see `packageManager` in `package.json`).

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The page auto-updates as you edit files under `src/`.

### Environment

Copy the Sanity credentials into `.env.local`:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=          # server-only, never prefix with NEXT_PUBLIC_
```

Content is currently served from fixtures, so the site runs without these — see
[Content layer](#content-layer) below.

## Project Structure

```
src/
  app/                   # Routes only — every page is a server component
    (reports)/[slug]/    # Gated report landing pages, addressed at the site root
    api/                 # Route handlers backing the client-side hooks
    post/                # Article listing (/post) and detail (/post/[slug])
    contact/
    layout.tsx           # Root layout, fonts, metadata, QueryProvider
    page.tsx             # Home page composition
    globals.css          # Tailwind v4 entry point and design tokens
  components/
    sections/            # Page sections (hero-banner, unrivaled-growth, ...)
    site/                # Chrome: header, site-footer, query-provider
    ui/                  # Small shared primitives (section-header, icons, ...)
  hooks/                 # Client data hooks (use-articles) and UI hooks (use-audio-player)
  lib/                   # api (fetch wrapper), query-keys, event-bus, format-time
  sanity/                # The content layer — see src/sanity/README.md
public/                  # Static assets, one kebab-case folder per section
```

`@/*` resolves to `./src/*` (see `tsconfig.json`).

Sections are self-contained folders: the component, its `*.hooks.ts`, any
sub-components, and an `index.ts` barrel. They take content as props and never
fetch — which is what lets the same section render on more than one page.

### Routes

| Route                                                | Source                                                                                                |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `/`                                                  | `src/app/page.tsx`                                                                                    |
| `/contact`                                           | `src/app/contact/page.tsx`                                                                            |
| `/post`, `/post/[slug]`                              | `src/app/post/`                                                                                       |
| `/[slug]`                                            | `src/app/(reports)/[slug]/page.tsx` — report pages; the `(reports)` group keeps them at the site root |
| `/api/articles`, `/api/reports`, `/api/testimonials` | `src/app/api/`                                                                                        |

## Content layer

Everything editorial lives behind `src/sanity`, and nothing outside that folder
knows where content comes from. Sanity is **not wired up yet** — the package is
not installed and the client in `src/sanity/client.ts` is still commented out —
but types, GROQ, and repository signatures are already CMS-shaped, so switching
over means editing repository bodies and nothing else.

```
src/sanity/
  types/          the content contract — one page shape per document type
  queries/        GROQ, one file per top-level fetch
  repositories/   the seam: async functions the app calls
  fixtures/       today's hardcoded content, TEMPORARY
```

**The rule: routes and components call repositories.** Never a fixture, a query,
or the client directly. See [`src/sanity/README.md`](src/sanity/README.md) for
the content model and the step-by-step switch-on.

### Data flow

Two paths, both ending at the same repository:

- **Server components** import repositories directly and render with the result
  (`src/app/page.tsx` awaits `getHomePage()` and `getTestimonials()` in parallel).
  This is the default — most content never reaches the client as a fetch.
- **Client components** go through `src/hooks/use-*` → React Query → `apiGet`
  → a route handler in `src/app/api/` → the same repository.

The second hop exists because `SANITY_API_READ_TOKEN` is server-only, so
repositories must stay server-side.

`src/lib/api.ts` owns the fetch wrapper: a 10s timeout and an `ApiError`
carrying `status` and `Retry-After`. It deliberately does **not** retry —
retry policy lives in `src/components/site/query-provider.tsx` only, so the two
layers can't multiply attempts. Cache keys are centralised in
`src/lib/query-keys.ts`.

## Scripts

```bash
pnpm dev      # Start the dev server
pnpm build    # Production build
pnpm start    # Start the production server
pnpm lint     # Run ESLint
pnpm commit   # Commit via Commitizen (cz-git) prompt
```

## Conventions

- **File & folder naming**: kebab-case throughout `src/` and `public/`, up to
  three hyphen-separated words. `eslint-plugin-check-file` is wired up in
  `eslint.config.mjs`, but its rule set is currently empty — the convention is
  followed by hand, not enforced.
- **Component files**: one concern per file, co-located in the section folder.
  Animation logic belongs in a sibling `*.hooks.ts`, not inline in the JSX.
- **Content shapes**: only `src/sanity/types` defines them. Components import
  from `@/sanity/types`; they don't declare their own content interfaces.
- **Commits**: linted with `commitlint` (conventional commits) via a Husky
  `commit-msg` hook. Use `pnpm commit` for a guided prompt.
- **Pre-commit**: staged JS/TS files are auto-fixed with ESLint via `lint-staged`.
- **Styling**: Tailwind CSS v4 (`src/app/globals.css`, via `@tailwindcss/postcss`).
  The site is dark-only — `dark` is hardcoded on `<html>`.
- **GSAP**: `<body>` must stay a plain block box. Pin-spacing cannot grow the
  document through a flex-column body, which silently kills every pinned section.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Sanity Documentation](https://www.sanity.io/docs)

## Deploy on Vercel

The easiest way to deploy this app is via the [Vercel Platform](https://vercel.com/new). See the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for details.
