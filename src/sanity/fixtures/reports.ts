import type {
  IHeroBannerData,
  ReportHighlight,
  ReportSlide,
} from "../types";

export const telcoReportData: Record<
  string,
  {
    heroBannerData: IHeroBannerData;
    reportHighlights: ReportHighlight[];
    reportSlides: ReportSlide[];
  }
> = {
  "asean-b2b-consumer-telco-landscape-2024": {
    heroBannerData: {
      title: "The ASEAN B2B Telco Experience",
      subtitle: "Mastering SME Customer Engagement in the ASEAN Market",
      description:
        "We surveyed 500 SME telecom users across ASEAN and did a deep dive into the experiences of users in the region. Here are the key findings that telco companies must address to stay competitive and meet customer expectations.",
      videoSrc: "",
      posterSrc: "/hero-banner/telco-hero-banner.webp",
      animateSpin: true,
    },

    reportHighlights: [
      {
        id: "telco-digital-engagement",
        title:
          "Key Insights on Telco digital engagement and preferences of ASEAN SMEs",
      },
      {
        id: "innovators-circle",
        title: "GO's Innovators Circle",
      },
    ],
    reportSlides: [
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
    ],
  },
  "asean-consumer-telco-landscape-2024": {
    heroBannerData: {
      title: "The ASEAN Telco Experience",
      subtitle: "Mastering Customer Engagement in the ASEAN Market",
      description:
        "We surveyed 1,500 telecom users across ASEAN and did a deep dive into the experiences of users in the region. Here are the key findings that telco companies must address to stay competitive and meet customer expectations.",
      videoSrc: "",
      posterSrc: "/hero-banner/telco-hero-banner.webp",
      animateSpin: true,
    },

    reportHighlights: [
      {
        id: "telco-digital-engagement",
        title:
          "Key Insights on Telco digital engagement and preferences of ASEAN customers",
      },
      {
        id: "innovators-circle",
        title: "GO's Innovators Circle",
      },
    ],
    reportSlides: [
      {
        id: "cover",
        src: "/accelerate-learning-curve/asean-b2c-telco.webp",
        alt: "The ASEAN B2C Telco Experience by GrowthOps Asia and Rakuten Insight — report cover",
      },
      {
        id: "asean-b2b",
        src: "/accelerate-learning-curve/asean-telco-b2b.webp",
        alt: "The ASEAN B2B Telco Experience: Mastering SME Customer Engagement in the ASEAN Market — report cover",
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
    ],
  },
  "signals-in-the-noise-winning-in-malaysia-mature-telco-market": {
    heroBannerData: {
      title: "Signals in the Noise: Winning in Malaysia’s Mature Telco Market",
      subtitle: "",
      description:
        "In this new paper, we delve into fresh data-driven insights that show driving Malaysians to switch or stay with a mobile provider goes beyond surface-level digital changes. Instead, it requires a deeper understanding of customer behavior. We explore the key forces shaping the Malaysian telecom market.",
      videoSrc: "",
      posterSrc: "/hero-banner/malaysia-telco-hero-banner.webp",
      animateSpin: true,
    },

    reportHighlights: [],
    reportSlides: [
      {
        id: "malaysia-telco",
        src: "/accelerate-learning-curve/malaysia-telco-fv2.webp",
        alt: "Signals in the Noise: Winning in Malaysia's Mature Telco Market — report cover",
      },
      {
        id: "asean-b2c",
        src: "/accelerate-learning-curve/asean-b2c-telco.webp",
        alt: "The ASEAN B2C Telco Experience by GrowthOps Asia and Rakuten Insight — report cover",
      },
    ],
  },
};
