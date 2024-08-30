"use client";

import React, { useEffect, useRef, useState } from "react";

import ShadcnImage from "next/image";

import { ScrollArea } from "@/components/ui/scroll-area";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Field, Label, Radio, RadioGroup } from "@headlessui/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Rnd } from "react-rnd";

import { cn, formatPrice } from "@/lib/utils";
import HandleComponent from "../HandleComponent";
import {
  COLORS,
  FINISHES,
  MATERIALS,
  MODELS,
} from "@/validators/option-validator";
import { Button } from "../ui/button";
import { ArrowRight, Check, ChevronsUpDown } from "lucide-react";
import { Description } from "@radix-ui/react-toast";
import { BASE_PRICE } from "@/config/products";
import { useUploadThing } from "@/lib/uploadthings";
import { useToast } from "../ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import {
  saveConfig as _saveConfig,
  SaveConfigArgs,
} from "@/app/configure/design/actions";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/userContext";

interface DesignConfiguratorProps {
  configId: string;
  imageUrl: string;
  imageDimensions: { width: number; height: number };
}

const DesignConfigurator = ({
  configId,
  imageDimensions,
  imageUrl,
}: DesignConfiguratorProps) => {
  const { isLoggedIn } = useUser();

  const { toast } = useToast();

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const { mutate: saveConfig, isPending } = useMutation({
    mutationKey: ["save-config"],
    mutationFn: async (args: SaveConfigArgs) => {
      setIsLoading(true);
      await Promise.all([saveConfiguration(), _saveConfig(args)]);
    },
    onError: () => {
      setIsLoading(false);
      toast({
        title: "Something went wrong",
        description: "An error occurred on our servers. Please try again",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      console.log("set Off");
      setTimeout(() => {
        console.log("set On");
        setIsLoading(false);
      }, 1000);

      router.push(`/configure/preview?id=${configId}`);
    },
  });

  saveConfig;

  const [options, setOptions] = useState<{
    color: (typeof COLORS)[number];
    model: (typeof MODELS.options)[number];
    material: (typeof MATERIALS.options)[number];
    finish: (typeof FINISHES.options)[number];
  }>({
    color: COLORS[0],
    model: MODELS.options[0],
    material: MATERIALS.options[0],
    finish: FINISHES.options[0],
  });

  const [renderedImageDimension, setRenderedImageDimension] = useState({
    width: imageDimensions.width / 4,
    height: imageDimensions.height / 4,
  });

  const [renderedImagePosition, setRenderedImagePosition] = useState({
    x: 125,
    y: 215,
  });

  const phoneContainerRef = useRef<HTMLDivElement>(null);
  const phoneCaseRef = useRef<HTMLDivElement>(null);

  const { startUpload } = useUploadThing("imageUploader");

  const saveConfiguration = async () => {
    try {
      const {
        left: phoneCaseLeft,
        top: phoneCaseTop,
        width,
        height,
      } = phoneCaseRef.current!.getBoundingClientRect();

      const { left: phoneContainerLeft, top: phoneContainerTop } =
        phoneContainerRef.current!.getBoundingClientRect();

      const leftOffset = phoneCaseLeft - phoneContainerLeft;
      const topOffset = phoneCaseTop - phoneContainerTop;

      const actualX = renderedImagePosition.x - leftOffset;
      const actualY = renderedImagePosition.y - topOffset;

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const canvasContext = canvas.getContext("2d");

      const userImage = new Image();
      userImage.crossOrigin = "anonymous";
      userImage.src = imageUrl;

      await loadImage(userImage);

      canvasContext?.drawImage(
        userImage,
        actualX,
        actualY,
        renderedImageDimension.width,
        renderedImageDimension.height
      );

      const base64ConvertedImage = canvas.toDataURL();

      // Get actual data of the image and cut from the comma innecesary string
      // base64ConvertedImage = {data: 'image/png;base64  ->,<-  imgDataString'}

      const base64ConvertedImageData = base64ConvertedImage.split(",")[1];

      const blob = base64ToBlob(base64ConvertedImageData, "image/png");
      const file = new File([blob], "filename.png", { type: "image/png" });

      await startUpload([file], { configId });
    } catch (err) {
      alert("Error uploading");
      toast({
        title: "Something went wrong",
        description:
          "There was an error saving your configuration, please try again.",
        variant: "destructive",
      });
    }
  };

  const base64ToBlob = (base64: string, mimeType: string) => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    return new Blob([byteArray], { type: mimeType });
  };

  const loadImage = (
    imgElement: HTMLImageElement
  ): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      imgElement.onload = () => resolve(imgElement);
      imgElement.onerror = reject;
    });
  };

  const handleCheckoutRedirect = () => {
    // if(!isLoggedIn) return;
  };

  return (
    <div className="relative mt-20 grid grid-cols-1 lg:grid-cols-3 mb-20 pb-20">
      <div
        ref={phoneContainerRef}
        className="relative h-[37.5rem] overflow-hidden col-span-2 w-full max-w-4xl flex items-center justify-center ç
        rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus-ring-2 focus:ring-primary 
        focus:ring-offset-2"
      >
        <div className="relative w-60 bg-opacity-50 pointer-events-none aspect-[896/1831]">
          <AspectRatio
            ref={phoneCaseRef}
            ratio={896 / 1831}
            className="pointer-events-none relative z-50 aspect-[896-1831] w-full"
          >
            <ShadcnImage
              fill
              src="/phone-template.png"
              alt="phone design image system"
              className="pointer-events-none z-50 select-none"
            />
          </AspectRatio>
          <div className="absolute z-40 inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px] shadow-[0_0_0_999px_rgba(229,231,235,0.6)]" />
          <div
            className={cn(
              "absolute inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px]",
              `bg-${options.color.tw}`
            )}
          />
        </div>

        <Rnd
          default={{
            x: 125,
            y: 215,
            height: imageDimensions.height / 4,
            width: imageDimensions.width / 4,
          }}
          onResizeStop={(_, __, elementRef, ___, position) => {
            const height = parseInt(elementRef.style.height.slice(0, -2));
            const width = parseInt(elementRef.style.width.slice(0, -2));
            setRenderedImageDimension({
              height: height,
              width: width,
            });
            setRenderedImagePosition({
              x: position.x,
              y: position.y,
            });
          }}
          onDragStop={(_, data) => {
            setRenderedImagePosition({
              x: data.x,
              y: data.y,
            });
          }}
          className="absolute z-20 border-[2px] border-primary"
          lockAspectRatio
          resizeHandleComponent={{
            bottomRight: <HandleComponent />,
            bottomLeft: <HandleComponent />,
            topLeft: <HandleComponent />,
            topRight: <HandleComponent />,
          }}
        >
          <div className="relative w-full h-full">
            <ShadcnImage
              fill
              src={imageUrl}
              alt="Your image redesigned"
              className="pointer-events-none absolute"
            />
          </div>
        </Rnd>
      </div>

      <div className="h-[37.5rem] w-full col-span-full lg:col-span-1 flex flex-col bg-white">
        <ScrollArea className="relative flex-1 overflow-auto">
          <div
            className="absolute z-10 inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-white/50 pointer-events-none "
            aria-hidden
          />
          <div className="px-8 py-8 pb-12">
            <h2 className="tracking-tight font-bold text-3xl border-b-zinc-200 border-b pb-6">
              Customize your case
            </h2>

            <div className="relative mt-4 h-full flex flex-col justify-between gap-6">
              <RadioGroup
                aria-label="Server size"
                value={options.color}
                onChange={(value) => {
                  setOptions((prev) => ({
                    ...prev,
                    color: value,
                  }));
                }}
              >
                <Label>Color : {options.color.label}</Label>
                <div className="mt-3 flex items-center space-x-3">
                  {COLORS.map((color) => (
                    <Radio
                      className={({ focus, checked }) =>
                        cn(
                          "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5",
                          "active:ring-0 focus:ring-0 active:outline-none focus:outline-none border-2 border-transparent",
                          {
                            [`border-${color.tw}`]: focus || checked,
                          }
                        )
                      }
                      key={color.label}
                      value={color}
                    >
                      <span
                        className={cn(
                          `bg-${color.tw}`,
                          "size-8 rounded-full border border-black border-opacity-10"
                        )}
                      />
                    </Radio>
                  ))}
                </div>
              </RadioGroup>

              <div className="relative flex flex-col gap-3 w-full">
                <label>Model</label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      className="w-full justify-between"
                      variant="outline"
                      role="combobox"
                    >
                      {options.model.label}
                      <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-60"></ChevronsUpDown>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {MODELS.options.map((model) => (
                      <div key={model.value}>
                        <DropdownMenuItem
                          className={cn(
                            "flex text-sm gap-1 items-center p-1.5 cursor-default hover:bg-zinc-100 hover:cursor-pointer",
                            {
                              "bg-zinc-100":
                                model.label === options.model.label,
                            }
                          )}
                          onClick={() => {
                            setOptions((prev) => ({ ...prev, model }));
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 size-4",
                              model.label === options.model.label
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {model.label}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </div>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {[MATERIALS, FINISHES].map(
                ({ name, options: selectableOptions }) => (
                  <RadioGroup
                    key={name}
                    value={options[name]}
                    onChange={(value) => {
                      setOptions((prev) => ({
                        ...prev,
                        [name]: value,
                      }));
                    }}
                  >
                    <Label>
                      {name.slice(0, 1).toUpperCase() + name.slice(1)}
                    </Label>
                    <div className="mt-3 space-y-4">
                      {selectableOptions.map((option) => (
                        <Radio
                          key={option.value}
                          value={option}
                          className={({ focus, checked }) =>
                            cn(
                              "relative block cursor-pointer rounded-lg bg-white px-6 py-4",
                              "shadow-sm border-2 border-zinc-200 focus:outline-none sm:flex sm:justify-between",
                              {
                                "border-primary": focus || checked,
                              }
                            )
                          }
                        >
                          <span className="flex items-center">
                            <span className="flex flex-col text-sm">
                              <Label
                                className="text-gray-900 font-medium"
                                as="span"
                              >
                                {option.label}
                              </Label>
                              {option.description && (
                                <Description className="text-gray-500">
                                  <span className="block sm:inline">
                                    {option.description}
                                  </span>
                                </Description>
                              )}
                            </span>
                          </span>
                          <Description className="mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right">
                            <span className="font-medium text-gray-900">
                              {formatPrice(option.price / 100)}
                            </span>
                          </Description>
                        </Radio>
                      ))}
                    </div>
                  </RadioGroup>
                )
              )}
            </div>
          </div>
        </ScrollArea>

        <div className="w-full px-8 h-16 bg-white">
          <div className="h-px w-full bg-zinc-200" />
          <div className="w-full h-full flex justify-end items-center">
            <div className="w-full flex gap-6 items-center">
              <p className="font-medium whitespace-nowrap">
                {formatPrice(
                  BASE_PRICE / 100 +
                    options.finish.price / 100 +
                    options.material.price / 100
                )}
              </p>
              <Button
                isLoading={isPending}
                disabled={isPending}
                loadingText="Redirecting"
                onClick={() => {
                  saveConfig({
                    configId,
                    caseColor: options.color.value,
                    finish: options.finish.value,
                    caseMaterial: options.material.value,
                    model: options.model.value,
                  });
                }}
                size="sm"
                className="w-full"
              >
                Continue
                <ArrowRight className="size-4 ml-1.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignConfigurator;
