import { notFound } from "next/navigation";

import { ComposedPage } from "@/components/site/composed-page";
import { reportRepository } from "@/content/repositories";

export async function generateStaticParams() {
  const slugs = await reportRepository.getSlugs();
  return slugs.map((slug) => ({ slug }));
}

/** A report is composed from the section library like any other page — its
 *  hero, overview and download form are all sections on the document. */
export default async function ReportPage(props: PageProps<"/reports/[slug]">) {
  const { slug } = await props.params;
  const report = await reportRepository.getBySlug(slug);

  if (!report) notFound();

  return <ComposedPage sections={report.sections} seo={report.seo} />;
}
