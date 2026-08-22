import { getSiteSettings } from "@/sanity/repositories/site-settings";

import { ContactFormView } from "./contact-form-view";

export default async function ContactForm() {
  const settings = await getSiteSettings();
  return <ContactFormView settings={settings} />;
}
