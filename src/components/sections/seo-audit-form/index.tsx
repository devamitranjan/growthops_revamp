import { siteSettingsRepository } from "@/content/repositories";

import { SeoAuditFormView } from "./seo-audit-form";

export default async function SeoAuditForm({ title }: { title?: string }) {
  const settings = await siteSettingsRepository.get();
  return <SeoAuditFormView settings={settings} title={title} />;
}
