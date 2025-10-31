import ProductCard from "@/components/shared/product-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

function Hero({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-full min-h-screen m-auto p-4 grid content-center relative ",
        className
      )}
    >
      {/* Background video */}
      <video
        src="/assets/webms/hero.webm"
        autoPlay
        loop
        muted
        className="w-full h-full absolute top-0 left-0 object-cover object-center z-1"
      ></video>

      {/* Overlay */}
      <div className="w-full h-full absolute top-0 left-0 bg-black/50 z-1"></div>

      {/* Content */}
      <div className="w-full max-w-7xl m-auto space-y-7 z-2 flex flex-col items-center text-white">
        {/* Title */}{" "}
        <p className="w-full max-w-2xl text-5xl uppercase font-black tracking-tight leading-18 text-center">
          Nâng cấp không gian sống với một chút
          <span className="text-primary"> xanh</span>
        </p>
        {/* Subtitle */}
        <p className="text-white/70 max-w-lg text-center">
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
}

function MostPopularProducts({ className }: { className?: string }) {
  return (
    <div className={cn("w-full", className)}>
      <div className="w-full max-w-[1400px] m-auto p-4 space-y-5">
        {/* Head */}
        <p className="font-semibold text-xl uppercase pl-4 border-l-5 border-l-primary">
          Sản phẩm được nhiều người yêu thích
        </p>

        {/* Bento grid products */}
        <div className="grid lg:grid-cols-3 gap-4">
          <ProductCard
            imageSrcs={[
              "/assets/images/products/product-1.jpg",
              "/assets/images/products/product-2.jpg",
            ]}
            productName="Cây Cúc La Mã"
            productDescription="Cây thân thảo nhỏ nhắn, mang hương thơm dịu nhẹ, giúp thư giãn và làm đẹp không gian sống."
            price={89000}
            discountPercentage={10}
            rating={4.8}
          />

          <div className="grid grid-rows-2 gap-4">
            <ProductCard
              imageSrcs={[
                "/assets/images/products/product-2.jpg",
                "/assets/images/products/product-3.jpg",
              ]}
              productName="Cây Trầu Bà Cẩm Thạch"
              productDescription="Cây leo dễ chăm, thích hợp để bàn hoặc treo, giúp thanh lọc không khí hiệu quả."
              price={129000}
              discountPercentage={15}
              rating={4.6}
              className="lg:aspect-auto aspect-3/4"
            />

            <ProductCard
              imageSrcs={[
                "/assets/images/products/product-3.jpg",
                "/assets/images/products/product-4.jpg",
              ]}
              productName="Cây Lan Ý"
              productDescription="Cây mang vẻ đẹp thanh khiết, có khả năng hấp thụ khí độc và giúp giấc ngủ sâu hơn."
              price={159000}
              discountPercentage={20}
              rating={4.9}
              className="lg:aspect-auto aspect-3/4"
            />
          </div>

          <ProductCard
            imageSrcs={[
              "/assets/images/products/product-4.jpg",
              "/assets/images/products/product-1.jpg",
            ]}
            productName="Cây Lưỡi Hổ"
            productDescription="Loài cây phong thủy giúp xua đuổi tà khí, mang lại may mắn và tài lộc cho gia chủ."
            price={99000}
            discountPercentage={5}
            rating={4.7}
          />
        </div>

        <div className="w-full flex justify-center p-4">
          <Link href={"/"} className="w-fit underline underline-offset-3">
            Xem thêm
          </Link>
        </div>
      </div>
    </div>
  );
}

function CategoriesSection({ className }: { className?: string }) {
  type carouselItemProps = {
    title: string;
    subtitle: string;
    imageSrc: string;
    href: string;
  };

  const carouselItems: carouselItemProps[] = [
    {
      title: "Cây giống",
      subtitle: "Khởi đầu cho khu vườn của bạn",
      imageSrc: "/assets/images/categories/seedling.png",
      href: "/",
    },
    {
      title: "Cây nội thất",
      subtitle: "Mang thiên nhiên vào không gian sống",
      imageSrc: "/assets/images/categories/indoor-plants.png",
      href: "/",
    },
    {
      title: "Cây văn phòng",
      subtitle: "Giúp làm việc tập trung và thư giãn",
      imageSrc: "/assets/images/categories/office-tree.png",
      href: "/",
    },
    {
      title: "Chậu trồng cây",
      subtitle: "Đa dạng kích thước và kiểu dáng",
      imageSrc: "/assets/images/categories/plant-pots.png",
      href: "/",
    },
    {
      title: "Dụng cụ làm vườn",
      subtitle: "Phụ kiện cần thiết cho mọi người làm vườn",
      imageSrc: "/assets/images/categories/garden-tools.png",
      href: "/",
    },
    {
      title: "Phân bón & đất trồng",
      subtitle: "Giúp cây phát triển khỏe mạnh",
      imageSrc: "/assets/images/categories/fertilizer-&-soil.png",
      href: "/",
    },
    {
      title: "Rau gia vị",
      subtitle: "Tươi ngon, dễ trồng cho mọi căn bếp",
      imageSrc: "/assets/images/categories/spiced-vegetables.png",
      href: "/",
    },
  ];

  return (
    <div className={cn("w-full bg-background", className)}>
      <div className="w-full max-w-[1400px] m-auto p-4 space-y-5">
        {/* Head */}
        <p className="font-semibold text-xl uppercase pl-4 border-l-5 border-l-primary">
          Danh mục hiện có
        </p>

        <Carousel>
          <CarouselContent>
            {carouselItems.map((item, index) => (
              <CarouselItem key={index} className="lg:basis-1/3 p-1 group">
                <Link href={item.href}>
                  <div
                    className={cn(
                      "w-full aspect-3/4 rounded-xl relative overflow-hidden"
                    )}
                  >
                    <Image
                      src={item.imageSrc}
                      alt="kjsdv"
                      fill
                      className="absolute top-0 left-0 z-0 object-cover object-center"
                    />
                    <div className="w-full h-full p-4 absolute z-1 space-y-2">
                      <p className="text-black font-semibold text-xl">
                        {item.title}
                      </p>
                      <p className="text-black text-sm">{item.subtitle}</p>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            variant={"default"}
            className="z-2 bg-white hover:bg-white text-black"
          />
          <CarouselNext
            variant={"default"}
            className="z-2 bg-white hover:bg-white text-black"
          />
        </Carousel>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="space-y-10">
      <Hero />

      {/* Gợi ý sản phẩm được yêu thích nhiều nhất*/}
      <MostPopularProducts className="mt-10" />

      {/*  */}
      <div
        className={cn(
          "w-full min-h-screen m-auto p-4 grid content-center relative "
        )}
      >
        {/* Background video */}
        <Image
          src="/assets/images/bedroom-with-plants.png"
          alt="Room with plants"
          fill
          quality={100}
          className="w-full h-full absolute top-0 left-0 object-cover object-center z-1"
        ></Image>

        {/* Overlay */}
        <div className="w-full h-full absolute top-0 left-0 bg-black/50 z-1"></div>

        {/* Content */}
        <div className="w-full max-w-7xl m-auto space-y-7 z-2 flex flex-col items-center text-white">
          <p className="w-full max-w-2xl text-5xl uppercase font-black tracking-tight leading-18 text-center">
            Sống giữa vẻ đẹp
            <span className="text-primary"> tự nhiên</span> theo cách riêng của
            bạn.
          </p>
        </div>
      </div>

      {/* Danh mục */}
      <CategoriesSection className="mt-10" />
    </main>
  );
}
