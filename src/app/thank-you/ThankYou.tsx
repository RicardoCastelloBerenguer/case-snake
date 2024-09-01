"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getPaymentStatus } from "./actions";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import PhonePreview from "@/components/PhonePreview";
import { formatPrice } from "@/lib/utils";
import { useUser } from "@/contexts/userContext";
import { toast } from "@/components/ui/use-toast";
import RedirectIfNotLoggedIn from "../dashboard/RedirectIfNotLoggedIn";

const ThankYou = () => {
  const router = useRouter();
  const { user, isLoading, isLoggedIn, logout } = useUser();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "";

  const { data, error, isError } = useQuery({
    queryKey: ["get-payment-status"],
    queryFn: async () => {
      try {
        console.log(user);
        return await getPaymentStatus({
          orderId,
          userLoggedIn: { email: user!.email },
        });
      } catch (error) {
        if (error instanceof Error) {
          return Promise.reject(error);
        }
        return Promise.reject(new Error("Unknown error occurred"));
      }
    },
    retry: false,
    retryDelay: 700,
    enabled: !!user && !!user.email,
  });

  if (isError && error instanceof Error) {
    console.log(error);
    toast({
      title: "You cannot access this order",
      description: error.message,
      variant: "destructive",
    });
    router.push("/");
  }

  if (data === undefined)
    return (
      <>
        <div className="w-full mt-24 fles justify-center">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="size-8 animate-spin text-zinc-500" />
            <h3 className="font-semibold text-xl">Loading your order...</h3>
            <p className="animate-pulse">Please wait</p>
          </div>
        </div>
      </>
    );

  if (!data)
    return (
      <>
        <div className="w-full mt-24 fles justify-center">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="size-8 animate-spin text-zinc-500" />
            <h3 className="font-semibold text-xl">
              Checking your payment is completed...
            </h3>
            <p className="animate-pulse">This might take a moment.</p>
          </div>
        </div>
      </>
    );

  const { configuration, price, billingAddress, shippingAddress } = data;

  return (
    <div className="bg-white ">
      <RedirectIfNotLoggedIn />
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-xl">
          <p className="text-base font-medium text-primary">Thank you!</p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Your case is on the way!
          </h2>
          <p className="mt-2 text-base text-zinc-500">
            We received your order and now we are processing it.
          </p>
          <div className="mt-12 text-sm font-medium">
            <p className="text-zinc-900">Order number :</p>
            <p className="mt-2 text-zinc-500"> {orderId} </p>
          </div>
        </div>
        <div className="mt-10 border-t border-zinc-200">
          <div className="mt-10 flex flex-auto flex-col">
            <h4>Great choice for your phone case!</h4>
            <p className="mt-2 text-sm text-zinc-600">
              At Case Snake, we believe that a phone case should not only
              protect but also reflect the unique style of each user. We are
              committed to offering high-quality products, meticulously designed
              and crafted from the finest materials to ensure durability and
              elegance in every detail. Protect your phone with the confidence
              and style you deserve.
            </p>
          </div>
        </div>

        <div
          className="flex space-x-6 overflow-hidden mt-4 rounded-xl bg-gray-900/5
        ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl"
        >
          <PhonePreview
            croppedImageUrl={configuration.croppedImage!}
            caseColor={configuration.caseColor!}
          />
        </div>
        <div>
          <div className="grid grid-cols-2 gap-x-6 py-10 text-sm">
            <div>
              <p className="font-medium text-gray-900">Shiping Address</p>

              <div className="mt-2 text-zinc-700">
                <address className="not-italic">
                  <span className="block">{shippingAddress?.name}</span>
                  <span className="block">{shippingAddress?.street}</span>
                  <span className="block">{shippingAddress?.postalCode}</span>
                  <span className="block">{shippingAddress?.city}</span>
                </address>
              </div>
            </div>
            <div>
              <p className="font-medium text-gray-900">Billing Address</p>

              <div className="mt-2 text-zinc-700">
                <address className="not-italic">
                  <span className="block">{billingAddress?.name}</span>
                  <span className="block">{billingAddress?.street}</span>
                  <span className="block">{billingAddress?.postalCode}</span>
                  <span className="block">{billingAddress?.city}</span>
                </address>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-6 border-t border-zinc-200 py-10 text-sm">
            <div>
              <p className="font-medium text-zinc-900">Payment status</p>
              <p className="mt-2 text-zinc-700">Paid</p>
            </div>

            <div>
              <p className="font-medium text-zinc-900">Shipping Method</p>
              <p className="mt-2 text-zinc-700">
                FastTrack Delivery: delivers in just 2 days!
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-6 border-t border-zinc-200 pt-10 text-sm">
          <div className="flex justify-between">
            <p className="font-medium text-zinc-900">Subtotal</p>
            <p className="font-medium text-zinc-900">{formatPrice(price)}</p>
          </div>

          <div className="flex justify-between">
            <p className="font-medium text-zinc-900">Shipping</p>
            <p className="font-medium text-zinc-900">{formatPrice(0)}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium text-zinc-900">Total</p>
            <p className="font-medium text-zinc-900">{formatPrice(price)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
