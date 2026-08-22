import { getSiteSettings } from "@/sanity/repositories/site-settings";

import { SiteFooterView } from "./site-footer-view";

export default async function SiteFooter() {
  const settings = await getSiteSettings();
  return <SiteFooterView settings={settings} />;
}
