"use server";

import { getUserByEmail } from "@/api/user";
import { db } from "@/db";
import { redirect } from "next/navigation";

export const getPaymentStatus = async ({
  orderId,
  userLoggedIn,
}: {
  orderId: string;
  userLoggedIn?: { email: string };
}) => {
  console.log(userLoggedIn);
  let user = undefined;
  // if (!userLoggedIn!.email) redirect("/");
  if (userLoggedIn) {
    user = await getUserByEmail(userLoggedIn.email);
  }
  if (!user || typeof user === "boolean")
    throw new Error("You need to be logged in");

  const order = await db.order.findFirst({
    where: { id: orderId, userId: user.id },
    include: {
      billingAddress: true,
      configuration: true,
      shippingAddress: true,
      user: true,
    },
  });

  if (!order) throw new Error("This order does not exist");
  if (order.isPaid) return order;
  else return false;
};
