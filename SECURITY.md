# Security policy

## Reporting a vulnerability

Do not open a public issue. Email **connectdevamit@gmail.com** with the affected
URL or file, what an attacker can do with it, and the steps to reproduce.

Expect an acknowledgement within 3 working days and an assessment within 10.
Please give us 90 days before disclosing publicly.

## What is in scope

This is a marketing site backed by a Sanity CMS. The things worth reporting:

- Anything that reads or writes Sanity content without going through the CMS —
  in particular anything that reaches draft or unpublished documents.
- A request that forges a valid revalidation webhook (`/api/revalidate`).
- A server-side secret (`SANITY_API_READ_TOKEN`, `SANITY_REVALIDATE_SECRET`)
  reachable from the browser.
- Stored or reflected XSS through CMS content.
- Access to `/studio` by an account that should not have it.

Out of scope: missing security headers reported by a scanner with no working
exploit, volumetric denial of service, results from automated tools with no
demonstrated impact, and social engineering.

## Secrets

Secrets live in `.env.local` locally and in the hosting provider's environment
settings in production. They are never committed — `.gitignore` excludes `.env*`
and every PR is scanned by gitleaks over full history.

Only `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` and
`NEXT_PUBLIC_SANITY_API_VERSION` are safe to expose to the browser. A project ID
is public by design; a read token is not.

If a secret is exposed: rotate it in Sanity first, then update the hosting
environment, then clean the history. Rotation comes first — a secret in a
deleted commit is still a secret someone already has.
