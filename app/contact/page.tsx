import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Header from "../features/landing/header";
import ContactForm from "../features/contact/contact-form";
import SiteFooter from "../shared/components/site-footer";

const Testimonials = dynamic(() => import("../features/landing/testimonials"), {
  loading: () => <div className="min-h-[600px] bg-background" />,
  ssr: true,
});

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
      <Testimonials />
      <SiteFooter />
    </div>
  );
}
