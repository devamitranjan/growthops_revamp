"use client";

import { useParams } from "next/navigation";

import Header from "../../features/landing/header";
import SiteFooter from "../../shared/components/site-footer";
import DownloadReportForm from "../../shared/components/download-report-form";
import { HeroBanner } from "../../shared/components/hero-banner";
import { ReportOverview } from "../../shared/components/report-overview";
import { telcoReportData } from "../telco.data";
import Link from "next/dist/client/link";

export default function ContactPage() {
  const { slug } = useParams();

  const reports = telcoReportData[slug as keyof typeof telcoReportData];

  if (!reports) {
    return (
      <div className="body-wrapper hs-site-page page">
        <Header />
        <div className="min-h-screen flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold mb-2">Page Not Found</h1>
          <Link href="/" className="ml-4 text-blue-500 hover:underline">
            Go back to Home
          </Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="body-wrapper hs-site-page page">
      <Header />
      <HeroBanner data={reports.heroBannerData} />
      <ReportOverview reports={reports} />
      <DownloadReportForm />
      <SiteFooter />
    </div>
  );
}
