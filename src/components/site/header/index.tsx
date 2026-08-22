import { getSiteSettings } from "@/sanity/repositories/site-settings";

import { HeaderNav } from "./header-nav";

/**
 * Server wrapper: the nav is editorial content, but the menu itself needs
 * client state, so the data is fetched here and handed to `HeaderNav`.
 */
export default async function Header() {
  const settings = await getSiteSettings();

  return (
    <HeaderNav
      navLinks={settings.navLinks}
      logo={settings.logo}
      logoAlt={settings.logoAlt}
    />
  );
}
