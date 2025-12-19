"use client";

import ProductCard from "@/components/shared/product-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Product } from "@/lib/models/product";
import { getProducts } from "@/lib/services/product-service";
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

export default function SearchFoundProducts({ keyword }: { keyword: string }) {
  const [currentFilter, setCurrentFilter] = React.useState<string>("all");
  const [isLoadingProducts, setIsLoadingProducts] =
    React.useState<boolean>(true);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    try {
      const fetchProducts = async () => {
        const response = await getProducts();

        if (response.products.length < 0) return;

        const searchedProducts: Product[] = [];

        response.products.map((product) => {
          if (
            product.productName
              .toLowerCase()
              .trim()
              .includes(keyword.toLowerCase().trim())
          ) {
            searchedProducts.push(product);
          }
        });

        setProducts(searchedProducts);
      };

      fetchProducts();
    } finally {
      setIsLoadingProducts(false);
    }
  }, [keyword]);

  React.useEffect(() => {
    switch (currentFilter) {
      case "all":
        setFilteredProducts(products);
        break;
      case "popular":
        setFilteredProducts(
          [...products].sort((a, b) => b.soldCount - a.soldCount)
        );
        break;
      case "newest":
        setFilteredProducts(
          [...products].sort(
            (a, b) =>
              new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
          )
        );
        break;
      case "best-selling":
        setFilteredProducts(
          [...products].sort((a, b) => b.soldCount - a.soldCount)
        );
        break;
      case "price-low-to-high":
        setFilteredProducts(
          [...products].sort(
            (a, b) => a.getDiscountedPrice() - b.getDiscountedPrice()
          )
        );
        break;
      case "price-high-to-low":
        setFilteredProducts(
          [...products].sort(
            (a, b) => b.getDiscountedPrice() - a.getDiscountedPrice()
          )
        );
        break;
      default:
        setFilteredProducts(products);
        break;
    }
  }, [products, currentFilter]);

  return (
    <div className="space-y-10">
      {products.length === 0 ? (
        <div className="w-full pt-5 space-y-1">
          <p className="text-2xl">
            Không có kết quả tìm kiếm cho từ khóa
            <span className="font-bold"> &quot;{keyword}&quot;</span>
          </p>
          <p className="text-muted-foreground text-sm">
            Hãy thử lại bằng cách viết khác hoặc sử dụng từ khóa khác.
          </p>
        </div>
      ) : (
        <div className="w-full pt-5 space-y-1">
          <p className="text-2xl">
            <span className="font-bold">{products.length}</span> sản phẩm cho từ
            khóa
            <span> &quot;{keyword}&quot;</span>
          </p>
        </div>
      )}

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
        {isLoadingProducts
          ? Array.from({ length: 8 }).map((_, index) => (
              <Skeleton
                key={index}
                className="w-full aspect-3/4 rounded-none"
              ></Skeleton>
            ))
          : filteredProducts.map((product) => (
              <ProductCard key={product.productId} product={product} />
            ))}
      </div>
    </div>
  );
}
