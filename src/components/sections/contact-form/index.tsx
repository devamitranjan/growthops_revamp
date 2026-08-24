import { getSiteSettings } from "@/sanity/repositories/site-settings";

import { ContactFormView } from "./contact-form-view";

export default async function ContactForm({ title }: { title: string }) {
  const settings = await getSiteSettings();
  return <ContactFormView title={title} settings={settings} />;
}
