"use server";

import { getUserByEmail } from "@/api/user";
import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export const getPaymentStatus = async ({
  orderId,
  userLoggedIn,
}: {
  orderId: string;
  userLoggedIn?: { email: string };
}) => {
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

  console.log(orderId);
  console.log(user.id);

  if (!order) throw new Error("this order does not exist");
  if (order.isPaid) return order;
  else return false;
};
