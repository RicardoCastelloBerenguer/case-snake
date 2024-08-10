/* eslint-disable @next/next/no-img-element */
"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React from "react";

const STEPS = [
  {
    name: "Step 1: Add image",
    descrition: "Chose an image for your case",
    url: "/upload",
  },
  {
    name: "Step 2: Customize design",
    descrition: "Make te case yours",
    url: "/design",
  },
  {
    name: "Step 3: Summary",
    descrition: "Review your final product",
    url: "/preview",
  },
];

const Steps = () => {
  const pathName = usePathname();

  return (
    <ol className="rounded-md bg-white lg:flex lg:rounded-none lg:border-1 lg:border-r  lg:border-gray-200 ">
      {STEPS.map((step, i) => {
        const isCurrent = pathName.endsWith(step.url);
        const isCompleted = STEPS.slice(i + 1).some((step) =>
          pathName.endsWith(step.url)
        );
        const imgPath = `/snake-${i + 1}.png`;
        return (
          <li key={step.name} className="relative overflow-hidden lg:flex-1">
            <div>
              <span
                className={cn(
                  "absolute left-0 bottom-0 h-full w-1 bg.zinc-400 lg:top-auto lg:h-1 lg:w-full bg-zinc-300",
                  { "bg-zinc-700": isCurrent, "bg-primary": isCompleted }
                )}
                aria-hidden="true"
              />
              <span
                className={cn(
                  i !== 0 ? "lg:pl-9" : "",
                  "flex items-center px-6 py-4 text-sm font-medium"
                )}
              >
                <div className="flex-shrink-0">
                  <img
                    className={cn(
                      "flex items-center justify-center size-20 object-contain border",
                      {
                        "border-none": isCompleted,
                        "border-zinc-700": isCurrent,
                      }
                    )}
                    src={imgPath}
                    alt=""
                  />
                </div>
                <span className="ml-4 h-full mt-0.5 flex min-w-0 flex-col justify-center">
                  <span
                    className={cn("text-sm font-semibold text-zinc-700", {
                      "text-primary": isCompleted,
                      "text-zinc-700": isCurrent,
                    })}
                  >
                    {step.name}
                  </span>
                  <span className="text-sm text-zinc-500">
                    {step.descrition}
                  </span>
                </span>
              </span>

              {i !== 0 && (
                <div className="absolute inset-0 hidden w-3 lg:block">
                  <svg
                    className="h-full w-full text-gray-300"
                    viewBox="0 0 12 82"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0.5 0V31L10.5 41L0.5 51V82"
                      stroke="currentcolor"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
};

export default Steps;
