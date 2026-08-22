# `src/sanity`

The content layer. Nothing outside this folder knows where content comes from.

```
env.ts            projectId / dataset / apiVersion — safe to import anywhere
client.ts         the read client (SERVER-SIDE ONLY, carries the read token)
image.ts          urlFor() for Sanity image assets
sanity.config.ts  Studio config — mounted at /studio
sanity.cli.ts     CLI + TypeGen config
structure.ts      Studio sidebar; singletons are pinned here
schema-types/     the content model — documents/, sections/, objects/
types/            the content contract — every content shape in the app
queries/          GROQ, one file per top-level fetch
repositories/     the seam: async functions the app calls
```

Everything is CMS-backed. There are no fixtures.

## The rule

Routes and components call **repositories**. They never import a query or the
client. Repositories return the shape the components already expect — images
arrive as plain URL strings because the GROQ resolves `.asset->url`, so no
component ever handles a Sanity image object.

`client.ts` carries `SANITY_API_READ_TOKEN`, which must never reach the
browser. There is no build-time guard on it — keep it correct by construction:
repositories are only reached from Server Components and route handlers.

### Caching and live updates

Page reads go through `sanityFetch` from `live.ts`, and `<SanityLive />` is
mounted in the site layout. Two independent things invalidate the data cache,
and the site needs both:

- **Live events.** `<SanityLive />` holds an SSE connection to the Live Content
  API. Each `sanityFetch` response is stored under the *sync tags* Sanity
  returns for it, so a publish names the exact entries to expire and the router
  refreshes. This is what updates a page someone already has open — the piece
  `revalidateTag` alone cannot do, because invalidating the server cache gives
  an already-rendered browser tab no reason to ask again.
- **The webhook.** A live event only reaches browsers that are *connected*. If
  nobody is on the site when an editor publishes, nothing fires, and entries
  written with `revalidate: false` would serve the next visitor stale content.
  `/api/revalidate` has no such dependency, so `documentTags(...)` is passed on
  every read to keep the `sanity:<type>` tags working as the backstop.

Note that `defineLive` reconfigures the client with `useCdn: true`, overriding
`client.ts`. That is safe here: those reads are sent with `cacheMode:
"noStale"` and every entry is expired by name, so the stale-CDN-response-frozen-
forever failure that motivated `useCdn: false` can no longer happen. The direct
`client.fetch` reads that remain still honour it.

`sanityFetch` issues two requests for a cache miss — one to learn the sync tags,
one for the cached result. The tag probe is not cached, so a dynamic route pays
one CDN round trip per request even on a data-cache hit.

The `generateStaticParams` slug queries use `uncached()` instead. They must not
read a slug list restored from a previous build's `.next/cache`: a build that
reads a stale empty list silently ships a site with zero prerendered pages.

## Content model

- **`page`** — the page builder. `sections[]` is a reorderable union, so
  editors can add, move and remove sections without a developer. The home page
  is the `home` slug, pinned in `structure.ts` as document `page-home`.
  `src/components/site/section-renderer.tsx` maps `_type` to a component and
  keeps each section's `dynamic()` boundary and loading skeleton.
- **`article`** — the /post listing and detail pages. Ordered by the explicit
  `order` field: only three of sixty articles carry a publish date, so the
  listing cannot be sorted by one. An article renders in-site only once it has
  a body; until then its card links out via `href`.
- **`report`** — the root-level `/[slug]` landing pages.
- **`testimonialsSection`** — a singleton, referenced by the page builder's
  testimonials block and read directly by /contact.
- **`siteSettings`** — a singleton holding everything that appears on every
  page (logo, navigation, footer, SEO defaults) plus the copy that belongs to
  a route rather than a document (contact page, post listing, report download
  form). `Header`, `SiteFooter`, `ContactForm` and `DownloadReportForm` are
  client components, so each has a thin server wrapper in its `index.tsx` that
  fetches this and passes it down — call sites stay `<Header />`.

Article bodies are real Portable Text. The original `variant: "statements"`
list became a third list style, because Portable Text has no list container to
hang a flag off. See `schema-types/objects/post-body.ts` and the renderer in
`src/components/sections/post-detail/post-block.tsx`.

## Images and video

Every image is a Sanity asset and editors can replace it in the Studio.

**Video never goes into Sanity.** File assets are served as raw downloads with
no transcoding or adaptive streaming, and the bandwidth bills are brutal. Hero
and growth-spurt videos stay `/public` paths in a plain string field. Audio
clips on testimonials are the same.

Some images have a `…Src` / `legacySrc` sibling field. Those are fallbacks for
files that are referenced but not in the repo — the whole `/public/post/`
folder and one hero poster, 66 files, which 404 today and always have. The
query does `coalesce(image.asset->url, legacySrc)`, so behaviour is unchanged
until someone uploads a real image, which then wins.

