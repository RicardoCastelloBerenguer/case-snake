// bg-blue-950 border-blue-950
// bg-zinc-900 border-zinc-900
// bg-rose-950 border-rose-950

import { PRODUCTS_PRICES } from "@/config/products";

export const COLORS = [
  {
    label: "Black",
    value: "black",
    tw: "zinc-900",
  },
  {
    label: "Blue",
    value: "blue",
    tw: "blue-950",
  },
  {
    label: "Rose",
    value: "rose",
    tw: "rose-950",
  },
] as const;

export const MODELS = {
  name: "models",
  options: [
    {
      label: "iPhone X",
      value: "Iphonex",
    },
    {
      label: "iPhone 11",
      value: "Iphone11",
    },
    {
      label: "iPhone 12",
      value: "Iphone12",
    },
    {
      label: "iPhone 13",
      value: "Iphone13",
    },
    {
      label: "iPhone 14",
      value: "Iphone14",
    },
    {
      label: "iPhone 15",
      value: "Iphone15",
    },
  ],
} as const;

export const MATERIALS = {
  name: "material",
  options: [
    {
      label: "Silicone",
      value: "silicone",
      description: undefined,
      price: PRODUCTS_PRICES.material.silicone,
    },
    {
      label: "Soft Polycarbonate",
      value: "polycarbonate",
      description: "Scratch-resistant coating",
      price: PRODUCTS_PRICES.material.polycarbonate,
    },
  ],
} as const;

export const FINISHES = {
  name: "finish",
  options: [
    {
      label: "Smooth Finish",
      value: "smooth",
      description: undefined,
      price: PRODUCTS_PRICES.finish.smooth,
    },
    {
      label: "textured Finish",
      value: "textured",
      description: "Soft grippy testure",
      price: PRODUCTS_PRICES.finish.textured,
    },
  ],
} as const;
