import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { SanityLive } from "@/sanity/live";
import { getSiteSettings } from "@/sanity/repositories/site-settings";

import "../globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSiteSettings();

  const images = s.ogImage
    ? [
        {
          url: s.ogImage,
          width: s.ogImageWidth,
          height: s.ogImageHeight,
          alt: s.ogImageAlt,
        },
      ]
    : undefined;

  return {
    metadataBase: new URL(s.siteUrl),
    title: { default: s.defaultTitle, template: s.titleTemplate },
    description: s.defaultDescription,
    icons: { shortcut: "/logo-min.ico" },
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      url: s.siteUrl,
      siteName: s.siteName,
      title: s.defaultTitle,
      description: s.defaultDescription,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: s.defaultTitle,
      description: s.defaultDescription,
      images: s.ogImage ? [s.ogImage] : undefined,
    },
    verification: s.googleSiteVerification
      ? { google: s.googleSiteVerification }
      : undefined,
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`dark ${montserrat.variable} h-full antialiased`}
    >
      {/* Must stay a plain block box: GSAP's pin-spacing cannot grow the
          document through a flex-column body, which silently kills every pin. */}
      <body className="min-h-full" suppressHydrationWarning>
        {children}
        <SanityLive />
      </body>
    </html>
  );
}
