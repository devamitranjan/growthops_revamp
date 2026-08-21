import { FaAngleRight } from "react-icons/fa6";
import { SubNavLinkData } from "./header.types";

interface SubNavLinkProps {
  link: SubNavLinkData;
}

export function SubNavLink({ link }: SubNavLinkProps) {
  return (
    <a href={link.href} target="_self" rel="">
      <div className="group flex gap-1 text-white">
        <p className="heading-h4-bold md:heading-h5-bold group-hover:text-primary-pink-base transition ease-out duration-300">
          {link.label}
        </p>
        <div className="relative h-8 w-8 flex justify-center items-center shrink-0 opacity-0 transition duration-300 ease-out group-hover:opacity-100">
          <FaAngleRight className="z-10" />
        </div>
      </div>
    </a>
  );
}
