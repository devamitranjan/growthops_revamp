import { siteSettingsRepository } from "@/content/repositories";

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
  const settings = await siteSettingsRepository.get();
  return (
    <DownloadReportFormView
      settings={settings}
      title={title}
      fileUrl={fileUrl}
      className={className}
    />
  );
}
