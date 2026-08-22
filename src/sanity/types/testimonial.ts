export interface TestimonialData {
  id: string;
  category: string;
  audioSrc: string;
  imgSrc: string;
  alt: string;
  quote: string;
  position: string;
}

export interface LogoData {
  id: string;
  src: string;
  alt: string;
}

export interface ITestimonialsData {
  title: string;
  categories: string[];
  testimonials: TestimonialData[];
  logos: LogoData[];
  defaultCategory?: string;
}
