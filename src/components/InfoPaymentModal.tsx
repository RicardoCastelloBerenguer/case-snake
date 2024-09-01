import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import type { Dispatch, MouseEventHandler, SetStateAction } from "react";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const InfoPaymentModal = ({
  isOpen,
  setIsOpen,
  createPayment,
  isLoading,
  loadingText,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  createPayment: MouseEventHandler<HTMLButtonElement>;
  isLoading: boolean;
  loadingText: string;
}) => {
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogContent className="abslute z-[999999]">
        <DialogHeader>
          <div className="relative mx-auto size-24 mb-2">
            <Image
              src="/snake-test.png"
              className="object-contain scale-150"
              alt="logo image"
              fill
            />
          </div>
          <DialogTitle className="text-2xl text-center font-bold tracking-tight text-gray-900">
            The application is currently in test mode.
          </DialogTitle>
          <DialogDescription className="text-base text-center py-2 flex flex-col">
            <span className="font-medium text-zinc-600">
              Simply enter the example credit card details below:
            </span>{" "}
            <span>Card Number: 4242 4242 4242 4242</span>
            <span>Expiration Date: Any future date</span>
            <span>CVV: Any three-digit number</span>
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center gap-6 divide-x divide-gray-200">
          <Button
            isLoading={isLoading}
            loadingText={loadingText}
            onClick={createPayment}
            className="px-6"
          >
            Go to payment <ArrowRight className="size-4 ml-2 inline" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InfoPaymentModal;
