import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { cn, formatPrice } from "@/lib/utils";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Progress } from "@/components/ui/progress";
import StatusDropdown from "./StatusDropdown";
import TimeFilterSelect from "./TimeFilterSelect";

const Page = async ({
  searchParams,
}: {
  searchParams: { timeFilter?: number };
}) => {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  let timeFilter = searchParams.timeFilter || 7;

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    return redirect("/");
  }

  const orders = await db.order.findMany({
    where: {
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - timeFilter)),
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
      shippingAddress: true,
    },
  });

  const lastOrdersSum = await db.order.aggregate({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - timeFilter)),
      },
    },
    _sum: {
      price: true,
    },
  });

  const WEEKLY_GOAL = 500 * (timeFilter / 7);

  return (
    <div className="flex min-h-screen w-full bg-muted/40 px-2 py-2">
      <div className="max-w-7xl w-full mx-auto flex flex-col sm:gap-4 sm:py-4 ">
        <div className="flex flex-col gap-16">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader className="pb-2 flex flex-row justify-between">
                <div className="w-full h-full">
                  <CardDescription>Last Orders</CardDescription>
                  <CardTitle className="text-4xl">
                    {formatPrice(lastOrdersSum._sum.price ?? 0)}
                  </CardTitle>
                </div>
                <TimeFilterSelect />
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  of {formatPrice(WEEKLY_GOAL)} goal
                </div>
              </CardContent>
              <CardFooter>
                <Progress
                  value={((lastOrdersSum._sum.price ?? 0) * 100) / WEEKLY_GOAL}
                />
              </CardFooter>
            </Card>
          </div>

          <h1 className="text-4xl font-bold tracking-tight">Incoming orders</h1>

          <Table>
            <TableCaption>A list of your recent orders.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => {
                return (
                  <TableRow key={order.id} className="bg-accent">
                    <TableCell className="font-medium">
                      <span className="font-medium block">
                        {order.shippingAddress?.name}
                      </span>
                      <span
                        className={cn(
                          "block text-sm text-muted-foreground md:inline",
                          { hidden: order.shippingAddress }
                        )}
                      >
                        {order.user.email}
                      </span>
                    </TableCell>
                    <TableCell>
                      <StatusDropdown
                        id={order.id}
                        orderStatus={order.status}
                      />
                    </TableCell>
                    <TableCell>
                      {order.createdAt.toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatPrice(order.price)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Page;
