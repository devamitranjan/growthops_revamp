import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ComposedPage } from "@/components/site/composed-page";
import { pageMetadata } from "@/lib/page-metadata";
import { pageRepository } from "@/content/repositories";

export async function generateMetadata(): Promise<Metadata> {
  const page = await pageRepository.getHomePage();

  if (!page) return {};

  return pageMetadata(page, "/");
}

export default async function Home() {
  const page = await pageRepository.getHomePage();

  if (!page) notFound();

  return (
    <ComposedPage
      sections={page.sections}
      className="hs-content-id-153839881997"
    />
  );
}
