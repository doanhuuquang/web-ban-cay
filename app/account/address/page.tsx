"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, SquarePen } from "lucide-react";
import React from "react";

const address = [
  "75 Nguyễn Thị Minh Khai, Phường 6, Quận 3, TP.HCM",
  "123 Lê Lợi, Phường Bến Thành, Quận 1, TP.HCM",
  "456 Trần Hưng Đạo, Phường Cầu Ông Lãnh, Quận 1, TP.HCM",
  "789 Phan Xích Long, Phường 2, Quận Phú Nhuận, TP.HCM",
];

function AddressList() {
  const scrollSectionRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [currentAddress, setCurrentAddress] = React.useState(
    "75 Nguyễn Thị Minh Khai, Phường 6, Quận 3, TP.HCM"
  );

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

  const scrollAmount = 300;

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
        {address.map((address, index) => (
          <Button
            key={index}
            variant={"ghost"}
            className={cn(
              "rounded-none p-8 hover:text-primary hover:bg-background",
              currentAddress === address &&
                "border-b-3 border-primary text-primary"
            )}
            onClick={() => setCurrentAddress(address)}
          >
            {currentAddress}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <main className="space-y-1">
      {/* Danh sách thông tin giao hàng */}
      <AddressList />

      {/* Địa chỉ giao hàng */}
      <div className="w-full h-full p-4 bg-background dark:bg-accent/50">
        {/* Title */}
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold">Địa chỉ giao hàng</p>

          <div className="flex items-center gap-2 text-sm text-primary">
            <p>Cập nhật</p>
            <SquarePen size={15} />
          </div>
        </div>

        <Button variant="link" className="p-0 text-sm">
          Đặt làm mặc định
        </Button>

        <div className="w-full grid md:grid-cols-2 grid-cols-1 md:gap-x-10 md:divide-y-0 divide-y divide-accent/50">
          <div className="divide-y divide-accent/50">
            <div className="w-full flex items-center justify-between gap-4 py-4">
              <p className="text-muted-foreground">Tỉnh/Thành phố</p>
              <p>Hà Nội</p>
            </div>

            <div className="w-full flex items-center justify-between gap-4 py-4">
              <p className="text-muted-foreground">Quận/Huyện</p>
              <p>Gia Lâm</p>
            </div>
          </div>

          <div className="divide-y divide-accent/50">
            <div className="w-full flex items-center justify-between gap-4 py-4">
              <p className="text-muted-foreground">Phường/Xã</p>
              <p>TT.Trâu Quỳ</p>
            </div>

            <div className="w-full flex items-center justify-between gap-4 py-4">
              <p className="text-muted-foreground">Số Nhà</p>
              <p>75 Cửu Việt 2</p>
            </div>
          </div>
        </div>
      </div>

      {/* Thông tin người nhận */}
      <div className="w-full h-full p-4 bg-background dark:bg-accent/50">
        {/* Title */}
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold">Thông tin người nhận</p>

          <div className="flex items-center gap-2 text-sm text-primary">
            <p>Cập nhật</p>
            <SquarePen size={15} />
          </div>
        </div>

        <div className="w-full grid md:grid-cols-2 grid-cols-1 md:gap-x-10 md:divide-y-0 divide-y divide-accent/50">
          <div className="divide-y divide-accent/50">
            <div className="w-full flex items-center justify-between gap-4 py-4">
              <p className="text-muted-foreground">Tên người nhận</p>
              <p>Nguyễn Thị Thanh Hương</p>
            </div>
          </div>

          <div className="divide-y divide-accent/50">
            <div className="w-full flex items-center justify-between gap-4 py-4">
              <p className="text-muted-foreground">Số điện thoại</p>
              <p>0123456789</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
