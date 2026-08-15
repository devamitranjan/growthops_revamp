"use client";

import { Dialog, VisuallyHidden } from "radix-ui";
import { FaXmark } from "react-icons/fa6";

interface VideoDialogProps {
  open: boolean;
  title: string;
  videoSrc?: string;
  onOpenChange: (open: boolean) => void;
  onCloseAutoFocus?: (event: Event) => void;
}

export function VideoDialog({
  open,
  title,
  videoSrc,
  onOpenChange,
  onCloseAutoFocus,
}: VideoDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-99 bg-neutral-black-base opacity-0 transition duration-300 data-[state=open]:opacity-90" />
        <Dialog.Content
          onCloseAutoFocus={onCloseAutoFocus}
          className="fixed inset-0 z-99 h-screen w-full opacity-0 outline-none transition duration-300 data-[state=open]:opacity-100"
        >
          <VisuallyHidden.Root>
            <Dialog.Title>{title}</Dialog.Title>
          </VisuallyHidden.Root>

          <Dialog.Close
            type="button"
            aria-label="Close video"
            className="fixed right-0 top-[24px] mr-6 flex items-center justify-center text-2xl text-neutral-white-base md:top-[40px] md:mr-20 md:text-4xl"
          >
            <FaXmark aria-hidden="true" />
          </Dialog.Close>
          <div className="generic-container flex h-full flex-col items-center justify-center gap-6 md:w-[90%]">
            {videoSrc && (
              <video
                className="w-full bg-neutral-black-base md:aspect-video"
                preload="metadata"
                controls
                autoPlay
                playsInline
                aria-label={title}
              >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
