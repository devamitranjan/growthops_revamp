import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/site/header";
import SiteFooter from "@/components/site/site-footer";
import DownloadReportForm from "@/components/sections/download-report-form";
import { HeroBanner } from "@/components/sections/hero-banner";
import { ReportOverview } from "@/components/sections/report-overview";
import { getReport, getReportSlugs } from "@/sanity/repositories/reports";

export async function generateStaticParams() {
  const slugs = await getReportSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const report = await getReport(slug);

  if (!report) return {};

  return {
    title: report.heroBannerData.title,
    description: report.heroBannerData.description,
    alternates: { canonical: `/${slug}` },
  };
}

export default async function ReportPage(props: PageProps<"/[slug]">) {
  const { slug } = await props.params;
  const report = await getReport(slug);

  if (!report) notFound();

  return (
    <div className="body-wrapper hs-site-page page">
      <Header />
      <HeroBanner data={report.heroBannerData} />
      <ReportOverview reports={report} />
      <DownloadReportForm />
      <SiteFooter />
    </div>
  );
}
