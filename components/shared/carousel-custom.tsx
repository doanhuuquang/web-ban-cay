"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

const SIZE_MAP = {
  sm: 160,
  md: 240,
  lg: 320,
} as const;

type CarouselCustomContextProps = {
  itemSize: "sm" | "md" | "lg";
};

const CarouselCustomContext =
  React.createContext<CarouselCustomContextProps | null>(null);

function useCarouselCustom() {
  const context = React.useContext(CarouselCustomContext);

  if (!context) {
    throw new Error(
      "useCarouselCustom must be used within a <CarouselCustom />"
    );
  }

  return context;
}
function CategoryCustomItem({ children }: { children: React.ReactNode }) {
  const { itemSize } = useCarouselCustom();
  const itemWidth = SIZE_MAP[itemSize];

  return (
    <div className="group shrink-0" style={{ width: `${itemWidth}px` }}>
      {children}
    </div>
  );
}

function CarouselCustomContent({ children }: { children: React.ReactNode }) {
  const { itemSize } = useCarouselCustom();
  const itemWidth = SIZE_MAP[itemSize];

  const scrollSectionRef = React.useRef<HTMLDivElement>(null);
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);

  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  React.useEffect(() => {
    checkScroll();
    const carousel = carouselRef.current;
    if (!carousel) return;

    carousel.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      carousel.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scrollAmount = itemWidth + 16;

  const handlePrev = () => {
    carouselRef.current?.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  };

  const handleNext = () => {
    carouselRef.current?.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <div ref={scrollSectionRef} className="w-full relative group">
      {/* Prev */}
      <Button
        onClick={handlePrev}
        size="icon-lg"
        disabled={!canScrollLeft}
        className={cn(
          "p-5 bg-foreground text-background hover:text-foreground hover:bg-background border border-foreground hover:scale-110 hover:shadow-2xl transition-all absolute top-1/2 -translate-y-1/2 z-10 rounded-full group-hover:opacity-100 opacity-0",
          !canScrollLeft && "invisible",
          "lg:left-0 lg:-translate-x-1/2 left-4"
        )}
      >
        <ChevronLeft className="size-6" />
      </Button>

      {/* Next */}
      <Button
        onClick={handleNext}
        size="icon-lg"
        className={cn(
          "p-5 bg-foreground text-background hover:text-foreground hover:bg-background border border-foreground hover:scale-110 hover:shadow-2xl transition-all absolute top-1/2 -translate-y-1/2 z-10 rounded-full group-hover:opacity-100 opacity-0",
          !canScrollRight && "invisible",
          "lg:right-0 lg:translate-x-1/2 right-4"
        )}
      >
        <ChevronRight className="size-6" />
      </Button>

      {/* Content */}
      <div className="w-full overflow-hidden">
        <div
          ref={carouselRef}
          className="w-full flex gap-4 overflow-x-auto scroll-smooth pb-2 scrollbar-hide"
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function CarouselCustom({
  children,
  itemSize = "md",
}: {
  children: React.ReactNode;
  itemSize?: "sm" | "md" | "lg";
}) {
  return (
    <CarouselCustomContext.Provider value={{ itemSize: itemSize }}>
      <CarouselCustomContent>{children}</CarouselCustomContent>
    </CarouselCustomContext.Provider>
  );
}

export { CarouselCustom, CategoryCustomItem };
