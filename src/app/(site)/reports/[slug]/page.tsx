import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ComposedPage } from "@/components/site/composed-page";
import { pageMetadata } from "@/lib/page-metadata";
import { getReport, getReportSlugs } from "@/sanity/repositories/reports";

export async function generateStaticParams() {
  const slugs = await getReportSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/reports/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const report = await getReport(slug);

  if (!report) return {};

  return pageMetadata(report, `/reports/${slug}`, report.title);
}

/** A report is composed from the section library like any other page — its
 *  hero, overview and download form are all sections on the document. */
export default async function ReportPage(props: PageProps<"/reports/[slug]">) {
  const { slug } = await props.params;
  const report = await getReport(slug);

  if (!report) notFound();

  return <ComposedPage sections={report.sections} />;
}
