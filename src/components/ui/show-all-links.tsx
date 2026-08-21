import { FaAngleRight } from "react-icons/fa6";
import ArrowCircleIcon from "@/components/ui/arrow-circle-icon";

interface IShowAllLinkProps extends React.HTMLAttributes<HTMLDivElement> {
  link: string;
}

export const ShowAllLink: React.FC<IShowAllLinkProps> = ({ link }) => {
  return (
    <a className="group outline-none" href={link} target="_self" rel="">
      <div className="flex items-center gap-5">
        <p className="max-md:hidden body1-semibold text-neutral-white-base group-hover:text-primary-pink-base transition duration-300 ease-out">
          Show all
        </p>
        <div className="relative h-10 w-10 flex justify-center items-center text-neutral-white-base transition duration-300 ease-out">
          <div className="absolute top-0 left-0 rounded-full group-hover:bg-primary-pink-base group-hover:scale-95 transition duration-300 ease-out">
            <ArrowCircleIcon />
          </div>
          <FaAngleRight className="z-10" />
        </div>
      </div>
    </a>
  );
};
