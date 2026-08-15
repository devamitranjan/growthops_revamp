import Image from "next/image";
import { TeamMember } from "./team-section.types";

interface TeamMemberCardProps {
  member: TeamMember;
  columnIndex: number;
  isCurrent: boolean;
  isPrev: boolean;
}

export function TeamMemberCard({
  member,
  columnIndex,
  isCurrent,
  isPrev,
}: TeamMemberCardProps) {
  let positionClass = "translate-x-full";
  let transitionClass = "transition-none";

  if (isCurrent) {
    positionClass = "translate-x-0";
    transitionClass = "transition-transform duration-[600ms] ease-in-out";
  } else if (isPrev) {
    positionClass = "-translate-x-full";
    transitionClass = "transition-transform duration-[600ms] ease-in-out";
  }

  const delay = isCurrent || isPrev ? `${columnIndex * 150}ms` : "0ms";

  return (
    <div
      className={`
        absolute
        inset-0
        flex
        flex-col
        justify-end
        p-4

        ${positionClass}
        ${transitionClass}

        max-md:flex-row
        max-md:items-center
        max-md:justify-start
        max-md:p-0
      `}
      style={{
        transitionDelay: delay,
      }}
    >
      <div
        className="
          absolute
          inset-0
          overflow-hidden

          max-md:left-0
          max-md:top-0
          max-md:right-auto
          max-md:bottom-0
          max-md:h-full
          max-md:w-[42%]

          max-md:rounded-tl-xl
          max-md:rounded-bl-xl
        "
      >
        {member.image && (
          <Image
            src={member.image}
            alt={`${member.name} - ${member.title}`}
            fill
            className="
              object-cover
              object-top
            "
            sizes="42vw"
          />
        )}
      </div>

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/90
          via-black/30
          to-transparent

          max-md:hidden
        "
      />

      <div
        className="
          relative
          z-10

          max-md:ml-[42%]
          max-md:flex
          max-md:h-full
          max-md:flex-1
          max-md:flex-col
          max-md:justify-center
          max-md:overflow-hidden
          max-md:px-3
        "
      >
        <p
          className="
            body1-semibold
            text-white
            max-md:text-sm
          "
        >
          {member.name}
        </p>

        <p
          className="
            body2-regular
            mt-1
            text-white/80
            line-clamp-3

            max-md:text-xs
            max-md:leading-[1.3]
          "
        >
          {member.title}
        </p>
      </div>
    </div>
  );
}
