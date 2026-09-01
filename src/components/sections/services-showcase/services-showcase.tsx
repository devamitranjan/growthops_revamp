import { ServiceShowcaseCard } from "./service-showcase-card";

interface ServicesShowcaseProps {
  title: string;
  services: {
    id: string;
    title: string;
    imgSrc: string;
    alt: string;
  }[];
}

export default function ServicesShowcase({
  title,
  services,
}: ServicesShowcaseProps) {
  return (
    <section className="bg-black px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-4xl font-semibold text-white">
          {title}
        </h2>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <ServiceShowcaseCard
              key={service.id}
              title={service.title}
              image={service.imgSrc}
            />
          ))}
        </div>
      </div>
    </section>
  );
}