/**
 * A link an editor authored: a label, a destination, and how to open it.
 *
 * `href` is a plain string because that is what the site renders. A CMS that
 * models internal links as references resolves them to a path in its adapter,
 * the same way images resolve to a URL.
 */
export interface ContentLink {
  label: string;
  href: string;
  /** Anchor target. Absent means "_self". */
  target?: string;
  rel?: string;
}
