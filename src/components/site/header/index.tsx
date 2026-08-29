import { siteSettingsRepository } from "@/content/repositories";

import { HeaderNav } from "./header-nav";

/**
 * Server wrapper: the nav is editorial content, but the menu itself needs
 * client state, so the data is fetched here and handed to `HeaderNav`.
 */
export default async function Header() {
  const settings = await siteSettingsRepository.get();

  return (
    <HeaderNav
      navLinks={settings.navLinks}
      logo={settings.logo}
      logoAlt={settings.logoAlt}
    />
  );
}
