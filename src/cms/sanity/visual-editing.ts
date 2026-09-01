/**
 * The click-to-edit overlay, re-exported under a name the application binds.
 *
 * A one-line module because the boundary is the point: `src/app` cannot import
 * `next-sanity`, so the component has to be named on this side of it and bound
 * through `src/content/visual-editing.tsx`, the same way `<SanityLive />` is.
 *
 * `<VisualEditing />` is a client component that talks to the Presentation
 * tool over `postMessage`. It only does anything useful when the page is
 * carrying stega-encoded strings and is running inside the Studio's iframe, so
 * the binding renders it only while draft mode is on — mounting it on public
 * traffic would ship the overlay's JavaScript to every visitor for nothing.
 */
export { VisualEditing as SanityVisualEditing } from "next-sanity/visual-editing";
