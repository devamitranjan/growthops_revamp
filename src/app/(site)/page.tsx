import { notFound } from "next/navigation";

import Header from "@/components/site/header";
import { SectionRenderer } from "@/components/site/section-renderer";
import SiteFooter from "@/components/site/site-footer";
import { getHomePage } from "@/sanity/repositories/page";

export default async function Home() {
  const page = await getHomePage();

  if (!page) notFound();

  return (
    <div className="body-wrapper hs-content-id-153839881997 hs-site-page page">
      <Header />
      {page.sections.map((section) => (
        <SectionRenderer key={section._key} section={section} />
      ))}
      <SiteFooter />
    </div>
  );
}
