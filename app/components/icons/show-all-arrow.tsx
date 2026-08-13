import ArrowCircleIcon from "./arrow-circle-icon";

export default function ShowAllArrow() {
  return (
    <div className="relative h-10 w-10 flex justify-center items-center text-neutral-white-base transition duration-300 ease-out">
      <div className="absolute top-0 left-0 rounded-full group-hover:bg-primary-pink-base group-hover:scale-95 transition duration-300 ease-out">
        <ArrowCircleIcon />
      </div>
      <i className="fa-solid fa-angle-right z-10" />
    </div>
  );
}
