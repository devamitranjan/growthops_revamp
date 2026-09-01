# GrowthOps Asia

The marketing site for [GrowthOps Asia](https://www.growthops.asia), a growth marketing and creative agency helping ASEAN brands accelerate performance through data-driven strategy, creative, and technology. Built with Next.js 16 (App Router), React 19, Tailwind CSS v4, GSAP, and Sanity.

## Getting Started

This project uses [pnpm](https://pnpm.io) (see `packageManager` in `package.json`).

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The page auto-updates as you edit files under `src/`.

Use `pnpm cms` instead when you are working on content — same dev server, but it prints the Studio URL.

### Environment

Copy the Sanity credentials into `.env.local`:

```bash
SANITY_API_READ_TOKEN=          # required — server-only, never prefix with NEXT_PUBLIC_
SANITY_REVALIDATE_SECRET=       # shared with the Sanity webhook, see below
NEXT_PUBLIC_SANITY_PROJECT_ID=  # optional, defaults in src/cms/sanity/env.ts
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION= # optional, pinned in env.ts
```

Only the read token is genuinely required. This Sanity project returns an
empty result set to unauthenticated callers, so without it the first
prerendered route finds no `siteSettings` document and the build fails.
The three public values have literal fallbacks in
[`src/cms/sanity/env.ts`](src/cms/sanity/env.ts) — leave them unset rather
than set them empty, because an empty string is *defined* and defeats the
`??`.

### Publishing a change

Pages are prerendered and read through the Sanity CDN, so a publish only
reaches the live site when something invalidates the cache. Two things do,
and the site needs both: `<SanityLive />` refreshes pages that are already
open, and a Sanity webhook pointed at `/api/revalidate` covers the case
where nobody is on the site when an editor publishes. The setup that
webhook expects is documented at the top of
[`src/app/api/revalidate/route.ts`](src/app/api/revalidate/route.ts), and
reads are tagged per document type in
[`src/cms/sanity/tags.ts`](src/cms/sanity/tags.ts). See
[Content layer](#content-layer) below.

## Project Structure

```
src/
  app/                   # Routes only — every page is a server component
    (site)/              # The public site
      [...slug]/         # Every CMS-authored page — /contact, /newsroom, ...
      post/              # Article listing (/post) and detail (/post/[slug])
      reports/[slug]/    # Gated report landing pages
      faq-preview/       # Standalone FAQ section preview, fixed sample copy
      layout.tsx         # Root layout, fonts, site-wide metadata
      page.tsx           # Home page
    (studio)/studio/     # The embedded Sanity Studio — the one CMS-aware route
    api/                 # Route handlers (revalidate webhook, JSON reads)
    globals.css          # Tailwind v4 entry point and design tokens
  components/
    sections/            # Page sections (banner, unrivaled-growth, ...)
    site/                # Chrome: header, site-footer, section-renderer
    ui/                  # Small shared primitives (section-header, icons, ...)
  content/               # CMS-agnostic domain layer — see src/content/README.md
    models/              # Shared vocabulary: ContentImage, ContentLink, RichText, Seo
    domain/              # One folder per content type: types + repository contract
    sections/            # The PageSection union the page builder renders
    types.ts             # Type-only barrel — what @/content/types resolves to
    repositories.ts      # The composition point: the one file naming a CMS
  cms/sanity/            # The Sanity adapter — see src/cms/sanity/README.md
    documents/           # One folder per document type, every layer inside it
    sections/            # The page-builder library (17 sections today)
    rich-text/           # Portable Text -> RichText
    studio/              # The Studio sidebar
    preview/             # The Studio's live-editing surface
    generated/           # TypeGen output — an implementation detail
  hooks/                 # UI hooks (use-audio-player, use-carousel-*)
  lib/                   # page-metadata, event-bus, format-time
public/                  # Static assets, one kebab-case folder per section
```

`@/*` resolves to `./src/*` (see `tsconfig.json`).

Sections are self-contained folders: the component, its `*.hooks.ts`, any
sub-components, and an `index.ts` barrel. They take content as props and never
fetch — which is what lets the same section render on more than one page.

### Routes

| Route                     | Source                                                               |
| ------------------------- | -------------------------------------------------------------------- |
| `/`                       | `src/app/(site)/page.tsx` — the `page-home` document                 |
| `/contact`, `/newsroom`, … | `src/app/(site)/[...slug]/page.tsx` — any published page, no deploy needed |
| `/post`                   | `src/app/(site)/post/page.tsx` — its own route so `?page=` can 404   |
| `/post/[slug]`            | `src/app/(site)/post/[slug]/page.tsx`                                |
| `/reports/[slug]`         | `src/app/(site)/reports/[slug]/page.tsx`                             |
| `/studio`                 | `src/app/(studio)/studio/[[...tool]]/page.tsx`                       |
| `/api/*`                  | `src/app/api/`                                                       |

## Content layer

**Sanity is an implementation detail.** The application depends on
CMS-agnostic domain models and repository contracts in
[`src/content`](src/content/README.md); every Sanity-specific line — GROQ, the
client, schemas, the Studio, Portable Text — is behind
[`src/cms/sanity`](src/cms/sanity/README.md), and ESLint fails the build if one
escapes.

```text
      src/app · src/components
                 │  @/content/types · @/content/repositories
                 ▼
             src/content          the contract
                 ▲
                 │  implements
             src/cms/sanity       the adapter
                 ▼
               Sanity
```

**The rule: routes and components import from `@/content`.** Repository
*instances* come from `@/content/repositories`, shapes from `@/content/types`.
Nothing outside `src/cms/sanity` and the `/studio` mount imports a CMS package,
and nothing outside those two knows what `_type`, `_ref` or `slug.current` are.

```tsx
import { pageRepository } from "@/content/repositories";
import type { PageSection } from "@/content/types";
```

The two boundary rules live in `eslint.config.mjs`: `src/content/domain`,
`models` and `sections` may not name a CMS even in an `import type`, and
`src/app`, `src/components`, `src/hooks` and `src/lib` may not reach into
`@/cms` — with `src/app/(studio)` as the one deliberate exception, because
the Studio *is* Sanity.

### Data flow

Content is read on the server and rendered there:

- **Server components and route handlers** call a repository and render the
  result. This is the only path that touches the CMS.
- **Client components** take content as props from a Server Component. They
  never fetch it, because `SANITY_API_READ_TOKEN` is server-only — an
  `import "server-only"` in the composition root turns a mistake here into a
  build error rather than a token in a browser bundle.

The handlers under `src/app/api/` expose the same repositories as JSON for
external callers; the site itself does not use them to render.

### Swapping the CMS

`src/content/repositories.ts` binds five contracts to five implementations,
and `live.tsx` / `revalidation.ts` bind the other two capabilities. Those
seven lines and a new `src/cms/<name>/` are the whole job —
`src/app` and `src/components` do not change. See
[`src/content/README.md`](src/content/README.md).

## Scripts

```bash
pnpm dev            # Start the dev server
pnpm cms            # Same, but prints the Studio URL
pnpm build          # Production build
pnpm start          # Start the production server
pnpm lint           # Run ESLint
pnpm typecheck      # next typegen && tsc --noEmit
pnpm typegen        # Re-extract the Sanity schema, regenerate generated/sanity.types.ts
pnpm schema:deploy  # Upload the schema so MCP / editor tooling can see it
pnpm sanity <cmd>   # Any Sanity CLI command, run from src/cms/sanity
pnpm commit         # Commit via Commitizen (cz-git) prompt
```

**Run `pnpm typegen` after every schema or query change.** The Studio is
embedded in the Next.js app rather than run by `sanity dev`, so there is no
TypeGen watch mode. `generated/sanity.types.ts` is what types `sanityFetch`,
so a projection that has drifted from its schema surfaces as a compile error
where the mapper is called.

CI (`.github/workflows/ci.yml`) runs `pnpm lint`, `pnpm typecheck` and
`pnpm build` on every PR to `main` or `develop`, with
`pnpm install --frozen-lockfile` as the gate on an unregenerated lockfile.

## TypeScript

Type checking runs on **TypeScript 7**, the native compiler. TS 7.0 ships
without a JavaScript compiler API and `typescript-eslint` still needs one, so
the two releases are installed side by side the way the TypeScript team
[documents](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/#running-side-by-side-with-typescript-6.0):

| `package.json` entry | What it is | Who uses it |
| --- | --- | --- |
| `@typescript/native` → `typescript@7` | The native compiler. Owns the `tsc` bin. | `pnpm typecheck` |
| `typescript` → `@typescript/typescript6` | The TS 6.0 JS compiler API. Owns `tsc6`. | `typescript-eslint`, `next build` |

TS 6.0 and TS 7.0 are the same language version, so the two agree on what type
checks; only the implementation differs.

`next build` type checks through the JS API instead of its default `tsc` CLI
checker, because that checker looks for `typescript/bin/tsc` and the 6.0 compat
package ships `bin/tsc6`. That is what `experimental.useTypeScriptCli: false`
in `next.config.ts` selects.

Leave the editor on its bundled TypeScript. *TypeScript: Select TypeScript
Version → Use Workspace Version* looks for `node_modules/typescript/lib/tsserver.js`,
which the compat package does not ship.

Drop both entries for a plain `typescript` dependency once
[typescript-eslint supports TS 7](https://github.com/typescript-eslint/typescript-eslint/issues/10940).

## Conventions

- **File & folder naming**: kebab-case throughout `src/` and `public/`, up to
  three hyphen-separated words. `eslint-plugin-check-file` is wired up in
  `eslint.config.mjs`, but its rule set is currently empty — the convention is
  followed by hand, not enforced. The CMS-boundary rules in the same file *are*
  enforced.
- **Component files**: one concern per file, co-located in the section folder.
  Animation logic belongs in a sibling `*.hooks.ts`, not inline in the JSX.
- **Content shapes**: only `src/content` defines them. Components import from
  `@/content/types`; they don't declare their own content interfaces, and they
  never import from `src/cms`.
- **Barrels**: a `src/cms/sanity` feature folder has no `index.ts` — importing
  by folder would put the token-carrying client on a browser bundle's import
  graph. Import by file there.
- **Commits**: linted with `commitlint` (conventional commits) via a Husky
  `commit-msg` hook. Use `pnpm commit` for a guided prompt.
- **Pre-commit**: staged JS/TS files are auto-fixed with ESLint via `lint-staged`.
- **Styling**: Tailwind CSS v4 (`src/app/globals.css`, via `@tailwindcss/postcss`).
  The site is dark-only — `dark` is hardcoded on `<html>`. Never write Tailwind
  arbitrary-value syntax in any file, markdown included: v4 scans the whole
  project for class candidates, and an unresolvable URL inside one fails the build.
- **GSAP**: `<body>` must stay a plain block box. Pin-spacing cannot grow the
  document through a flex-column body, which silently kills every pinned section.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Sanity Documentation](https://www.sanity.io/docs)

## Deploy on Vercel

The easiest way to deploy this app is via the [Vercel Platform](https://vercel.com/new). See the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for details.
