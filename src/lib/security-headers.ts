const isDev = process.env.NODE_ENV !== "production";
const SANITY_ASSETS = "https://cdn.sanity.io";
const SANITY_API = "https://*.api.sanity.io https://*.apicdn.sanity.io";
const csp = (directives: string) => directives.replace(/\s{2,}/g, " ").trim();
const sitePolicy = csp(`
  default-src 'self';
  base-uri 'self';
  object-src 'none';
  frame-ancestors 'none';
  frame-src 'none';
  form-action 'self';
  script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""};
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: ${SANITY_ASSETS};
  media-src 'self' ${SANITY_ASSETS};
  font-src 'self' data:;
  connect-src 'self' ${SANITY_ASSETS} ${SANITY_API}${isDev ? " ws://localhost:* http://localhost:*" : ""};
  worker-src 'self' blob:;
  manifest-src 'self';
  ${isDev ? "" : "upgrade-insecure-requests;"}
`);

/**
 * Studio policy — deliberately looser, and scoped to /studio only.
 *
 * The Studio is a client-side application shipped by Sanity: the Vision plugin
 * compiles GROQ at runtime (`'unsafe-eval'`), asset uploads and image previews
 * go through `blob:`, and the editor holds a websocket for real-time document
 * sync. Google Fonts is allowed because the Studio theme loads its typeface at
 * runtime rather than bundling it.
 *
 * `frame-src` allows Sanity origins so preview panes keep working; framing the
 * Studio itself is still denied by `frame-ancestors`.
 */
const studioPolicy = csp(`
  default-src 'self';
  base-uri 'self';
  object-src 'none';
  frame-ancestors 'none';
  form-action 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' data: https://fonts.gstatic.com;
  img-src 'self' blob: data: ${SANITY_ASSETS} https://*.sanity.io;
  media-src 'self' blob: ${SANITY_ASSETS};
  connect-src 'self' blob: ${SANITY_ASSETS} https://*.sanity.io wss://*.sanity.io${isDev ? " ws://localhost:* http://localhost:*" : ""};
  frame-src 'self' blob: https://*.sanity.io;
  worker-src 'self' blob:;
  manifest-src 'self';
  ${isDev ? "" : "upgrade-insecure-requests;"}
`);

/**
 * Headers that are identical for both scopes.
 *
 * `X-Frame-Options` duplicates `frame-ancestors` on purpose — it is the
 * backstop for anything that does not implement CSP Level 2.
 *
 * HSTS is production-only: sent over plain http it is ignored by browsers, but
 * emitting it in `next dev` is noise that suggests localhost is protected.
 */
const commonHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  ...(isDev
    ? []
    : [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ]),
];

/**
 * Matched in order; for a repeated key the last match wins, so the /studio
 * entry must come second to override the site's CSP.
 *
 * `/studio/:path*` also matches `/studio` itself — a `*` modifier means zero
 * or more segments.
 *
 * COOP differs by scope: the site gets full isolation, while the Studio needs
 * `same-origin-allow-popups` so the Sanity login popup keeps its handle on the
 * window that opened it.
 */
export const securityHeaders = [
  {
    source: "/(.*)",
    headers: [
      ...commonHeaders,
      { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
      { key: "Content-Security-Policy", value: sitePolicy },
    ],
  },
  {
    source: "/studio/:path*",
    headers: [
      ...commonHeaders,
      {
        key: "Cross-Origin-Opener-Policy",
        value: "same-origin-allow-popups",
      },
      { key: "Content-Security-Policy", value: studioPolicy },
    ],
  },
];
