import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Header from "@/components/site/header";
import SiteFooter from "@/components/site/site-footer";
import ContactForm from "@/components/sections/contact-form";
import { getTestimonials } from "@/sanity/repositories/testimonials";

const Testimonials = dynamic(
  () => import("@/components/sections/testimonials/testimonials"),
  {
    loading: () => <div className="min-h-[600px] bg-background" />,
    ssr: true,
  },
);

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us about your growth challenge and the GrowthOps Asia team will get back to you.",
  alternates: {
    canonical: "/contact",
  },
};

export default async function ContactPage() {
  const testimonials = await getTestimonials();

  return (
    <div className="body-wrapper hs-site-page page">
      <Header />
      <ContactForm />
      <Testimonials data={testimonials} />
      <SiteFooter />
    </div>
  );
}
