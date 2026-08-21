# `src/sanity`

The content layer. Nothing outside this folder knows where content comes from.

```
client.ts        connection config (no client yet — see the header comment)
types/           the content contract — every content shape in the app
queries/         GROQ, one file per top-level fetch
repositories/    the seam: async functions the app calls
fixtures/        today's hardcoded content, TEMPORARY
```

## The rule

Routes and components call **repositories**. They never import a fixture, a
query, or the client. Every repository function is already `async` and already
returns the CMS-shaped object, so turning Sanity on does not change a single
call site.

## Turning Sanity on

Credentials are already in `.env.local` (`NEXT_PUBLIC_SANITY_PROJECT_ID`,
`NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_READ_TOKEN`).

1. `pnpm add next-sanity @sanity/image-url`
2. Uncomment the `createClient` block in `client.ts`.
3. Model the documents in Studio to match `types/` — the GROQ in `queries/`
   already projects into those exact shapes.
4. Rewrite one repository body at a time:

   ```ts
   // before
   export async function getTestimonials(): Promise<ITestimonialsData> {
     return testimonials;
   }

   // after
   export async function getTestimonials(): Promise<ITestimonialsData> {
     return client.fetch(TESTIMONIALS_QUERY);
   }
   ```

5. When a repository no longer reads a fixture, delete that fixture file.
   `fixtures/` being empty is the signal that the migration is done.

Optionally wrap the GROQ strings in `defineQuery` and run Sanity TypeGen; the
generated result types can then replace the hand-written ones in `types/`.

## What is deliberately not here

`components/site/header/header.data.ts` (navigation) and
`components/sections/contact-form/contact-form.data.ts` (form field
definitions) are configuration, not editorial content. Move them here only if
someone actually needs to edit them in Studio.
