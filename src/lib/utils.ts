import { useUser } from "@/contexts/userContext";
import { User } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { Metadata } from "next";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const formatPrice = (price: number) => {
  const formatter = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  });

  return formatter.format(price);
};

export const constructMetadata = ({
  title = "Case Snake - Stylish and Durable Mobile Phone Cases",
  description = "From sleek designs to rugged protection, find the perfect case to complement your device and express your personality.",
  image = "/thumbnail.png",
  icons = "/favicon.ico",
  baseUrl = process.env.NEXT_PUBLIC_SERVER_URL, // Asegúrate de cambiarlo a tu URL real
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  baseUrl?: string;
} = {}): Metadata => {
  return {
    title,
    description,
    metadataBase: new URL(baseUrl!), // Añadir metadataBase aquí
    openGraph: {
      images: [{ url: `${baseUrl}${image}` }], // Usar URL completa
      description,
      title,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}${image}`], // Usar URL completa
    },
    icons: `${baseUrl}${icons}`, // Usar URL completa para iconos también
  } as Metadata;
};
