interface ScrollArrowButtonProps {
  direction: "left" | "right";
  onClick: () => void;
}

const directionConfig = {
  left: {
    position: "left-[-40px]",
    icon: "fa-angle-left",
    label: "Scroll left",
  },
  right: {
    position: "right-[-40px]",
    icon: "fa-angle-right",
    label: "Scroll right",
  },
} as const;

export function ScrollArrowButton({
  direction,
  onClick,
}: ScrollArrowButtonProps) {
  const { position, icon, label } = directionConfig[direction];

  return (
    <button
      onClick={onClick}
      className={`absolute ${position} top-1/2 z-20 -translate-y-1/2 cursor-pointer text-2xl text-white opacity-60 transition duration-300 ease-out hover:opacity-100 max-md:hidden`}
      aria-label={label}
    >
      <i className={`fa-solid ${icon}`} />
    </button>
  );
}
