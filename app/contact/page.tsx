import type { Metadata } from "next";
import Header from "../features/landing/header";
import ContactForm from "../features/contact/contact-form";
import SiteFooter from "../shared/components/site-footer";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us about your growth challenge and the GrowthOps Asia team will get back to you.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="body-wrapper hs-site-page page">
      <Header />
      <ContactForm />
      <SiteFooter />
    </div>
  );
}
