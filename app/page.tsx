import ProductCard from "@/components/shared/product-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

const Hero = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "w-full min-h-[calc(100vh-68px)] m-auto p-4 grid content-center relative ",
        className
      )}
    >
      {/* Background video */}
      <video
        src="/assets/videos/hero.mp4"
        autoPlay
        loop
        muted
        className="w-full h-full absolute top-0 left-0 object-cover object-center z-1 brightness-50"
      ></video>

      {/* Content */}
      <div className="w-full max-w-7xl m-auto space-y-7 z-2 flex flex-col items-center text-white">
        {/* Title */}{" "}
        <p className="w-full max-w-2xl text-5xl uppercase font-black tracking-tight leading-15 text-center">
          Nâng cấp không gian sống với một chút
          <span className="text-primary"> xanh</span>
        </p>
        {/* Subtitle */}
        <p className="text-white/70 max-w-2xl text-center">
          Mỗi chiếc lá là một hơi thở trong lành, mỗi chậu cây là một niềm vui
          nhỏ giữa bộn bề cuộc sống.
        </p>
        <div className="flex items-center gap-6">
          <Button>Khám phá ngay</Button>
          <div className="flex items-center gap-2">
            <Button
              size={"icon"}
              className="rounded-full bg-white hover:bg-white"
            >
              <ArrowUpRight className="text-black" />
            </Button>
            <p className="text-sm text-white/70">Bí kíp chăm cây</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <main>
      <Hero />

      <div className="w-full bg-background">
        <div className="w-full max-w-7xl m-auto p-4 space-y-5">
          {/* Head */}
          <p className="font-semibold text-xl uppercase pl-4 border-l-5 border-l-primary">
            Sản phẩm được nhiều người yêu thích
          </p>

          {/* Product cards */}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-3">
            <ProductCard
              imageSrc="/assets/images/product-1.jpg"
              productName="Cúc La Mã"
              productDescription="Hoa cúc vàng rực rỡ Hoa cúc vàng rực rỡ Hoa cúc vàng rực rỡ"
              price={10000}
              discountPercentage={10}
            />

            <ProductCard
              imageSrc="/assets/images/plants.png"
              productName="ksdc"
              productDescription="sldknc"
              price={10}
              discountPercentage={10}
            />

            <ProductCard
              imageSrc="/assets/images/product-1.jpg"
              productName="ksdc"
              productDescription="sldknc"
              price={10}
              discountPercentage={10}
            />

            <ProductCard
              imageSrc="/assets/images/plants.png"
              productName="ksdc"
              productDescription="sldknc"
              price={10}
              discountPercentage={10}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
