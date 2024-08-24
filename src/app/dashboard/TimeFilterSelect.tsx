"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

const TIME_VALUES = [
  { label: "1 Week", value: "7" },
  { label: "2 Week", value: "14" },
  { label: "1 Month", value: "30" },
  { label: "2 Month", value: "60" },
  { label: "3 Month", value: "90" },
  { label: "6 Month", value: "180" },
  { label: "1 year", value: "365" },
];

const TimeFilterSelect = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [timeFilter, setTimeFilter] = useState<{
    label: string;
    value: string;
  } | null>(null);

  useEffect(() => {
    const timeFilterValue =
      searchParams.get("timeFilter") ?? TIME_VALUES[0].value;
    const filter =
      TIME_VALUES.find((item) => item.value === timeFilterValue) ||
      TIME_VALUES[0];
    setTimeFilter(filter);
  }, [searchParams]);

  const handleFilter = (newTimeFilter: string) => {
    router.push(`?timeFilter=${newTimeFilter}`);
  };

  if (!timeFilter) {
    // If timeFilter is not set yet, you can return null or a loading indicator
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="w-52 flex justify-center items-center"
          variant="outline"
        >
          {timeFilter.label}
          <ChevronsUpDown className="size-4 ml-2 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {TIME_VALUES.map((time) => (
            <DropdownMenuItem
              onClick={() => handleFilter(time.value)}
              className={cn(
                "hover:cursor-pointer flex",
                time.value === timeFilter.value && "bg-zinc-200"
              )}
              key={time.value}
            >
              {time.value === timeFilter.value && (
                <Check className="size-4 mr-2 text-primary" />
              )}
              {time.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TimeFilterSelect;
