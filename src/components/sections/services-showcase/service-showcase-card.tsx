interface ServiceShowcaseCardProps {
  title: string;
  image: string;
}

export function ServiceShowcaseCard({
  title,
  image,
}: ServiceShowcaseCardProps) {
  return (
    <article
      className="
        group
        relative
        min-h-[310px]
        overflow-hidden
        rounded-[32px]
        border
        border-white/70
        bg-[#101416]
        px-8
        py-12
        text-center
        transition-all
        duration-500
        ease-out
        hover:border-pink-500
        hover:shadow-[0_0_20px_rgba(255,45,104,0.45),0_0_50px_rgba(255,45,104,0.2)]
        hover:animate-[serviceFloat_3s_ease-in-out_infinite]
      "
    >
      <div className="flex h-full flex-col items-center justify-center">
        <div className="mb-12 flex h-16 w-16 items-center justify-center transition-transform duration-500 group-hover:scale-110">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-contain"
          />
        </div>

        <h3 className="max-w-[260px] text-[20px] font-semibold leading-[1.35] tracking-[-0.02em] text-white">
          {title}
        </h3>
      </div>
    </article>
  );
}