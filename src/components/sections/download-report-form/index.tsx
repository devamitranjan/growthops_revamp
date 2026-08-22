import { getSiteSettings } from "@/sanity/repositories/site-settings";

import { DownloadReportFormView } from "./download-report-form";

export default async function DownloadReportForm({
  fileUrl,
  className,
}: {
  fileUrl?: string;
  className?: string;
}) {
  const settings = await getSiteSettings();
  return (
    <DownloadReportFormView
      settings={settings}
      fileUrl={fileUrl}
      className={className}
    />
  );
}
