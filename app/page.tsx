"use client";

import ProductCard from "@/components/shared/product-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react";
import Link from "next/link";

import Image from "next/image";

import { categoryItems } from "@/lib/constants/category-items";
import {
  CarouselCustom,
  CategoryCustomItem,
} from "@/components/shared/carousel-custom";
import React from "react";
import { gplantOfferItems } from "@/lib/constants/gplant-offers";
import { productItemsSample } from "@/lib/constants/product-items";
import { whatsTrendingItems } from "@/lib/constants/whats-trending-items";
import { tipsAndIdeasItems } from "@/lib/constants/tips-and-ideas-items";
import { Input } from "@/components/ui/input";

function CategoriesSection() {
  return (
    <div className="w-full max-w-[1400px] m-auto p-4">
      <CarouselCustom itemSize={"sm"}>
        {categoryItems.map((item, index) => (
          <div key={index}>
            <CategoryCustomItem>
              <Link href={item.href}>
                <div
                  className={cn(
                    "w-full aspect-square rounded-xs relative overflow-hidden bg-muted"
                  )}
                >
                  {/* <Image
                    src={item.imageSrc}
                    alt="kjsdv"
                    fill
                    className="absolute top-0 left-0 z-0 object-cover object-center"
                  /> */}
                  <div className="w-full h-fit p-2 absolute bottom-0 z-1 text-center">
                    <p className="hover:underline text-sm h-10">{item.title}</p>
                  </div>
                </div>
              </Link>
            </CategoryCustomItem>
          </div>
        ))}
      </CarouselCustom>
    </div>
  );
}

