import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import type { Dispatch, SetStateAction } from "react";
import { buttonVariants } from "./ui/button";
import Link from "next/link";

const LoginModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogContent className="abslute z-[999999]">
        <DialogHeader>
          <div className="relative mx-auto size-24 mb-2">
            <Image
              src="/snake-1.png"
              className="object-contain"
              alt="logo image"
              fill
            />
          </div>
          <DialogTitle className="text-2xl text-center font-bold tracking-tight text-gray-900">
            Log in to continue
          </DialogTitle>
          <DialogDescription className="text-base text-center py-2">
            <span className="font-medium text-zinc-600">
              Your configuration was saved. Dont worry!
            </span>{" "}
            Please login or create an account to be able to complete your
            purchase.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-6 divide-x divide-gray-200">
          <Link
            href={"/auth?login=true"}
            className={buttonVariants({ variant: "outline" })}
          >
            Login
          </Link>
          <Link
            href={"/auth?login=false"}
            className={buttonVariants({ variant: "default" })}
          >
            Register
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
