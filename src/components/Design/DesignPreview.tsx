"use client";

import React, { useEffect, useState } from "react";
import Phone from "../Phone";
import { Configuration } from "@prisma/client";
import { cn, formatPrice } from "@/lib/utils";
import { COLORS, MODELS } from "@/validators/option-validator";
import { ArrowRight, Check } from "lucide-react";
import { BASE_PRICE, PRODUCTS_PRICES } from "@/config/products";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { createCheckoutSession } from "@/app/configure/preview/actions";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import LoginModal from "../LoginModal";
import { useUser } from "@/contexts/userContext";
import InfoPaymentModal from "../InfoPaymentModal";

const DesignPreview = ({ configuration }: { configuration: Configuration }) => {
  const { user } = useUser();
  const { caseColor, model, finish, caseMaterial } = configuration;
  const { isLoggedIn } = useUser();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const [isLoadingRedirect, setIsLoadingRedirect] = useState(false);

  const router = useRouter();

  const { toast } = useToast();

  const tw = COLORS.find(
    (color) => color.value.toLowerCase() === caseColor!.toLowerCase()
  )?.tw;

  const { label: modelLabel } = MODELS.options.find(
    ({ value }) => value === model
  )!;

  let totalPrice = BASE_PRICE;
  if (caseMaterial === "polycarbonate")
    totalPrice += PRODUCTS_PRICES.material.polycarbonate;
  if (finish === "textured") totalPrice += PRODUCTS_PRICES.finish.textured;

  const { mutate: createPaymentSession } = useMutation({
    mutationKey: ["get-checkout-session"],
    mutationFn: createCheckoutSession,
    onSuccess: ({ url }) => {
      if (url) router.push(url);
      else throw new Error("Unable to retrieve payment URL");
      setIsLoadingRedirect(false);
    },
    onError: (error) => {
      console.log(error);
      toast({
        title: "Something went wrong",
        description: "There was an error on our server, Try again later.",
        variant: "destructive",
      });
      setIsLoadingRedirect(false);
    },
  });

  const handleChekout = () => {
    if (isLoggedIn) {
      setIsInfoModalOpen(true);
    } else {
      localStorage.setItem("configurationId", configuration.id);
      setIsLoginModalOpen(true);
    }
  };

  const createCheckout = () => {
    setIsLoadingRedirect(true);
    createPaymentSession({
      configId: configuration.id,
      userLogged: { email: user!.email },
    });
  };

  useEffect(() => {
    console.log("removing");
    localStorage.removeItem("configurationId");
  }, []);

  return (
    <>
      <LoginModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen} />
      <InfoPaymentModal
        isLoading={isLoadingRedirect}
        loadingText="Redirecting..."
        isOpen={isInfoModalOpen}
        setIsOpen={setIsInfoModalOpen}
        createPayment={createCheckout}
      />

      <div
        className="mt-20 flex flex-col md:grid text-sm sm:grid-cols-12 sm:grid-rows-1 
      sm:gap-x-6 md:gap-x-8 lg:gap-x-12"
      >
        <div className="sm:col-span-4 md:col-span-4 md:row-span-2 md:row-end-2 flex items-center justify-center">
          <Phone
            className={cn(`bg-${tw}`, "max-w-[200px] md:max-w-full")}
            imgSource={configuration.croppedImage!}
          />
        </div>

        <div className="mt-6 sm:col-span-9  md:row-end-1">
          <h3 className="text-3xl font-bold tracking-tight">
            Your {modelLabel} case
          </h3>
          <div className="mt-3 flex items-center gap-1.5 text-base">
            <Check className="size-4 text-primary" />
            In stock and ready to ship
          </div>
        </div>
        <div className="sm:col-span-12 md:col-span-9 text-base">
          <div>
            <div
              className="grid grid-cols-1 gap-y-8 border-b
             border-gray-200 py-8 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10"
            >
              <div>
                <p className="font-medium text-zinc-950">Materials</p>
                <ol className="mt-3 text-zinc-700 list-disc list-inside ">
                  <li>High-quality TPU</li>
                  <li>Scratch-resistant polycarbonate</li>
                  <li>Soft microfiber to prevent scratches</li>
                  <li>Precision cutouts for easy access</li>
                </ol>
              </div>

              <div>
                <p className="font-medium text-zinc-950">Features</p>
                <ol className="mt-3 text-zinc-700 list-disc list-inside">
                  <li>Ultra-slim design </li>
                  <li>Supports wireless charging</li>
                  <li>Enhanced grip</li>
                </ol>
              </div>
            </div>
            <div className="mt-8">
              <div className="bg-gray-100 p-6 sm:rounded-lg sm:p-8">
                <div className="flow-root text-sm">
                  <div className="flex items-center justify-between py-1 mt-2">
                    <p className="text-gray-600">Base price</p>
                    <p className="font-medium text-gray-900">
                      {formatPrice(BASE_PRICE / 100)}
                    </p>
                  </div>
                  {finish === "textured" && (
                    <div className="flex items-center justify-between py-1 mt-2">
                      <p className="text-gray-600">Textured Finish</p>
                      <p className="font-medium text-gray-900">
                        {formatPrice(PRODUCTS_PRICES.finish.textured / 100)}
                      </p>
                    </div>
                  )}
                  {caseMaterial === "polycarbonate" && (
                    <div className="flex items-center justify-between py-1 mt-2">
                      <p className="text-gray-600">Polycarbonate material</p>
                      <p className="font-medium text-gray-900">
                        {formatPrice(
                          PRODUCTS_PRICES.material.polycarbonate / 100
                        )}
                      </p>
                    </div>
                  )}
                  {/* <div className="my-2 h-px bg-gray-200"></div> */}
                  <div className="border-t border-gray-200 pt-4 mt-3 pb-1 flex items-center justify-between">
                    <p className="font-semibold text-gray-900">
                      Order total :{" "}
                    </p>
                    <p className="font-semibold text-gray-900">
                      {formatPrice(totalPrice / 100)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end pb-12">
              <Button
                isLoading={isLoadingRedirect}
                disabled={isLoadingRedirect}
                loadingText="Redirecting..."
                onClick={() => handleChekout()}
                className="px-4 sm:px-6 lg:px-8"
              >
                Go to payment <ArrowRight className="size-4 ml-2 inline" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesignPreview;
