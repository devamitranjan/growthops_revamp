import { CaseStudySlideData } from "./case-study.types";

interface CaseStudySlideProps {
  slide: CaseStudySlideData;
}

export function CaseStudySlide({ slide }: CaseStudySlideProps) {
  return (
    <div
      className="group relative aspect-video w-72 shrink-0 flex flex-col justify-end rounded-xl overflow-hidden p-4 shadow-lg cursor-pointer bg-cover bg-center"
      style={{ backgroundImage: `url('${slide.bg}')` }}
    >
      <div className="absolute top-0 left-0 w-full h-full backdrop-blur-[1px] bg-gradient-to-r from-primary-pink-extradark to-primary-pink-light opacity-0 group-hover:opacity-40 transition duration-300 ease-out" />
      <p className="card__label text-left text-neutral-white-base body3-semibold md:body1-semibold z-20">
        {slide.label}
      </p>
    </div>
  );
}
