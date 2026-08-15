# GrowthOps Asia

The marketing site for [GrowthOps Asia](https://www.growthops.asia), a growth marketing and creative agency helping ASEAN brands accelerate performance through data-driven strategy, creative, and technology. Built with Next.js (App Router), React 19, and Tailwind CSS v4.

## Getting Started

This project uses [pnpm](https://pnpm.io) (see `packageManager` in `package.json`).

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result. The page auto-updates as you edit files under `app/`.

## Project Structure

```
app/
  features/landing/   # Landing page sections (hero, growth spurts, services grid, etc.)
  shared/
    components/       # Reusable components (site footer, section header, ...)
    hooks/             # Shared hooks (e.g. use-horizontal-scroll)
    utils/              # Shared utilities (e.g. event-bus)
  assets/              # Inline icon/asset components
  layout.tsx           # Root layout, fonts, and metadata
  page.tsx             # Home page composition
public/                # Static assets, organized into kebab-case folders per section
```

The home page (`app/page.tsx`) currently composes `GrowthSpurts`, `ServicesGrid`, `ArticleCards`, `GrowthValidation`, and `TeamSection`. Additional landing sections (`Header`, `HeroBanner`, `UnrivaledGrowth`, `CaseStudy`, `Testimonials`) live in `app/features/landing` but are intentionally excluded from the page for now.

## Scripts

```bash
pnpm dev      # Start the dev server
pnpm build    # Production build
pnpm start    # Start the production server
pnpm lint     # Run ESLint
pnpm commit   # Commit via Commitizen (cz-git) prompt
```

## Conventions

- **File & folder naming**: everything under `app/` and `public/` must be kebab-case, up to three hyphen-separated words (enforced by `eslint-plugin-check-file`).
- **Commits**: commit messages are linted with `commitlint` (conventional commits) via a Husky `commit-msg` hook. Use `pnpm commit` for a guided prompt.
- **Pre-commit**: staged JS/TS files are auto-fixed with ESLint via `lint-staged` and a Husky `pre-commit` hook.
- **Styling**: Tailwind CSS v4 (see `app/globals.css`, configured via `@tailwindcss/postcss`).

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Deploy on Vercel

The easiest way to deploy this app is via the [Vercel Platform](https://vercel.com/new). See the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for details.
