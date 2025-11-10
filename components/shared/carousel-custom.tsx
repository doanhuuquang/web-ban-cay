"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

function CategoryCustomItem({ children }: { children: React.ReactNode }) {
  return <div className="w-60 group shrink-0">{children}</div>;
}

function CarouselCustom({ children }: { children: React.ReactNode }) {
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
    if (carousel) {
      carousel.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);

      return () => {
        carousel.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, []);

  const handlePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -256,
        behavior: "smooth",
      });
    }
  };

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 256,
        behavior: "smooth",
      });
    }
  };
  return (
    <div ref={scrollSectionRef} className="w-full relative group">
      {/* Prev */}
      <Button
        onClick={handlePrev}
        size={"icon-lg"}
        disabled={!canScrollLeft}
        className={cn(
          "p-6 bg-foreground text-background hover:text-foreground hover:bg-background hover:scale-120 hover:shadow-2xl transition-all absolute top-1/2 -translate-y-1/2 z-10 rounded-full group-hover:opacity-100 opacity-0",
          !canScrollLeft && "invisible",
          "lg:left-0 lg:-translate-x-1/2 translate-x-0 left-4"
        )}
      >
        <ChevronLeft className="size-7" />
      </Button>

      {/* Next */}
      <Button
        onClick={handleNext}
        size={"icon-lg"}
        className={cn(
          "p-6 bg-foreground text-background hover:text-foreground hover:bg-background hover:scale-120 hover:shadow-2xl transition-all absolute top-1/2 -translate-y-1/2 z-10 rounded-full group-hover:opacity-100 opacity-0",
          !canScrollRight && "invisible",
          "lg:right-0 lg:translate-x-1/2 translate-x-0 right-4"
        )}
      >
        <ChevronRight className="size-7" />
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

export { CarouselCustom, CategoryCustomItem };
