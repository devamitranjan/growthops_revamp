import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.growthops.asia"),
  title: {
    default: "GrowthOps Asia",
    template: "%s | GrowthOps Asia",
  },
  description:
    "GrowthOps Asia is a growth marketing and creative agency helping ASEAN brands accelerate performance through data-driven strategy, creative, and technology.",
  icons: {
    shortcut: "/logo-min.ico",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://www.growthops.asia",
    siteName: "GrowthOps Asia",
    title: "GrowthOps Asia",
    description:
      "GrowthOps Asia is a growth marketing and creative agency helping ASEAN brands accelerate performance through data-driven strategy, creative, and technology.",
    images: [
      {
        url: "/gops-desk.webp",
        width: 4000,
        height: 2667,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GrowthOps Asia",
    description:
      "GrowthOps Asia is a growth marketing and creative agency helping ASEAN brands accelerate performance through data-driven strategy, creative, and technology.",
    images: ["/gops-desk.webpg"],
  },
  verification: {
    google: "fB99q5g19ayOZryc7Xu2MQMBp-s_joy068rjNd_ur-g",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`dark ${montserrat.variable} h-full antialiased`}
    >
      {/* Must stay a plain block box: GSAP's pin-spacing cannot grow the
          document through a flex-column body, which silently kills every pin. */}
      <body className="min-h-full" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
