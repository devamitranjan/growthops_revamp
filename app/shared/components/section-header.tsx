import { ShowAllLink } from "./show-all-links";

const DEFAULT_WRAPPER_CLASSNAME =
  "mb-8 flex items-center justify-between md:mb-12";

interface SectionHeaderProps {
  title: React.ReactNode;
  titleClassName: string;
  subtitle?: React.ReactNode;
  link?: string;
  className?: string;
}

export function SectionHeader({
  title,
  titleClassName,
  subtitle,
  link,
  className = DEFAULT_WRAPPER_CLASSNAME,
}: SectionHeaderProps) {
  return (
    <div className={className}>
      <div className="flex flex-col gap-3 md:gap-4">
        <h2 className={titleClassName}>{title}</h2>
        {subtitle}
      </div>
      {link && <ShowAllLink link={link} />}
    </div>
  );
}
