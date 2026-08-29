import { siteSettingsRepository } from "@/content/repositories";

import { SiteFooterView } from "./site-footer-view";

export default async function SiteFooter() {
  const settings = await siteSettingsRepository.get();
  return <SiteFooterView settings={settings} />;
}
