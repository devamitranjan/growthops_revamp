import { ReportHighlight, ReportSlide } from "./report-overview.types";

export const reportHighlights: ReportHighlight[] = [
  {
    id: "telco-digital-engagement",
    title:
      "Key Insights on Telco digital engagement and preferences of ASEAN SMEs",
  },
  {
    id: "innovators-circle",
    title: "GO's Innovators Circle",
  },
];

// All slides share the 1767x2500 cover ratio so the frame never reflows.
// Swap these for the real page previews once the report spreads are exported.
export const reportSlides: ReportSlide[] = [
  {
    id: "cover",
    src: "/accelerate-learning-curve/asean-telco-b2b.webp",
    alt: "The ASEAN Telco Experience: Mastering SME Customer Engagement in the ASEAN Market — report cover",
  },
  {
    id: "asean-consumers",
    src: "/accelerate-learning-curve/asean-b2c-telco.webp",
    alt: "The ASEAN Consumers Telco Experience — report cover",
  },
  {
    id: "banking-individuals",
    src: "/accelerate-learning-curve/asean-banking-individuals.webp",
    alt: "Banking to ASEAN Individuals — report cover",
  },
  {
    id: "malaysia-telco",
    src: "/accelerate-learning-curve/malaysia-telco-fv2.webp",
    alt: "Signals in the Noise: Winning in Malaysia's Mature Telco Market — report cover",
  },
];
