import { ReportCarousel } from "./report-carousel";
import { ReportOverviewData } from "@/content/types";

interface ReportOverviewProps {
  data: ReportOverviewData;
}

export const ReportOverview: React.FC<ReportOverviewProps> = ({ data }) => {
  const { highlights, slides } = data;
  return (
    <section className="reveal mt-[40px] pb-12 md:mt-[40px] md:pb-10">
      <div className="generic-container grid items-start gap-12 md:grid-cols-[minmax(180px,220px)_1fr] md:gap-16">
        <div className="flex flex-col gap-8 md:gap-16">
          <h2 className="text-[3rem] font-extrabold leading-tight text-neutral-white-base md:text-[3rem] md:leading-[1.05]">
            In This Report
          </h2>

          <ol className="flex flex-col gap-8 md:gap-12">
            {highlights.map((highlight, index) => (
              <li key={highlight.id} className="flex flex-col gap-2">
                <span className="text-[25px] text-primary-pink-base md:text-[24px]">
                  {String(index + 1).padStart(2, "0")}.
                </span>
                <p className="text-[25px] leading-9 text-neutral-white-base md:text-[24px]">
                  {highlight.title}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {slides.length > 0 && (
          <ReportCarousel
            slides={slides}
            className="w-full max-w-[600px] ml-10 justify-self-center md:justify-center"
          />
        )}
      </div>
    </section>
  );
};
