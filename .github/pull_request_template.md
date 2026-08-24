## What changed

<!-- One or two sentences. What does this PR do, and why now? -->

## Security checklist

Four things CI cannot check for you. Tick each one, or say why it does not
apply — an unticked box is a request for changes. Secrets in the diff, lockfile
drift and known CVEs are already enforced by the Security workflow; don't
re-check those here.

- [ ] **No secret reaches the client.** Anything new under `NEXT_PUBLIC_` is safe to print on a public page. `SANITY_API_READ_TOKEN` and `SANITY_REVALIDATE_SECRET` are read only in Server Components, route handlers, or `src/sanity/` — never in a file that runs in the browser.
- [ ] **New route handlers validate their input.** Every query param, path param and body field is checked before use — see `src/app/api/articles/route.ts`.
- [ ] **New mutating endpoints authenticate the caller.** Webhooks verify their signature the way `src/app/api/revalidate/route.ts` does; nothing new accepts an unauthenticated write.
- [ ] **No user or CMS input is rendered as raw HTML.** No `dangerouslySetInnerHTML` on request or CMS data; Portable Text renders through its components.

## Reviewer notes

<!-- Anything you want looked at hardest, or a decision you are unsure about. -->
