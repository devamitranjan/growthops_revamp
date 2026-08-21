import type {
  ArticleData,
  CaseStudySlideData,
  GrowthCardData,
  IHeroBannerData,
  ITeamSectionData,
  IUnrivaledGrowthData,
  ServiceItem,
} from "../types";

export const heroBanner: IHeroBannerData = {
  title: "Grow Unforgettable with GO",
  subtitle: "Growing Brands, Businesses and Bottom Lines for over 15 years",
  description:
    "GrowthOps Asia is a marketing transformation agency that has helped grow and sustain market leaders by fusing digital-first strategy, design and technology.",
  videoSrc: "/hero-banner/hero.webm",
  posterSrc: "/hero-banner/hero-poster.webp",
  animateSpin: true,
};

export const services: ServiceItem[] = [
  {
    href: "https://www.growthops.asia/digital-first-creative",
    imgSrc: "/our-services/digital-first-creative.webp",
    alt: "Digital-First Creative",
    overlayColor: "bg-primary-cyan-base",
  },
  {
    href: "https://www.growthops.asia/performance-marketing-and-analytics",
    imgSrc: "/our-services/performance-marketing.webp",
    alt: "Performance Marketing",
    overlayColor: "bg-primary-pink-base",
  },
  {
    href: "https://www.growthops.asia/marketing-technology",
    imgSrc: "/our-services/marketing-technology.webp",
    alt: "Marketing Technology",
    overlayColor: "bg-primary-blue-dark",
  },
  {
    href: "https://www.growthops.asia/experience-strategy-and-design",
    imgSrc: "/our-services/experience-strategy-design.webp",
    alt: "Experience Strategy and Design",
    overlayColor: "bg-primary-yellow-extradark",
  },
  {
    href: "https://www.growthops.asia/fsi-tech",
    imgSrc: "/our-services/fsi-technology.webp",
    alt: "FSI-Technology",
    overlayColor: "bg-primary-blue-extradark",
  },
  {
    href: "https://www.growthops.asia/research-insights-and-strategy",
    imgSrc: "/our-services/research-insights-strategy.webp",
    alt: "Research, Insights and Strategy",
    overlayColor: "bg-primary-cyan-base",
  },
];

export const growthCards: GrowthCardData[] = [
  {
    id: "bersama-grab",
    imageSrc: "/growth-spurts/bersama-grab.webp",
    videoSrc: "/growth-spurts/video/bersama-grab.webm",
    alt: "Going from Mengapa to Mantap Bersama Grab",
    label: "Going from Mengapa to Mantap Bersama Grab",
    description: "Malaysia Effie and Kancil winner",
  },
  {
    id: "unifi-business",
    imageSrc: "/growth-spurts/unifi-business.webp",
    videoSrc: "/growth-spurts/video/unifi-business.webm",
    alt: "Unifi Business: Unibizity",
    label: "Unifi Business: Unibizity",
    description: "345% increase in brand engagement",
  },
  {
    id: "malaysia-airlines",
    imageSrc: "/growth-spurts/malaysia-airlines.webp",
    videoSrc: "/growth-spurts/video/malaysia-arlines.webm",
    alt: "Malaysia Airlines: Windows of Hospitality",
    label: "Malaysia Airlines: Windows of Hospitality",
    description: "Multi-country roll out",
  },
  {
    id: "u-mobile",
    imageSrc: "/growth-spurts/digital-ecosystem.webp",
    videoSrc: "/growth-spurts/video/digital-ecosystem.webm",
    alt: "U Mobile: Digital Ecosystem Refresh",
    label: "U Mobile: Digital Ecosystem Refresh",
    description: "55% increase in conversion rate",
  },
];

export const caseStudySlides: CaseStudySlideData[] = [
  {
    id: "unifi-wedding-crashers",
    label: "Unifi: Wedding Crashers",
    bg: "/case-study/secret-wedding-board.webp",
  },
  {
    id: "celcomdigi-dari-mata-kita",
    label: "CelcomDigi: Dari Mata Kita",
    bg: "/case-study/celcomdigi-dari-kita.webp",
  },
  {
    id: "unifi-device-fiesta",
    label: "Unifi Device Fiesta",
    bg: "/case-study/unifi-device-fiesta.webp",
  },
  {
    id: "gen-unifi",
    label: "Gen Unifi",
    bg: "/case-study/gen-unifi.webp",
  },
  {
    id: "taylors-university-ignite-your-passion",
    label: "Taylor's University: Ignite Your Passion",
    bg: "/case-study/taylors-university-passion.webp",
  },
  {
    id: "grab-greater-with-grab",
    label: "Grab: Greater with Grab",
    bg: "/case-study/grab-greater-grab.webp",
  },
  {
    id: "shell-135-years",
    label: "Shell 135 Years",
    bg: "/case-study/mell-malaysia.webp",
  },
];

