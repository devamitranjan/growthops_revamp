import { NextStudioLayout } from "next-sanity/studio";

/**
 * Second root layout, for /studio only.
 *
 * Deliberately bare: the Studio ships its own reset and theming, and must not
 * inherit the site's fonts or Tailwind preflight. Navigating
 * between /studio and the site triggers a full page load, which is expected
 * with multiple root layouts and is what we want here.
 *
 * `suppressHydrationWarning` mirrors the site layout: browser extensions
 * commonly add attributes to <body> before React hydrates, which otherwise
 * reports as a hydration mismatch. It only suppresses warnings for this
 * element's own attributes, not for anything rendered inside it.
 */
export default function StudioRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }} suppressHydrationWarning>
        <NextStudioLayout>{children}</NextStudioLayout>
      </body>
    </html>
  );
}
