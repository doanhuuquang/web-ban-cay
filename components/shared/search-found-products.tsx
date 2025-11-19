"use client";

import ProductCard from "@/components/shared/product-card";
import { Button } from "@/components/ui/button";
import { productItemsSample } from "@/lib/constants/product-items";
import { cn } from "@/lib/utils";
import {
  ArrowDownNarrowWide,
  ArrowDownWideNarrow,
  PackagePlus,
  Settings2,
  TrendingUp,
  Zap,
} from "lucide-react";
import React from "react";

const filterButtons = [
  {
    title: "Tất cả",
    value: "all",
    icon: <Settings2 />,
  },
  {
    title: "Phổ biến",
    value: "popular",
    icon: <TrendingUp />,
  },
  {
    title: "Mới nhất",
    value: "newest",
    icon: <PackagePlus />,
  },
  {
    title: "Bán chạy",
    value: "best-selling",
    icon: <Zap />,
  },
  {
    title: "Giá: Thấp đến Cao",
    value: "price-low-to-high",
    icon: <ArrowDownNarrowWide />,
  },
  {
    title: "Giá: Cao đến Thấp",
    value: "price-high-to-low",
    icon: <ArrowDownWideNarrow />,
  },
];

export default function SearchFoundProducts() {
  const [currentFilter, setCurrentFilter] = React.useState<string>("all");

  return (
    <div className="space-y-10">
      <div className="w-full flex items-center gap-3 overflow-x-scroll scrollbar-hide">
        {filterButtons.map((button) => (
          <Button
            key={button.value}
            onClick={() => setCurrentFilter(button.value)}
            className={cn(
              "bg-muted hover:bg-muted/70 text-foreground rounded-full",
              currentFilter === button.value && "border border-foreground"
            )}
          >
            {button.icon}
            <span>{button.title}</span>
          </Button>
        ))}
      </div>

      <div className="w-full grid lg:grid-cols-4 grid-cols-2 gap-4">
        {productItemsSample.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