function WelcomeSection() {
  return (
    <div className="w-full max-w-[1400px] m-auto p-4 space-y-10">
      <h1 className="lg:text-3xl text-2xl font-black uppercase">
        Chào mừng đến với GPLANT
      </h1>

      <div className="w-full md:min-h-screen min-h-auto grid md:grid-cols-2 grid-cols-1 md:grid-rows-1 grid-rows-none gap-4">
        <Link
          href={""}
          className="w-full md:h-full h-auto md:aspect-auto aspect-square relative"
        >
          <video
            src="/assets/webms/hero.webm"
            autoPlay
            loop
            muted
            className="w-full h-full absolute top-0 left-0 object-cover object-center z-0"
          ></video>

          <div className="w-full h-full absolute p-4 grid content-end gap-2 bg-linear-to-t from-black/50 to-transparent text-white font-bold group z-1">
            <div className="w-fit bg-blue-ocean px-2 py-1 md:text-sm text-xs text-white">
              GPANT mua nhiều giảm sâu
            </div>
            <p className="group-hover:underline md:text-xl">
              Giảm 15% giá trị đơn hàng đầu tiên
            </p>
            <ArrowRight className="md:block hidden" />
          </div>
        </Link>
        <div className="grid md:grid-rows-2 grid-rows-1 md:grid-cols-1 grid-cols-2 gap-4">
          <Link
            href={""}
            className="w-full md:h-full h-auto md:aspect-auto aspect-square relative"
          >
            <Image
              src={"/assets/images/decorations/lotus.jpg"}
              alt="Orange flower"
              fill
              className="absolute top-0 left-0 object-cover object-center z-0"
            />

            <div className="w-full h-full absolute z-1 p-4 grid content-end gap-2 bg-linear-to-t from-black/50 to-transparent text-white font-bold group">
              <div className="w-fit bg-orange-600 px-2 py-1 md:text-sm text-xs text-white">
                Mới
              </div>
              <p className="group-hover:underline md:text-xl">
                Thêm điểm nhấn, thêm sắc màu
              </p>
              <ArrowRight className="md:block hidden" />
            </div>
          </Link>

          <Link
            href={""}
            className="w-full md:h-full h-auto md:aspect-auto aspect-square relative"
          >
            <Image
              src={"/assets/images/decorations/livingroom-with-plants.jpg"}
              alt="Bedroom with plants"
              fill
              className="absolute top-0 left-0 object-cover object-center z-0"
            />

            <div className="w-full h-full absolute z-1 p-4 grid content-end gap-2 bg-linear-to-t from-black/50 to-transparent text-white font-bold group">
              <p className="group-hover:underline md:text-xl">
                Cây xanh cho không gian sống
              </p>
              <ArrowRight className="md:block hidden" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

function GplantOffersSection() {
  return (
    <div className="w-full h-fit bg-muted">
      <div className="w-full max-w-[1400px] m-auto px-4 py-10 space-y-5">
        <h1 className="font-bold text-2xl">
          Khám phá các ưu đãi của GPLANT Family
        </h1>

        <CarouselCustom>
          <CategoryCustomItem>
            <Link href={""}>
              <div className="w-full aspect-square overflow-hidden bg-blue-ocean text-cyan-50 p-5 hover:underline flex flex-col justify-between">
                <p className="font-bold text-xl">
                  Toàn bộ ưu đãi và tích điểm thưởng
                </p>

                <Button
                  variant={"outline"}
                  size={"icon-lg"}
                  className="bg-transparent rounded-full p-6"
                >
                  <ArrowRight className="size-6" />
                </Button>
              </div>
            </Link>
          </CategoryCustomItem>

          {gplantOfferItems.map((item, index) => (
            <div key={index}>
              <CategoryCustomItem>
                <Link href={item.href}>
                  <div
                    className={cn(
                      "w-full aspect-square rounded-xs relative overflow-hidden border"
                    )}
                  >
                    <Image
                      src={item.imageSrc}
                      alt={item.title}
                      fill
                      className="absolute top-0 left-0 z-0 object-cover object-center"
                    />
                  </div>
                  <div className="w-full h-fit flex justify-between items-start gap-2 mt-4">
                    <p className="hover:underline">{item.title}</p>
                    <ArrowUpRight />
                  </div>
                </Link>
              </CategoryCustomItem>
            </div>
          ))}
        </CarouselCustom>
      </div>
    </div>
  );
}

function ToDayBestDealsSection() {
  const buttons = [
    "Sản phẩm có giá mới thấp hơn",
    "Deals hời chớp nhoáng",
    "Dọn kho",
    "Giá rẻ nhất",
  ];
  const [selectedButtonIndex, setSelectedButtonIndex] = React.useState(0);

  return (
    <div className="w-full h-fit">
      <div className="w-full h-full max-w-[1400px] m-auto p-4 space-y-5">
        <h1 className="font-bold text-2xl">Ưu đãi tốt nhất hôm nay</h1>

        <div className="flex gap-4 overflow-x-scroll scrollbar-hide">
          {buttons.map((button, index) => (
            <Button
              key={index}
              variant={"secondary"}
              className={cn(
                "rounded-full font-semibold p-5",
                index === selectedButtonIndex && "border border-foreground"
              )}
              onClick={() => setSelectedButtonIndex(index)}
            >
              {button}
            </Button>
          ))}
        </div>

        <div className="lg:grid lg:grid-cols-4 gap-4 max-md:space-y-5">
          <div className="col-span-3">
            <CarouselCustom itemSize={"lg"}>
              {productItemsSample.map((product, index) => (
                <div key={index}>
                  <CategoryCustomItem>
                    <ProductCard product={product} />
                  </CategoryCustomItem>
                </div>
              ))}
            </CarouselCustom>
          </div>

          <Link
            href={""}
            className="lg:hidden flex items-center justify-between border-b pb-4"
          >
            <p className="font-bold">Xem tất cả ưu đãi</p>
            <ChevronRight />
          </Link>

          <div className="w-full h-full bg-red-700 flex flex-col">
            <div className="w-full h-auto aspect-square relative">
              <Image
                src={"/assets/images/decorations/flower-on-red-table.svg"}
                alt="Giá mới thấp hơn"
                fill
                className="absolute top-0 left-0 object-center object-cover"
              />
            </div>
            <div className="w-full grow p-8 text-red-50 flex flex-col justify-between gap-4">
              <div className="space-y-2">
                <p className="font-bold text-2xl">Giá mới thấp hơn</p>
                <p className="text-sm">
                  Chúng tôi đã giảm giá một số sản phẩm yêu thích của mình để
                  chúng trở nên phải chăng hơn. Đây không phải là chương trình
                  giảm giá, mà là trạng thái bình thường mới.
                </p>
              </div>
              <Button
                variant={"outline"}
                size={"icon-lg"}
                className="bg-transparent rounded-full p-6"
              >
                <ArrowRight className="size-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WhatsTrendingSection() {
  return (
    <div className="w-full h-fit bg-muted">
      <div className="w-full max-w-[1400px] m-auto px-4 py-10 space-y-5">
        <h1 className="font-bold text-2xl">Xu hướng</h1>

        <CarouselCustom>
          {whatsTrendingItems.map((item, index) => (
            <div key={index}>
              <CategoryCustomItem>
                <Link href={item.href}>
                  <div
                    className={cn(
                      "w-full aspect-square rounded-xs relative overflow-hidden border"
                    )}
                  >
                    <Image
                      src={item.imageSrc}
                      alt={item.title}
                      fill
                      className="absolute top-0 left-0 z-0 object-cover object-center"
                    />
                  </div>
                  <div className="w-full h-fit flex justify-between items-start gap-2 mt-4">
                    <p className="hover:underline">{item.title}</p>
                    <ArrowUpRight />
                  </div>
                </Link>
              </CategoryCustomItem>
            </div>
          ))}
        </CarouselCustom>
      </div>
    </div>
  );
}

function DiscoverWhatsNewSection() {
  return (
    <div className="w-full h-fit">
      <div className="w-full h-full max-w-[1400px] m-auto p-4 space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-2xl">
            Khám phá sản phẩm mới tại GPLANT
          </h1>

          <Button variant={"outline"} className="rounded-full lg:block hidden">
            Xem tất cả sản phẩm mới
          </Button>
        </div>

        <CarouselCustom itemSize={"lg"}>
          {productItemsSample.map((product, index) => (
            <div key={index}>
              <CategoryCustomItem>
                <ProductCard product={product} />
              </CategoryCustomItem>
            </div>
          ))}
        </CarouselCustom>

        <Link
          href={""}
          className="lg:hidden flex items-center justify-between border-b pb-4"
        >
          <p className="font-bold">Xem tất cả sản phẩm mới</p>
          <ChevronRight />
        </Link>
      </div>
    </div>
  );
}

export function BuyNowPayLaterSection() {
  return (
    <div className="w-full max-w-[1400px] m-auto p-4">
      <div className="w-full p-10 flex lg:flex-row flex-col-reverse gap-10 justify-between items-center bg-[url('/assets/images/decorations/buynow-paylater-bg.svg')] bg-cover bg-no-repeat bg-center">
        <div className="w-full max-w-md space-y-5 flex flex-col lg:items-start items-center">
          <h1 className="lg:text-3xl text-2xl font-bold text-green-950 lg:text-left text-center">
            Thoải mái mua sắm
          </h1>

          <p className="text-green-900 lg:text-left text-center">
            Chia đơn hàng của bạn thành nhiều lần thanh toán tối đa trong 12
            tháng, lãi suất 0% khi sử dụng thẻ tín dụng hoặc ghi nợ
          </p>

          <div className="flex gap-4 items-center bg-green-50 w-fit px-5 py-2 rounded-lg shadow-2xl">
            <Image
              src={"/assets/icons/zalopay/zalopay-logo.svg"}
              alt="Buy now pay later"
              width={70}
              height={100}
            />

            <Image
              src={"/assets/icons/shopeepay/shopeepay-logo.svg"}
              alt="Buy now pay later"
              width={55}
              height={100}
            />
          </div>
        </div>

        <Image
          src={"/assets/images/decorations/buynow-paylater.svg"}
          alt="Buy now pay later"
          width={300}
          height={100}
        />
      </div>
    </div>
  );
}

export function TipsAndIdeasSection() {
  return (
    <div className="w-full h-fit bg-muted">
      <div className="w-full max-w-[1400px] m-auto px-4 py-10 space-y-5">
        <h1 className="font-bold text-2xl">
          Mẹo và ý tưởng cho một không gian xanh bền vững hơn
        </h1>

        <CarouselCustom>
          <CategoryCustomItem>
            <Link href={""}>
              <div className="w-full aspect-square overflow-hidden bg-primary text-primary-foreground p-5 hover:underline flex flex-col justify-between">
                <p className="font-bold text-xl">Xem Tất cả mẹo và ý tưởng</p>

                <Button
                  variant={"outline"}
                  size={"icon-lg"}
                  className="bg-transparent rounded-full p-6"
                >
                  <ArrowRight className="size-6" />
                </Button>
              </div>
            </Link>
          </CategoryCustomItem>

          {tipsAndIdeasItems.map((item, index) => (
            <div key={index}>
              <CategoryCustomItem>
                <Link href={item.href}>
                  <div
                    className={cn(
                      "w-full aspect-square rounded-xs relative overflow-hidden border"
                    )}
                  >
                    <Image
                      src={item.imageSrc}
                      alt={item.title}
                      fill
                      className="absolute top-0 left-0 z-0 object-cover object-center"
                    />
                  </div>
                  <div className="w-full h-fit flex justify-between items-start gap-2 mt-4">
                    <p className="hover:underline">{item.title}</p>
                    <ArrowUpRight />
                  </div>
                </Link>
              </CategoryCustomItem>
            </div>
          ))}
        </CarouselCustom>
      </div>
    </div>
  );
}

export function SubscribeSection() {
  return (
    <div className="w-full max-w-[1400px] m-auto p-4">
      <div className="w-full flex lg:flex-row flex-col justify-between items-center bg-[#ebebeb]">
        <div className="w-full space-y-5 flex flex-col lg:items-start items-center lg:p-10 px-7 pt-7">
          <h1 className="lg:text-3xl text-2xl font-bold text-[#5a5a5a] lg:text-left text-center">
            Tham gia ngay để nhận ưu đãi độc quyền!
          </h1>

          <p className="text-[#7e7e7e] lg:text-left text-center max-w-lg">
            Đăng ký và nhận được giảm giá độc quyền cho tất cả các loại cây
            trồng và sản phẩm làm vườn yêu thích của bạn!
          </p>

          <div className="w-full max-w-xl flex lg:flex-row flex-col gap-4 items-center">
            <Input
              placeholder="Tên của bạn"
              className="bg-white! border-none outline-none text-black p-6"
            />
            <Input
              placeholder="Địa chỉ Email"
              className="bg-white! border-none outline-none text-black p-6"
            />
            <Button className="lg:w-fit w-full py-6 px-10">Đăng ký</Button>
          </div>
        </div>

        <div className="w-full max-w-sm h-full aspect-square relative">
          <Image
            src={"/assets/images/decorations/cactus.jpg"}
            alt="Buy now pay later"
            fill
            className="absolute top-0 left-0"
          />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="flex flex-col gap-5">
      {/* Danh mục */}
      <CategoriesSection />

      {/* Chào mừng */}
      <WelcomeSection />

      {/* Offers */}
      <GplantOffersSection />

      {/* Best deals */}
      <ToDayBestDealsSection />

      {/* Trending */}
      <WhatsTrendingSection />

      {/* Sản phẩm mới */}
      <DiscoverWhatsNewSection />

      {/* Buy now pay later */}
      <BuyNowPayLaterSection />

      {/* Mẹo và ý tưởng */}
      <TipsAndIdeasSection />

      {/* Đăng ký nhận bản tin */}
      <SubscribeSection />
    </main>
  );
}