export const articles: ArticleData[] = [
  {
    href: "https://www.growthops.asia/signals-in-the-noise-winning-in-malaysia-mature-telco-market",
    imgSrc: "/accelerate-learning-curve/malaysia-telco-fv2.webp",
    alt: "Signals in the Noise: Winning in Malaysia’s Mature Telco Market",
    tag: "Whitepaper",
    title: "Signals in the Noise: Winning in Malaysia’s Mature Telco Market",
    date: "October 2022",
  },
  {
    href: "https://www.growthops.asia/asean-consumer-telco-landscape-2024",
    imgSrc: "/accelerate-learning-curve/asean-b2c-telco.webp",
    alt: "The ASEAN Consumers Telco Experience",
    tag: "Whitepaper",
    title: "The ASEAN Consumers Telco Experience",
    date: "October 2024",
  },
  {
    href: "https://www.growthops.asia/asean-b2b-consumer-telco-landscape-2024",
    imgSrc: "/accelerate-learning-curve/asean-telco-b2b.webp",
    alt: "The ASEAN SME Telco Experience",
    tag: "Whitepaper",
    title: "The ASEAN SME Telco Experience",
    date: "October 2024",
  },
  {
    href: "https://www.growthops.asia/asean-fsi-landscape-2024",
    imgSrc: "/accelerate-learning-curve/asean-banks-digital.webp",
    alt: "A Perspective on ASEAN Banks Digital Transformation",
    tag: "Whitepaper",
    title:
      "A Perspective on ASEAN Banks Digital Transformation: Efforts and Opportunities",
    date: "January 2024",
  },
  {
    href: "https://www.growthops.asia/banking-to-asean-individuals-2024",
    imgSrc: "/accelerate-learning-curve/asean-banking-individuals.webp",
    alt: "Banking to ASEAN Individuals",
    tag: "Whitepaper",
    title: "Banking to ASEAN Individuals",
    date: "June 2024",
  },
  {
    href: "https://www.growthops.asia/banking-to-asean-smes-2024",
    imgSrc: "/accelerate-learning-curve/wp.webp",
    alt: "Banking to ASEAN SMEs by GrowthOps Asia",
    tag: "Whitepaper",
    title: "Banking to ASEAN SMEs",
    date: "May 2024",
  },
  {
    href: "https://www.growthops.asia/post/2024-marketing-trends-how-technology-is-transforming-creativity",
    imgSrc: "/accelerate-learning-curve/marketing-trends2024.webp",
    alt: "2024 Marketing Trends",
    tag: "Perspective",
    title: "2024 Marketing Trends: How Technology Is Transforming Creativity",
    date: "December 2023",
  },
  {
    href: "https://www.growthops.asia/post/how-ministries-can-create-compelling-social-media-content-to-engage-singaporeans-0",
    imgSrc: "/accelerate-learning-curve/marketing-trends.webp",
    alt: "How generative AI is impacting the creative industry",
    tag: "Insight",
    title: "How generative AI is impacting the creative industry",
    date: "May 2023",
  },
  {
    href: "https://www.growthops.asia/post/how-ministries-can-create-compelling-social-media-content-to-engage-singaporeans",
    imgSrc: "/accelerate-learning-curve/digital-mat.webp",
    alt: "How Ministries Can Create Compelling Social Media Content",
    tag: "Insight",
    title:
      "How Ministries Can Create Compelling Social Media Content to Engage Singaporeans",
    date: "February 2023",
  },
  {
    href: "https://www.growthops.asia/post/time-to-reimagine-talent-retention-marketing-agencies-need-to-rethink-adapt-and-evolve",
    imgSrc: "/accelerate-learning-curve/digital-maturity.webp",
    alt: "Time to Reimagine Talent Retention",
    tag: "Perspective",
    title:
      "Time to Reimagine Talent Retention: Marketing Agencies Need to Rethink, Adapt and Evolve",
    date: "February 2023",
  },
];

export const unrivaledGrowth: IUnrivaledGrowthData = {
  title: "Unrivaled Growth",
  stats: [
    {
      id: "organic-traffic",
      stat: "817%",
      description: "increase in organic traffic with SEO services",
    },
    {
      id: "paid-media-conversion",
      stat: "100%",
      description: "increase in conversion with paid media services",
    },
    {
      id: "brand-sentiment",
      stat: "180%",
      description: "improvement in brand sentiment with creative services",
    },
    {
      id: "cost-per-lead",
      stat: "71%",
      description:
        "reduction in Cost Per Lead with performance marketing services",
    },
    {
      id: "campaign-launches",
      stat: "96%",
      description:
        "faster campaign launches with platform development services",
    },
  ],
  cta: {
    label: "View more results",
    href: "https://www.growthops.asia/work",
  },
};

export const teamSection: ITeamSectionData = {
  title: "Meet Our GOGetters",
  batches: [
    [
      {
        name: "Chee Keong",
        title: "Chief Executive Officer, Asia",
        from: "#1a2a5c",
        to: "#0c1330",
        image: "/go-getters/goon.webp",
      },
      {
        name: "Boon Keong Tng",
        title: "Regional Head of Consulting",
        from: "#2c2c2c",
        to: "#000000",
        image: "/go-getters/boon.webp",
      },
      {
        name: "Chris Greenough",
        title:
          "General Manager, Malaysia and Regional Head of Creative Strategy",
        from: "#1f3d38",
        to: "#0a1815",
        image: "/go-getters/chris.webp",
      },
    ],
    [
      {
        name: "Shaad Hamid",
        title:
          "General Manager, Singapore and Regional Head of Performance Marketing",
        from: "#5c2430",
        to: "#260f16",
        image: "/go-getters/shaad.webp",
      },
      {
        name: "Edith Chin",
        title: "Head of Finance",
        from: "#4a3220",
        to: "#1c130a",
        image: "/go-getters/edith.webp",
      },
      {
        name: "Arshpreet Kaur",
        title: "Group General Counsel",
        from: "#004cba",
        to: "#0c1330",
        image: "/go-getters/arsh.webp",
      },
    ],
  ],
  highlight: {
    value: "+250",
    description: "team members embracing our #GrowTogether culture",
    cta: {
      label: "Learn more",
      href: "https://www.growthops.asia/culture",
      target: "_self",
    },
  },
};
