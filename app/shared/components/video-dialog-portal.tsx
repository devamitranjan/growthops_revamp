"use client";

import { Dialog, VisuallyHidden } from "radix-ui";
import { FaXmark } from "react-icons/fa6";

interface VideoDialogPortalProps {
  title: string;
  videoProps?: React.VideoHTMLAttributes<HTMLVideoElement>;
  children?: React.ReactNode;
}

export function VideoDialogPortal({
  title,
  videoProps,
  children,
}: VideoDialogPortalProps) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="h-screen w-full fixed transition duration-300 ease-in-out top-0 left-0 bg-neutral-black-base opacity-0 data-[state=open]:opacity-90 z-99" />
      <Dialog.Content className="h-screen w-full fixed transition duration-300 ease-in-out top-0 left-0 opacity-0 data-[state=open]:opacity-100 outline-none z-99">
        <VisuallyHidden.Root asChild>
          <Dialog.Title>{title}</Dialog.Title>
        </VisuallyHidden.Root>
        <Dialog.Close className="fixed top-[24px] md:top-[40px] right-0 mr-6 md:mr-20 flex text-2xl md:text-4xl justify-center items-center text-neutral-white-base">
          <FaXmark />
        </Dialog.Close>
        <div className="generic-container h-full md:w-[90%] flex flex-col gap-6 justify-center items-center">
          <video
            className="w-full aspect-auto md:aspect-video bg-neutral-black-base"
            preload="auto"
            controls
            {...videoProps}
          >
            {children}
            Your browser does not support the video tag.
          </video>
          <div className="w-full flex flex-col gap-1 md:gap-2" />
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
