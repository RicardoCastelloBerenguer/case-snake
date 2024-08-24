"use client";
import { OrderStatus } from "@prisma/client";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { changeOrderStatus } from "./actions";
import { useRouter } from "next/navigation";

const LABEL_MAP_STATUS: Record<keyof typeof OrderStatus, string> = {
  awaiting_shipment: "Awaiting shipment",
  fulfilled: "Fulfilled",
  shipped: "Shipped",
};

const StatusDropdown = ({
  id,
  orderStatus,
}: {
  id: string;
  orderStatus: OrderStatus;
}) => {
  const router = useRouter();

  const { mutate } = useMutation({
    mutationKey: ["change-order-status"],
    mutationFn: changeOrderStatus,
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="w-52 flex justify-center items-center"
          variant="outline"
        >
          {LABEL_MAP_STATUS[orderStatus]}
          <ChevronsUpDown className="size-4 ml-2 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {Object.keys(OrderStatus).map((status) => (
            <DropdownMenuItem
              onClick={() => mutate({ id, newStatus: status as OrderStatus })}
              className={cn(
                "flex hover:cursor-pointer cursor-default hover:bg-zinc-100 text-sm gap-1 items-center p-2.5",
                { "bg-zinc-100": orderStatus === status }
              )}
              key={status}
            >
              <Check
                className={cn(
                  "mr-2 size-4 text-primary",
                  orderStatus === status ? "opacity-100" : "opacity-0"
                )}
              />
              {LABEL_MAP_STATUS[status as OrderStatus]}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StatusDropdown;
