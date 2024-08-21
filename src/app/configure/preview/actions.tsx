"use server";

import { BASE_PRICE, PRODUCTS_PRICES } from "@/config/products";
import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Order } from "@prisma/client";
import { stripe } from "@/lib/stripe";
export const createCheckoutSession = async ({
  configId,
}: {
  configId: string;
}) => {
  try {
    const configuration = await db.configuration.findUnique({
      where: { id: configId },
    });

    if (!configuration) {
      throw new Error("The configuration doesnt exist");
    }

    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      throw new Error("The user is not logged in");
    }

    const { finish, caseMaterial } = configuration;

    let price = BASE_PRICE;

    if (finish === "textured") price += PRODUCTS_PRICES.finish.textured;
    if (caseMaterial === "polycarbonate")
      price += PRODUCTS_PRICES.material.polycarbonate;

    let order: Order | undefined;

    const orderExist = await db.order.findFirst({
      where: {
        userId: user.id,
        configurationId: configuration.id,
      },
    });

    console.log(user.id);

    if (orderExist) {
      order = orderExist;
    } else {
      order = await db.order.create({
        data: {
          price: price / 100,
          userId: user.id,
          configurationId: configuration.id,
        },
      });
    }

    const product = await stripe.products.create({
      name: "Custom Case",
      images: [configuration.imageUrl],
      default_price_data: {
        currency: "EUR",
        unit_amount: price,
      },
    });

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/configure/preview?id=${configuration.id}`,
      payment_method_types: ["card", "paypal"],
      mode: "payment",
      metadata: {
        userId: user.id,
        orderId: order.id,
      },
      shipping_address_collection: {
        allowed_countries: ["US", "ES", "FR"],
      },
      line_items: [{ price: product.default_price as string, quantity: 1 }],
    });

    return { url: stripeSession.url };
  } catch (error) {
    console.log(error);
  }
};
