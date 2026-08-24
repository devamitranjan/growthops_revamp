import { getSiteSettings } from "@/sanity/repositories/site-settings";

import { DownloadReportFormView } from "./download-report-form";

export default async function DownloadReportForm({
  title,
  fileUrl,
  className,
}: {
  title?: string;
  fileUrl?: string;
  className?: string;
}) {
  const settings = await getSiteSettings();
  return (
    <DownloadReportFormView
      settings={settings}
      title={title}
      fileUrl={fileUrl}
      className={className}
    />
  );
}
