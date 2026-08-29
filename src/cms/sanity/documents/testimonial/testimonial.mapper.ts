import type {
  ITestimonialsData,
  LogoData,
  TestimonialData,
} from "@/content/domain/testimonial/testimonial.types";

/**
 * `TESTIMONIALS_QUERY` -> the shared testimonials block.
 *
 * The projection already resolves every image to a URL and every array key to
 * an `id`, so what is left is the null-to-default pass: a document saved
 * before a field existed answers `null`, and the carousel wants strings it can
 * render and lists it can map over.
 */

interface RawTestimonial {
  id?: string | null;
  category?: string | null;
  audioSrc?: string | null;
  imgSrc?: string | null;
  alt?: string | null;
  quote?: string | null;
  position?: string | null;
}

interface RawLogo {
  id?: string | null;
  src?: string | null;
  alt?: string | null;
}

interface RawTestimonials {
  title?: string | null;
  categories?: string[] | null;
  testimonials?: readonly RawTestimonial[] | null;
  logos?: readonly RawLogo[] | null;
}

const text = (value: string | null | undefined) => value ?? "";

function mapTestimonial(row: RawTestimonial, index: number): TestimonialData {
  return {
    id: row.id ?? `testimonial-${index}`,
    category: text(row.category),
    audioSrc: text(row.audioSrc),
    imgSrc: text(row.imgSrc),
    alt: text(row.alt),
    quote: text(row.quote),
    position: text(row.position),
  };
}

function mapLogo(row: RawLogo, index: number): LogoData {
  return {
    id: row.id ?? `logo-${index}`,
    src: text(row.src),
    alt: text(row.alt),
  };
}

export function mapTestimonials(
  row: RawTestimonials | null,
): ITestimonialsData {
  return {
    title: text(row?.title),
    categories: row?.categories ?? [],
    testimonials: (row?.testimonials ?? []).map(mapTestimonial),
    logos: (row?.logos ?? []).map(mapLogo),
  };
}
