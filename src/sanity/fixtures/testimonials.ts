/** Testimonial quotes and the client logo marquee. Shared by the home page
 *  and /contact, which is why it lives here rather than in either route. */
import type { ITestimonialsData } from "../types";

export const testimonials: ITestimonialsData = {
  title: "In Their Words",
  categories: ["Finance", "Insurance", "Telco", "Travel", "Superapp", "More"],
  testimonials: [
    {
      id: "mizuho",
      category: "Finance",
      audioSrc: "/testimonials/audio/mizuho.mp3",
      imgSrc: "/testimonials/image/mizuho-goa.webp",
      alt: "Mizuho",
      quote:
        "From strategy to execution, GrowthOps went beyond and exceeded our expectations.",
      position:
        "Director, Systems Planning ＆ Development Section, Mizuho Bank, Ltd. ",
    },
    {
      id: "leading-regional-bank",
      category: "Finance",
      audioSrc: "/testimonials/audio/leading-regional-bank.mp3",
      imgSrc: "/testimonials/image/glient-testimonials-goa.webp",
      alt: "Leading Regional Bank",
      quote: "GrowthOps have helped us profitably acquire customers.",
      position: "Business & Innovation ",
    },
    {
      id: "cimb",
      category: "Finance",
      audioSrc: "/testimonials/audio/cimb.mp3",
      imgSrc: "/testimonials/image/cimb-goa.webp",
      alt: "company logo",
      quote:
        "The key to success was due to collaborative efforts and fast implementation of GrowthOps and our teams.",
      position: "Digital Analytics & Insights, Decision Management",
    },

    // Insurance
    {
      id: "aia",
      category: "Insurance",
      audioSrc: "/testimonials/audio/aia.mp3",
      imgSrc: "/testimonials/image/aia-goa.webp",
      alt: "company logo",
      quote:
        "GrowthOps is a trustworthy partner that I would recommend to any company.",
      position:
        "Associate Director, Digitalization, Innovation and Enterprise Architecture",
    },

    // Telco
    {
      id: "u-mobile",
      category: "Telco",
      audioSrc: "/testimonials/audio/umobile.mp3",
      imgSrc: "/testimonials/image/u-mobile-goa.webp",
      alt: "company logo",
      quote:
        "GrowthOps have shown to have the right capabilities to take our platform to the next level.",
      position: "Chief Digital Officer",
    },
    {
      id: "tm",
      category: "Telco",
      audioSrc: "/testimonials/audio/tm.mp3",
      imgSrc: "/testimonials/image/tm.webp",
      alt: "company logo",
      quote:
        "GrowthOps can target a single creative concept with two perspectives.",
      position: "Vice President, Brand & Marketing",
    },

    // Travel
    {
      id: "malaysia-airlines",
      category: "Travel",
      audioSrc: "/testimonials/audio/mas.mp3",
      imgSrc: "/testimonials/image/malaysia-airlines-goa.webp",
      alt: "company logo",
      quote:
        "GrowthOps has brought the right maturity in design, technology, and analytics capabilities to take our platform to the next level.",
      position: "Group Chief Digital and Technology Officer",
    },

    // Superapp
    {
      id: "grab",
      category: "Superapp",
      audioSrc: "/testimonials/audio/grab.mp3",
      imgSrc: "/testimonials/image/grab-goa.webp",
      alt: "company logo",
      quote: "GrowthOps have gone above and beyond.",
      position: "Content Head",
    },

    // More
    {
      id: "esplanade",
      category: "More",
      audioSrc: "/testimonials/audio/esplanade.mp3",
      imgSrc: "/testimonials/image/esplanade-goa.webp",
      alt: "company logo",
      quote:
        "GrowthOps has shown that the team is capable of providing one of the highest standards in project management and strategy.",
      position: "Head of Digital",
    },
    {
      id: "rspo",
      category: "More",
      audioSrc: "/testimonials/audio/sangeetha-umakanthan-rspo.mp3",
      imgSrc: "/testimonials/image/rspo-goa.webp",
      alt: "company logo",
      quote:
        "We are leveraging the agency’s digital marketing capabilities to showcase the depth of progress that RSPO Members are driving in the quest to make palm oil sustainable.",
      position: "Deputy Director of Communications",
    },
    {
      id: "shell",
      category: "More",
      audioSrc: "/testimonials/audio/seow-lee-shell.mp3",
      imgSrc: "/testimonials/image/shell-goa.webp",
      alt: "company logo",
      quote:
        "This new campaign [created by GrowthOps] aims to go beyond our product benefits and connect with Malaysians.",
      position: "GM, Shell Mobility Malaysia",
    },
    {
      id: "crown",
      category: "More",
      audioSrc: "/testimonials/audio/crown.mp3",
      imgSrc: "/testimonials/image/crown.webp",
      alt: "company logo",
      quote:
        "GrowthOps has been a key partner to Crown’s digital growth in the Asia market.",
      position: "Digital Marketing Manager",
    },
    {
      id: "pink-collar",
      category: "More",
      audioSrc: "/testimonials/audio/pink-collar.mp3",
      imgSrc: "/testimonials/image/pinkcollar-goa.webp",
      alt: "company logo",
      quote:
        "We chose to partner with GrowthOps in implementing Salesforce as we want to make sure that we are able to maximize its features.",
      position: "Chief Executive Officer",
    },
  ],
  logos: [
    {
      id: "dbs",
      src: "/testimonials/logo/dbs.webp",
      alt: "DBS x GrowthOps Asia",
    },
    {
      id: "rhb",
      src: "/testimonials/logo/rhb.webp",
      alt: "RHB x GrowthOps Asia",
    },
    {
      id: "aia",
      src: "/testimonials/logo/aia-growthops-asia.webp",
      alt: "AIA x GrowthOps Asia",
    },
    {
      id: "uob",
      src: "/testimonials/logo/uob.webp",
      alt: "UOB x GrowthOps Asia",
    },
    {
      id: "mastercard",
      src: "/testimonials/logo/mastercard-growthops-asia.webp",
      alt: "Mastercard x GrowthOps Asia",
    },
    {
      id: "emirates",
      src: "/testimonials/logo/emirates.webp",
      alt: "Emirates x GrowthOps Asia",
    },
    {
      id: "cimb",
      src: "/testimonials/logo/cimb.webp",
      alt: "CIMB x GrowthOps Asia",
    },
    {
      id: "telekom-malaysia",
      src: "/testimonials/logo/telekom-malaysia-asia.webp",
      alt: "Telekom Malaysia x GrowthOps Asia",
    },
    {
      id: "u-mobile",
      src: "/testimonials/logo/u-mobile.webp",
      alt: "U Mobile x GrowthOps Asia",
    },
    {
      id: "firefly-airlines",
      src: "/testimonials/logo/firefly-airlines-asia.webp",
      alt: "Firefly Airlines x GrowthOps Asia",
    },
    {
      id: "malaysia-airlines",
      src: "/testimonials/logo/malaysia-airlines.webp",
      alt: "Malaysia Airlines x GrowthOps Asia",
    },
    {
      id: "taylors-university",
      src: "/testimonials/logo/taylors-university.webp",
      alt: "Taylor's Universityx GrowthOps Asia",
    },
    {
      id: "grab",
      src: "/testimonials/logo/grab.webp",
      alt: "Grab x GrowthOps Asia",
    },
    {
      id: "esplanade",
      src: "/testimonials/logo/sph-growthops-asia.webp",
      alt: "Esplanade x GrowthOps Asia",
    },
    {
      id: "hlb",
      src: "/testimonials/logo/hlb.webp",
      alt: "HLB x GrowthOps Asia",
    },
    {
      id: "unifi",
      src: "/testimonials/logo/unifi-growthops-asia.webp",
      alt: "Unifi x GrowthOps Asia",
    },
    {
      id: "mizuho",
      src: "/testimonials/logo/mizuho.webp",
      alt: "Mizuho x GrowthOps Asia",
    },
    {
      id: "singlife",
      src: "/testimonials/logo/singlife.webp",
      alt: "Singlife x GrowthOps Asia",
    },
    {
      id: "manulife",
      src: "/testimonials/logo/manulife.webp",
      alt: "Manulife x GrowthOps Asia",
    },
    {
      id: "fwd",
      src: "/testimonials/logo/fwd.webp",
      alt: "FWD x GrowthOps Asia",
    },
    {
      id: "proton",
      src: "/testimonials/logo/proton.webp",
      alt: "Proton x GrowthOps Asia",
    },
    {
      id: "amway",
      src: "/testimonials/logo/amway-growthops-asia.webp",
      alt: "Amway x GrowthOps Asia",
    },
    {
      id: "maxis",
      src: "/testimonials/logo/maxis-growthops-asia.webp",
      alt: "Maxis x GrowthOps Asia",
    },
    {
      id: "bega",
      src: "/testimonials/logo/bega-growthops-asia.webp",
      alt: "Bega x GrowthOps Asia",
    },
    {
      id: "farmers-union",
      src: "/testimonials/logo/farmers-union-asia.webp",
      alt: "Farmer's Union x GrowthOps Asia",
    },
    {
      id: "unicharm",
      src: "/testimonials/logo/unicharm-growthops-asia.webp",
      alt: "Unicharm x GrowthOps Asia",
    },
    {
      id: "shell",
      src: "/testimonials/logo/shell-growthops-asia.webp",
      alt: "Shell x GrowthOps Asia",
    },
    {
      id: "rspo",
      src: "/testimonials/logo/rspo-growthops-asia.webp",
      alt: "RSPO x GrowthOps Asia",
    },
    {
      id: "upvio",
      src: "/testimonials/logo/upvio-growthops-asia.webp",
      alt: "Upvio x GrowthOps Asia",
    },
    {
      id: "sph",
      src: "/testimonials/logo/sph-growthops-asia.webp",
      alt: "SPH x GrowthOps Asia",
    },
  ],
};
