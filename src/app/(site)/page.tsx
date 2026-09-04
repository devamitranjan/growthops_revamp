import { notFound } from "next/navigation";

import { ComposedPage } from "@/components/site/composed-page";
import { pageRepository } from "@/content/repositories";

export default async function Home() {
  const page = await pageRepository.getHomePage();

  if (!page) notFound();

  return (
    <ComposedPage
      sections={page.sections}
      seo={page.seo}
      className="hs-content-id-153839881997"
    />
  );
}
