"use client";

import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import React from "react";

const filterButtons = [
  { label: "Tất cả", value: "all" },
  { label: "Chờ xác nhận", value: "pending" },
  { label: "Vận chuyển", value: "shipping" },
  { label: "Chờ giao hàng", value: "delivering" },
  { label: "Hoàn thành", value: "completed" },
  { label: "Đã hủy", value: "canceled" },
  { label: "Trả hàng/Hoàn tiền", value: "returned" },
];

function FilterButtons() {
  const scrollSectionRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [currentFilter, setCurrentFilter] = React.useState("all");

  const checkScroll = () => {
    if (scrollSectionRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollSectionRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  React.useEffect(() => {
    checkScroll();
    const carousel = scrollSectionRef.current;
    if (!carousel) return;

    carousel.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      carousel.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scrollAmount = 100;

  const handlePrev = () => {
    scrollSectionRef.current?.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  };

  const handleNext = () => {
    scrollSectionRef.current?.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full bg-background dark:bg-accent/50 relative">
      {/* Prev button */}
      {canScrollLeft && (
        <Button
          className="h-full absolute top-0 left-0 rounded-none bg-background dark:bg-accent text-foreground hover:bg-background hover:text-foreground border-r"
          onClick={() => handlePrev()}
        >
          <ChevronLeft />
        </Button>
      )}

      {/* Next button */}
      {canScrollRight && (
        <Button
          className="h-full absolute top-0 right-0 rounded-none bg-background dark:bg-accent text-foreground hover:bg-background hover:text-foreground border-l"
          onClick={() => handleNext()}
        >
          <ChevronRight />
        </Button>
      )}

      <div
        ref={scrollSectionRef}
        className="w-full flex overflow-x-auto scrollbar-hide "
      >
        {filterButtons.map((button, index) => (
          <Button
            key={index}
            variant={"ghost"}
            className={cn(
              "rounded-none p-8 hover:text-primary hover:bg-background",
              currentFilter === button.value &&
                "border-b-3 border-primary text-primary"
            )}
            onClick={() => setCurrentFilter(button.value)}
          >
            {button.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <main className="h-full space-y-1">
      {/* Lọc đơn hàng */}
      <FilterButtons />

      {/* Tìm kiếm đơn hàng */}
      <InputGroup className="bg-background dark:bg-accent/50 py-8 rounded-none ring-0! border-0!">
        <InputGroupInput placeholder="Bạn có thể tìm kiếm theo ID đơn hàng hoặc Tên Sản phẩm" />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>

      <div className="w-full h-full bg-background dark:bg-accent/50 p-4">
        <p className="text-lg font-bold">Theo dõi đơn hàng</p>
      </div>
    </main>
  );
}
