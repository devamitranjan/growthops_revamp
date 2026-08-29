import { siteSettingsRepository } from "@/content/repositories";

import { ContactFormView } from "./contact-form-view";

export default async function ContactForm({ title }: { title: string }) {
  const settings = await siteSettingsRepository.get();
  return <ContactFormView title={title} settings={settings} />;
}
