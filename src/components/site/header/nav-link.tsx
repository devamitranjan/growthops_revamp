"use client";

import Link from "next/link";
import { Dialog } from "radix-ui";
import { FaAngleRight } from "react-icons/fa6";
import type { NavLinkData } from "@/sanity/types";

interface NavLinkProps {
  link: NavLinkData;
  isExpanded: boolean;
  isDimmed: boolean;
  onToggle: () => void;
}

export function NavLink({
  link,
  isExpanded,
  isDimmed,
  onToggle,
}: NavLinkProps) {
  const labelClass = `heading-h1-bold transition ease-out duration-300 hover:text-primary-pink-base cursor-pointer ${
    isExpanded
      ? "text-primary-pink-base"
      : isDimmed
        ? "text-neutral-grey-base"
        : "text-white"
  }`;

  if (!link.children?.length) {
    if (!link.href) {
      return <p className={labelClass}>{link.label}</p>;
    }

    // An in-app <Link> no longer tears the page down the way a full navigation
    // did, so the menu has to be dismissed explicitly. Today each page renders
    // its own Header and unmounting would close it anyway; Dialog.Close keeps
    // that from silently breaking if Header ever moves into a shared layout.
    return (
      <Dialog.Close asChild>
        {link.href.startsWith("/") ? (
          <Link href={link.href}>
            <p className={labelClass}>{link.label}</p>
          </Link>
        ) : (
          <a href={link.href} target="_self" rel="">
            <p className={labelClass}>{link.label}</p>
          </a>
        )}
      </Dialog.Close>
    );
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isExpanded}
      className={`${labelClass} flex items-center gap-4`}
    >
      {link.label}
      <FaAngleRight
        className={`text-[0.5em] transition-transform duration-300 ease-out ${
          isExpanded ? "rotate-90 md:rotate-0" : ""
        }`}
      />
    </button>
  );
}
