"use client";

import { useAppHeader } from "@/components/shared/app-header";
import ProductCard from "@/components/shared/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { formatMoney } from "@/lib/helpers/format-money";
import type { Category } from "@/lib/models/category";
import type { Product } from "@/lib/models/product";
import { getCategories } from "@/lib/services/category-service";
import { getProductsByCategoryName } from "@/lib/services/product-service";
import { cn } from "@/lib/utils";
import {
  ArrowDownNarrowWide,
  ArrowDownWideNarrow,
  ChevronRight,
  FunnelPlus,
  PackagePlus,
  Settings2,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react";
import React from "react";

function CategoriesSeclector({
  isLoadingCategories,
  categories,
  currentCategory,
  setCurrentCategory,
  className,
}: {
  isLoadingCategories: boolean;
  categories: Category[];
  currentCategory: string;
  setCurrentCategory: (categoryName: string) => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full bg-background dark:bg-accent/50 border divide-y",
        className
      )}
    >
      {isLoadingCategories
        ? Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="w-full h-15 rounded-none" />
          ))
        : categories.map((item, index) => (
            <div
              key={index}
              onClick={() => setCurrentCategory(item.categoryName)}
              className={cn(
                "hover:text-primary cursor-pointer flex items-center justify-between px-4 py-3",
                currentCategory === item.categoryName &&
                  "bg-primary text-primary-foreground hover:text-primary-foreground"
              )}
            >
              {item.categoryName}
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

function SortProducts({
  currentSort,
  setCurrentSort,
}: {
  currentSort: string;
  setCurrentSort: (filter: string) => void;
}) {
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

  return (
    <div className="w-full flex items-center gap-4 overflow-x-scroll scrollbar-hide">
      <p className="text-muted-foreground shrink-0">Sắp xếp theo</p>

      {filterButtons.map((button) => (
        <Button
          key={button.value}
          variant={"outline"}
          onClick={() => setCurrentSort(button.value)}
          className={cn(
            "hover:bg-muted/70 text-foreground rounded-full",
            currentSort === button.value && "border-2 border-primary"
          )}
        >
          {button.icon}
          <span>{button.title}</span>
        </Button>
      ))}
    </div>
  );
}

export default function ProductsPage() {
  const { isShowAppHeader } = useAppHeader();

  const [isLoadingProducts, setIsLoadingProducts] =
    React.useState<boolean>(true);
  const [productsByCategory, setProductsByCategory] = React.useState<Product[]>(
    []
  );
  const [isLoadingCategories, setIsLoadingCategories] =
    React.useState<boolean>(true);
  const [currentCategory, setCurrentCategory] = React.useState<string>("");
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [currentSort, setCurrentSort] = React.useState<string>("all");
  const [sortProducts, setSortProducts] = React.useState<Product[]>([]);

  const [minPrice, setMinPrice] = React.useState<string>("");
  const [maxPrice, setMaxPrice] = React.useState<string>("");
  const [appliedMinPrice, setAppliedMinPrice] = React.useState<number>(0);
  const [appliedMaxPrice, setAppliedMaxPrice] = React.useState<number>(
    Number.POSITIVE_INFINITY
  );

  const [selectedRating, setSelectedRating] = React.useState<number | null>(
    null
  );

  const [filteredProducts, setFilteredProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    try {
      const fetchCategories = async () => {
        const response = await getCategories();

        if (response.categories) setCategories(response.categories);
      };

      fetchCategories();
    } finally {
      setIsLoadingCategories(false);
    }
  }, []);

  React.useEffect(() => {
    setCurrentCategory(categories[0]?.categoryName || "");
  }, [categories]);

  React.useEffect(() => {
    setProductsByCategory([]);

    try {
      setIsLoadingProducts(true);

      const fetchProductsByCategory = async () => {
        const response = await getProductsByCategoryName({
          categoryName: currentCategory,
        });

        if (response.products) setProductsByCategory(response.products);
      };

      fetchProductsByCategory();
    } finally {
      setIsLoadingProducts(false);
    }
  }, [currentCategory]);

  React.useEffect(() => {
    switch (currentSort) {
      case "all":
        setSortProducts(productsByCategory);
        break;
      case "popular":
        setSortProducts(
          [...productsByCategory].sort((a, b) => b.soldCount - a.soldCount)
        );
        break;
      case "newest":
        setSortProducts(
          [...productsByCategory].sort(
            (a, b) =>
              new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
          )
        );
        break;
      case "best-selling":
        setSortProducts(
          [...productsByCategory].sort((a, b) => b.soldCount - a.soldCount)
        );
        break;
      case "price-low-to-high":
        setSortProducts(
          [...productsByCategory].sort(
            (a, b) => a.getDiscountedPrice() - b.getDiscountedPrice()
          )
        );
        break;
      case "price-high-to-low":
        setSortProducts(
          [...productsByCategory].sort(
            (a, b) => b.getDiscountedPrice() - a.getDiscountedPrice()
          )
        );
        break;
      default:
        setSortProducts(productsByCategory);
        break;
    }
  }, [productsByCategory, currentSort]);

  React.useEffect(() => {
    let filtered = [...sortProducts];

    // Filter by price range
    filtered = filtered.filter((product) => {
      const price = product.getDiscountedPrice();
      return price >= appliedMinPrice && price <= appliedMaxPrice;
    });

    // Filter by rating
    if (selectedRating !== null) {
      filtered = filtered.filter(
        (product) => Math.round(product.avgRating) >= selectedRating
      );
    }

    setFilteredProducts(filtered);
  }, [sortProducts, appliedMinPrice, appliedMaxPrice, selectedRating]);

  const getRatingCount = (rating: number): number => {
    return sortProducts.filter(
      (product) => Math.round(product.avgRating) >= rating
    ).length;
  };

  const handleApplyPriceFilter = () => {
    const min = minPrice ? Number.parseFloat(minPrice) : 0;
    const max = maxPrice
      ? Number.parseFloat(maxPrice)
      : Number.POSITIVE_INFINITY;

    if (min > max && max !== Number.POSITIVE_INFINITY) {
      return;
    }

    setAppliedMinPrice(min);
    setAppliedMaxPrice(max);
  };

  const handleRatingFilter = (rating: number) => {
    if (selectedRating === rating) {
      setSelectedRating(null); // Unselect if clicking the same rating
    } else {
      setSelectedRating(rating);
    }
  };

  const handleClearFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setAppliedMinPrice(0);
    setAppliedMaxPrice(Number.POSITIVE_INFINITY);
    setSelectedRating(null);
  };

  return (
    <div className="w-full h-fit">
      <div className="w-full max-w-[1400px] p-4 m-auto space-y-4 md:grid grid-cols-4 gap-4 max-md:space-y-10">
        {/* Left */}
        <div
          className={cn(
            "w-full h-fit space-y-6 md:sticky transition-all",
            isShowAppHeader ? "top-30" : "top-4"
          )}
        >
          {/* Danh mục sản phẩm */}
          <CategoriesSeclector
            categories={categories}
            currentCategory={currentCategory}
            isLoadingCategories={isLoadingCategories}
            setCurrentCategory={setCurrentCategory}
            className="w-full"
          />

          {/* Bộ lọc */}
          <div className="divide-y border">
            <div className="p-4 flex items-center justify-between">
              <p className="text-xl font-bold flex items-center gap-2">
                <FunnelPlus size={20} />
                Bộ lọc
              </p>
              {(appliedMinPrice > 0 ||
                appliedMaxPrice !== Number.POSITIVE_INFINITY ||
                selectedRating !== null) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearFilters}
                  className="text-xs"
                >
                  Xóa bộ lọc
                </Button>
              )}
            </div>

            {/* Lọc theo khoảng giá tiền */}
            <div className="p-4 space-y-4">
              <p>Khoảng giá</p>

              <div className="w-full flex items-center gap-2">
                <Input
                  type="number"
                  min={0}
                  placeholder="₫ Từ"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="ring-0! border-0! bg-accent rounded-none"
                />
                <div className="w-5 h-px bg-muted-foreground"></div>
                <Input
                  type="number"
                  min={0}
                  placeholder="₫ Đến"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="ring-0! border-0! bg-accent rounded-none"
                />
              </div>

              <Button
                className="rounded-none w-full"
                onClick={handleApplyPriceFilter}
              >
                Áp dụng
              </Button>
            </div>

            {/* Lọc theo đánh giá */}
            <div className="p-4 space-y-3">
              <p>Đánh giá</p>

              <div className="w-full space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = getRatingCount(rating);
                  return (
                    <div
                      key={rating}
                      onClick={() => handleRatingFilter(rating)}
                      className={cn(
                        "flex gap-2 items-center cursor-pointer hover:bg-accent p-2 transition-colors",
                        selectedRating === rating && "bg-yellow-500/10"
                      )}
                    >
                      <Stars rating={rating} />
                      <p className="text-sm">
                        {rating === 5 ? `(${count})` : `Trở lên (${count})`}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Center */}
        <div className="w-full space-y-4 col-span-3">
          {/* Sắp xếp sản phẩm */}
          <SortProducts
            currentSort={currentSort}
            setCurrentSort={setCurrentSort}
          />

          {(appliedMinPrice > 0 ||
            appliedMaxPrice !== Number.POSITIVE_INFINITY ||
            selectedRating !== null) && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <p>Đang lọc:</p>
              {appliedMinPrice > 0 && (
                <span className="bg-muted px-2 py-1">
                  Từ {formatMoney(appliedMinPrice)}
                </span>
              )}
              {appliedMaxPrice !== Number.POSITIVE_INFINITY && (
                <span className="bg-muted px-2 py-1">
                  Đến {formatMoney(appliedMaxPrice)}
                </span>
              )}
              {selectedRating !== null && (
                <span className="bg-muted px-2 py-1 flex items-center gap-1">
                  <Star size={14} className="fill-amber-500 text-amber-500" />
                  {selectedRating}+ sao
                </span>
              )}
            </div>
          )}

          {/* Danh sách sản phẩm */}
          <div className="w-full grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 mt-5">
            {isLoadingProducts ? (
              Array.from({ length: 8 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="w-full aspect-3/4 rounded-none"
                />
              ))
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <div key={index}>
                  <ProductCard product={product} />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20 text-muted-foreground">
                <p className="text-lg">Không tìm thấy sản phẩm nào</p>
                <p className="text-sm mt-2">
                  Vui lòng thử điều chỉnh bộ lọc của bạn
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
