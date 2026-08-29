# `src/content` — the content layer

What the application knows about content. **No CMS appears anywhere in here**,
and ESLint fails the build if one starts to.

The point is not that the CMS is hidden for its own sake. It is that the
seventeen sections, the article body renderer, the routes and the metadata
builder are all things this site would still need if it moved to Contentful
next year — and none of them should have to change when it does.

```text
                    Next.js application
                   src/app · src/components
                             │
                             │  @/content/types   (shapes)
                             │  @/content/repositories  (instances)
                             ▼
                        src/content
                    domain models + contracts
                             ▲
                             │  implements
                             │
                        src/cms/sanity
                             │
                    GROQ · @sanity/client
                             ▼
                          Sanity
```

## Layout

```
models/              the vocabulary every domain shares
  image.ts             ContentImage — a resolved URL, never an asset handle
  link.ts              ContentLink
  rich-text.ts         RichText — authored copy, as a renderable tree
  seo.ts               SeoMetadata

domain/<name>/       one folder per content type
  <name>.types.ts        what the application gets
  <name>.repository.ts   the interface — what the application can ask for
  article.pagination.ts  (article only) how the archive splits into pages

sections/            the page builder
  section.types.ts       the PageSection union, keyed on the app's own `type`
  shared.types.ts        shapes more than one section is built from

types.ts             type-only barrel — what `@/content/types` resolves to
repositories.ts      THE COMPOSITION POINT — the one file naming a CMS
live.tsx             composition: <ContentLive />
revalidation.ts      composition: parseContentWebhook
```

`domain/`, `models/`, `sections/` and `types.ts` are the **interface layer**:
types and interfaces, no values, no imports outside `@/content`. Everything a
CMS does differently is already resolved by the time a shape here describes it
— an image is a URL string, an identifier is `id`, a slug is a string, and a
body is `RichText` rather than Portable Text.

The three files at the root are the **composition layer**, and they are the
only place the arrow reverses: they import an implementation from
`src/cms/sanity` and bind it to the contract above. `repositories.ts` and
`revalidation.ts` are `server-only` — they reach the CMS client, which carries
a read token.

## Using it

```tsx
// A Server Component or route handler:
import { pageRepository } from "@/content/repositories";

const page = await pageRepository.getByPath("about");
```

```tsx
// Anything that only needs a shape:
import type { PageSection, SiteSettings } from "@/content/types";
```

A client component never reads content. It takes it as props from a Server
Component — which is what keeps the read token on the server, and what the
`server-only` import turns from a convention into a build error.

## Swapping the CMS

The work is bounded, and this is what it is:

1. Write `src/cms/<name>/` with a repository per contract in `domain/`, each
   one mapping that CMS's responses to the domain types before returning them.
   The Sanity adapter is the worked example; its `README.md` describes the
   shape.
2. Point the five bindings in `repositories.ts` at the new implementations, and
   the two in `live.tsx` / `revalidation.ts` at whatever the new CMS offers for
   live updates and publish webhooks (`ContentLive` may legitimately render
   `null`).
3. Model the seventeen sections in the new CMS and map its type names onto the
   `PageSection` discriminants — the Sanity side does this in one table in
   `sections/section.mapper.ts`.
4. Convert its rich text to `RichText`. This is the only conversion with real
   depth to it, and `src/cms/sanity/rich-text/` shows what it involves.
5. Delete `src/cms/sanity`.

`src/app`, `src/components` and this folder do not change.
