/* eslint-disable @next/next/no-img-element */
"use client";
import { CaseColor } from "@prisma/client";
import React, { useEffect, useRef, useState } from "react";
import { AspectRatio } from "./ui/aspect-ratio";
import { cn } from "@/lib/utils";

const PhonePreview = ({
  croppedImageUrl,
  caseColor,
}: {
  croppedImageUrl: string;
  caseColor: CaseColor;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [renderedDimensions, setRenderedDimensions] = useState({
    height: 0,
    width: 0,
  });

  const handleResize = () => {
    if (!ref.current) return;
    const { width, height } = ref.current.getBoundingClientRect();
    setRenderedDimensions({ width, height });
  };

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <AspectRatio ref={ref} ratio={3000 / 2001} className="relative">
      <div
        className="absolute z-20 scale-[1.0352]"
        style={{
          left:
            renderedDimensions.width / 2 -
            renderedDimensions.width / (1216 / 121),
          top: renderedDimensions.height / 6.22,
        }}
      >
        <img
          className={cn(
            "phone-skew relative z-20 rounded-t-[15px] rounded-b-[10px] md:rounded-t-[30px] md:rounded-t-[30px] md:rounded-b-[20px]",
            `bg-${caseColor}-950`
          )}
          src={croppedImageUrl}
          width={renderedDimensions.width / (3000 / 637)}
          alt="example preview case phone image"
        />
      </div>

      <div className="relative h-full w-full z-40">
        <img
          className="pointer-events-none h-full w-full antialiased rounded-md"
          src="/clearphone.png"
          alt="phone"
        />
      </div>
    </AspectRatio>
  );
};

export default PhonePreview;