## Running the Studio

The Studio is **embedded** — served by Next.js itself, not a separate server.
There is no `sanity dev` here: that command needs a `package.json` in the
config folder, and `src/sanity` deliberately does not have one.

```bash
pnpm cms     # next dev, and prints the Studio URL
```

Then open <http://localhost:3000/studio>.

| Script               | Does                                                     |
| -------------------- | -------------------------------------------------------- |
| `pnpm cms`           | Runs the app + Studio, printing the Studio URL            |
| `pnpm typegen`       | Re-extracts the schema and regenerates `sanity.types.ts`  |
| `pnpm schema:deploy` | Uploads the schema so MCP / editor tooling can see it     |
| `pnpm sanity <cmd>`  | Any Sanity CLI command, run from `src/sanity`             |

`pnpm sanity` exists because the CLI resolves `sanity.cli.ts` from its working
directory, so every CLI call has to happen inside `src/sanity`:

```bash
pnpm sanity cors add https://www.growthops.asia --credentials
pnpm sanity manage
pnpm sanity documents query '*[_type == "page"][0].slug.current'
```

Two consequences of embedding:

- **No TypeGen watch mode.** Run `pnpm typegen` after every schema or query
  change.
- **Every Studio version bump needs an app redeploy**, so `sanity`,
  `@sanity/vision` and `next-sanity` are pinned to exact versions.

The Studio config must be imported behind a client boundary — see the comment
in `src/app/(studio)/studio/[[...tool]]/studio.tsx`.

## Backup and restore

The dataset is now the source of truth, so back it up rather than the code:

```bash
pnpm sanity dataset export production ../../.sanity-backups/<name>.tar.gz
pnpm sanity dataset import  ../../.sanity-backups/<name>.tar.gz production
```

`.sanity-backups/` is gitignored. A pre-migration export is already there.

### Migration scripts

The one-off scripts that seeded this dataset are **not** in the repo, and
should not come back. Keeping them is a hazard: the site-settings seeder does
`createOrReplace` on `siteSettings` and replaces a section of the home page,
so re-running it after an editor has made changes silently destroys their
work. Restoring content is `dataset import`, not re-running a seeder.

The old fixtures those scripts read are in git at `281369d` under
`src/sanity/fixtures/`. The scripts themselves were never committed: the two
most recent are archived on disk at `.sanity-backups/migration-scripts/`, and
the earlier fixture-based ones were deleted outright and are gone.

## Dependency note

`@sanity/client` is pinned to **7.26.2**. Do not move it to 8.x: `next-sanity`
imports `unstable__adapter` from it, which 8.x removed, and the module fails to
load at all. The 8.x copy you may see in the tree belongs to `@sanity/cli-core`
and is unrelated to what the app imports.

## What deliberately stays in code

Not everything that looks like a string belongs to an editor:

- **Form wiring** — `contact-form.fields.ts` and
  `download-report-form.fields.ts` hold each field's `name`, `type` and
  `autoComplete`. `name` is what the form posts and `autoComplete` drives
  browser autofill, so an editor changing one breaks submission silently. Every
  visible label, placeholder, option and validation message is editable in
  `siteSettings`.
- **Validation rules** — the Radix `match` values (`valueMissing`,
  `typeMismatch`). Only their wording is editable.
- **Social icons** — react-icons components, chosen by the `platform` key.
  Adding a platform in the Studio without adding it to the map in
  `site-footer-view.tsx` renders no icon.
- **Accessibility labels** — "Toggle navigation menu", "Scroll testimonials
  left", "Back to what we're thinking". These are interface affordances rather
  than content, and a well-meaning edit degrades screen-reader behaviour with
  no visible symptom. Move them only on request.
- **Design tokens** — `overlayColor` is a Tailwind class name, and the team
  card gradients are hex pairs. They are stored as strings, but they are design
  decisions with a fixed vocabulary.

One rendering note: the growth-validation award tile used a Tailwind
arbitrary-value background class (a `bg-` utility wrapping a literal image
URL). Tailwind generates those by scanning source at build time, so a
CMS-supplied URL cannot produce one. It is now an inline
`style={{ backgroundImage }}`; `bg-cover bg-center` still come from classes.

Do not write that arbitrary-value syntax literally in any file, **including
markdown**. Tailwind v4 scans the whole project for class candidates, so a
documentation example generates a real CSS rule — and an unresolvable URL
inside it fails the build with `Module not found`. That is exactly how the
first draft of this paragraph broke `pnpm build`.

## What is deliberately not here

`components/site/header/header.data.ts` (navigation) and
`components/sections/contact-form/contact-form.data.ts` (form field
definitions) are configuration, not editorial content. Move them here only if
someone actually needs to edit them in Studio.
