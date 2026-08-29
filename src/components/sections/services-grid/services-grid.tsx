import { SectionHeader } from "@/components/ui/section-header";
import type { ServiceItem } from "@/content/types";
import { ServiceCard } from "./service-card";

interface ServicesGridProps {
  services: ServiceItem[];
}

export default function ServicesGrid({ services }: ServicesGridProps) {
  return (
    <section className="reveal mt-[80px] md:mt-[100px]">
      <div className="generic-container">
        <SectionHeader
          title="Our Services"
          titleClassName="heading-h2-bold text-white"
          className="mb-8 flex items-center justify-between max-md:mb-12"
        />

        <div className="grid grid-cols-2 gap-5 md:grid-cols-6">
          {services.map((service) => (
            <ServiceCard key={service.href} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
