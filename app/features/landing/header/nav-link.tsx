import { NavLinkData } from "./header.types";

interface NavLinkProps {
  link: NavLinkData;
}

export function NavLink({ link }: NavLinkProps) {
  if (!link.href) {
    return (
      <p className="text-white heading-h1-bold transition ease-out duration-300 hover:text-primary-pink-base cursor-pointer">
        {link.label}
      </p>
    );
  }

  return (
    <a href={link.href} target="_self" rel="">
      <p className="text-white heading-h1-bold transition ease-out duration-300 hover:text-primary-pink-base cursor-pointer">
        {link.label}
      </p>
    </a>
  );
}
