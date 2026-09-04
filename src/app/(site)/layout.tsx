import { Montserrat } from "next/font/google";
import { ContentLive } from "@/content/live";

import "../globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

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
        <ContentLive />
      </body>
    </html>
  );
}
