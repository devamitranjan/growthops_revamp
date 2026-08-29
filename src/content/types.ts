/**
 * The content contract, as one import.
 *
 * Every type lives in the domain folder that owns it; this file is the seam
 * that keeps a single specifier — `@/content/types` — resolving from the ~50
 * places in the app that read one, so a domain can be reorganised without
 * touching a component. It is also the line the application is not supposed to
 * see past: a component importing from here cannot tell which CMS is behind
 * it, and that is the whole point.
 *
 * **Type-only, deliberately.** `export type *` is erased at compile time, so
 * this barrel can never put a module on a bundle's import graph. One value
 * export here and it becomes a real module in every bundle that touches it —
 * including browser ones, which is how `SANITY_API_READ_TOKEN` would get
 * there. Values live in `repositories.ts`, which is server-only for exactly
 * that reason.
 */

export type * from "./models/image";
export type * from "./models/link";
export type * from "./models/rich-text";
export type * from "./models/seo";

export type * from "./domain/article/article.types";
export type * from "./domain/newsroom/newsroom.types";
export type * from "./domain/page/page.types";
export type * from "./domain/report/report.types";
export type * from "./domain/site-settings/site-settings.types";
export type * from "./domain/testimonial/testimonial.types";

export type * from "./sections/section.types";
export type * from "./sections/shared.types";
