"use client";

import ProductCard from "@/components/shared/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categoryItems } from "@/lib/constants/category-items";
import { productItemsSample } from "@/lib/constants/product-items";
import { cn } from "@/lib/utils";
import { ChevronRight, FunnelPlus, Star } from "lucide-react";
import React from "react";

function CategoriesSeclector({ className }: { className?: string }) {
  const [currentCategory, setCurrentCategory] = React.useState<string>(
    categoryItems[0].title
  );

  return (
    <div
      className={cn(
        "w-full bg-background dark:bg-accent/50 shadow-sm divide-y",
        className
      )}
    >
      {categoryItems.map((item, index) => (
        <div
          key={index}
          onClick={() => setCurrentCategory(item.title)}
          className={cn(
            "hover:text-primary cursor-pointer flex items-center justify-between px-4 py-3",
            currentCategory === item.title &&
              "bg-primary text-primary-foreground hover:text-primary-foreground"
          )}
        >
          {item.title}
          <ChevronRight className="opacity-50" />
        </div>
      ))}
    </div>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          size={15}
          className={cn("text-amber-500", index < rating && "fill-amber-500")}
        />
      ))}
    </div>
  );
}

function SortProducts() {
  const sortOptions = [
    { label: "Mới nhất", value: "newest" },
    { label: "Bán chạy", value: "best-seller" },
    { label: "Giá: Thấp đến Cao", value: "price-asc" },
    { label: "Giá: Cao đến thấp", value: "price-desc" },
  ];

  const [sortBy, setSortBy] = React.useState<string>("");

  return (
    <div className="w-full flex items-center gap-4 overflow-x-scroll scrollbar-hide p-4 bg-accent/50 shadow-sm">
      <p className="text-muted-foreground shrink-0">Sắp xếp theo</p>

      {sortOptions.map((option, index) => (
        <Button
          key={index}
          onClick={() => setSortBy(option.value)}
          className={cn(
            "rounded-none hover:text-primary hover:bg-background dark:hover:bg-accent",
            option.value === sortBy
              ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
              : "bg-background dark:bg-accent text-foreground"
          )}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <div className="w-full h-fit">
      <div className="w-full max-w-[1400px] p-4 m-auto space-y-4 md:grid grid-cols-4 gap-4">
        {/* Left */}
        <div className="w-full h-fit space-y-6">
          {/* Danh mục sản phẩm */}
          <CategoriesSeclector className="w-full" />

          {/* Bộ lọc */}
          <div className="divide-y shadow-sm">
            <p className="text-xl font-bold flex items-center gap-2 p-4">
              <FunnelPlus size={20} />
              Bộ lọc
            </p>

            {/* Lọc theo khoảng giá tiền */}
            <div className="p-4 space-y-4">
              <p>Khoảng giá</p>

              <div className="w-full flex items-center gap-2">
                <Input
                  type="number"
                  min={1}
                  placeholder="₫ Từ"
                  className="ring-0! border-0! bg-accent rounded-none"
                />
                <div className="w-5 h-px bg-muted-foreground"></div>
                <Input
                  type="number"
                  min={1}
                  placeholder="₫ Đến"
                  className="ring-0! border-0! bg-accent rounded-none"
                />
              </div>

              <Button className="rounded-none w-full">Áp dụng</Button>
            </div>

            {/* Lọc theo đánh giá */}
            <div className="p-4 space-y-3">
              <p>Đánh giá</p>

              <div className="w-full space-y-2">
                <div className="flex gap-2 items-center">
                  <Stars rating={5} />
                  <p className="text-sm">(32)</p>
                </div>
                <div className="flex gap-2 items-center">
                  <Stars rating={4} />
                  <p className="text-sm">Trở lên(32)</p>
                </div>
                <div className="flex gap-2 items-center">
                  <Stars rating={3} />
                  <p className="text-sm">Trở lên(14)</p>
                </div>
                <div className="flex gap-2 items-center">
                  <Stars rating={2} />
                  <p className="text-sm">Trở lên(24)</p>
                </div>
                <div className="flex gap-2 items-center">
                  <Stars rating={1} />
                  <p className="text-sm">Trở lên(30)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Center */}
        <div className="w-full space-y-4 col-span-3">
          {/* Sắp xếp sản phẩm */}
          <SortProducts />

          {/* Danh sách sản phẩm */}
          <div className="w-full grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
            {productItemsSample.map((product, index) => (
              <div key={index}>
                <ProductCard product={product} />
              </div>
            ))}
            {productItemsSample.map((product, index) => (
              <div key={index}>
                <ProductCard product={product} />
              </div>
            ))}
            {productItemsSample.map((product, index) => (
              <div key={index}>
                <ProductCard product={product} />
              </div>
            ))}
            {productItemsSample.map((product, index) => (
              <div key={index}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
