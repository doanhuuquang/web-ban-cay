import ProductCard from "@/components/shared/product-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, ArrowUpRight, Mail, Star } from "lucide-react";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { carouselItems } from "@/lib/constants/crousel-items";
import {
  CarouselCustom,
  CategoryCustomItem,
} from "@/components/shared/carousel-custom";

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
      <div className="w-full h-full absolute top-0 left-0 bg-black/60 z-1"></div>

      {/* Content */}
      <div className="w-full max-w-7xl m-auto space-y-7 z-2 flex flex-col items-center text-white">
        {/* Title */}{" "}
        <p className="w-full max-w-2xl lg:text-5xl text-4xl uppercase font-black tracking-tight lg:leading-18 leading-12 text-center">
          Nâng cấp không gian sống với một chút
          <span className="text-primary"> xanh</span>
        </p>
        {/* Subtitle */}
        <p className="text-white/70 max-w-lg text-center">
          Mỗi chiếc lá là một hơi thở trong lành, mỗi chậu cây là một niềm vui
          nhỏ giữa bộn bề cuộc sống.
        </p>
        <div className="flex items-center justify-center flex-wrap gap-6">
          <Button className="px-15 py-6">Khám phá ngay</Button>
          <div className="flex items-center gap-2">
            <Button
              size={"icon"}
              className="rounded-full bg-white hover:bg-white p-6"
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

function FavoriteProductCard({
  productImage,
  productName,
  className,
}: {
  productImage: string;
  productName: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative lg:rounded-xl md:rounded-lg rounded-md overflow-hidden group cursor-pointer",
        className
      )}
    >
      <Image
        src={productImage}
        alt="lks"
        fill
        className="absolute top-0 left-0 object-cover object-center "
      />

      <div className="w-full h-full bg-background/30 backdrop-blur-2xl absolute z-1 opacity-0 group-hover:opacity-100 transition-all grid content-center">
        <p className="uppercase text-center text-2xl font-bold">
          {productName}
        </p>
      </div>
    </div>
  );
}

function MostPopularProducts({ className }: { className?: string }) {
  return (
    <div className={cn("w-full", className)}>
      <div className="w-full max-w-[1400px] m-auto p-4 space-y-5">
        {/* Head */}
        <div className="w-full flex items-center justify-between">
          <p className="font-semibold text-2xl uppercase pl-4 border-l-5 border-l-primary">
            Sản phẩm được nhiều người yêu thích
          </p>

          <Link
            href={"/"}
            className="md:block hidden w-fit underline underline-offset-2"
          >
            Xem thêm
          </Link>
        </div>

        {/* Bento grid products */}
        <div className="space-y-4">
          <div className="grid grid-cols-5 gap-4 h-80">
            <FavoriteProductCard
              className="md:col-span-3 col-span-5"
              productImage="/assets/images/products/favorite-product-1.png"
              productName="Hoa cúc trắng"
            />

            <FavoriteProductCard
              className="md:col-span-2 col-span-5"
              productImage="/assets/images/products/favorite-product-3.jpg"
              productName="Sen đá mini"
            />
          </div>
          <div className="grid grid-cols-5 gap-4 h-80">
            <FavoriteProductCard
              className="md:col-span-2 col-span-5"
              productImage="/assets/images/products/favorite-product-2.png"
              productName="Hoa Tulip xanh"
            />

            <FavoriteProductCard
              className="md:col-span-3 col-span-5"
              productImage="/assets/images/products/favorite-product-4.jpg"
              productName="Chậu cây mini để bàn"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoriesSection() {
  return (
    <div className="w-full max-w-[1400px] m-auto p-4">
      <CarouselCustom>
        {carouselItems.map((item, index) => (
          <div key={index}>
            <CategoryCustomItem>
              <Link href={item.href}>
                <div
                  className={cn(
                    "w-full aspect-square rounded-xs relative overflow-hidden"
                  )}
                >
                  <Image
                    src={item.imageSrc}
                    alt="kjsdv"
                    fill
                    className="absolute top-0 left-0 z-0 object-cover object-center"
                  />
                  <div className="w-full h-fit p-4 pb-15 absolute top-0 z-1 space-y-2 bg-linear-to-b from-gray-200 to-transparent">
                    <p className="text-black font-semibold text-lg hover:underline">
                      {item.title}
                    </p>
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

function NewArrivalProductsSection({ className }: { className?: string }) {
  return (
    <div className={cn("w-full bg-background", className)}>
      <div className="w-full max-w-[1400px] m-auto p-4 space-y-5">
        {/* Head */}
        <div className="w-full flex items-center justify-between">
          <p className="font-semibold text-2xl uppercase pl-4 border-l-5 border-l-primary">
            Sản phẩm mới trong tháng
          </p>

          <Link
            href={"/"}
            className="md:block hidden w-fit underline underline-offset-2"
          >
            Xem thêm
          </Link>
        </div>

        <div className="w-full grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 md:gap-4 gap-2">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductCard
              key={index}
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
          ))}
        </div>
      </div>
    </div>
  );
}

export function ReviewCarousel() {
  interface Review {
    name: string;
    avatar: string;
    rating: number;
    text: string;
    date: string;
  }

  const reviews: Review[] = [
    {
      name: "Nguyễn Thu Hương",
      avatar: "/vietnamese-woman-avatar.jpg",
      rating: 5,
      text: "Cây hồng môn rất đẹp và tươi. Giao hàng nhanh, đóng gói cẩn thận. Chắc chắn sẽ mua lại!",
      date: "2 tuần trước",
    },
    {
      name: "Trần Minh Đức",
      avatar: "/vietnamese-man-avatar.jpg",
      rating: 5,
      text: "Cây phát tài rất tốt, lá xanh tươi. Cứu tinh của không gian văn phòng của tôi. Tuyệt vời!",
      date: "1 tháng trước",
    },
    {
      name: "Lê Hồng Hạnh",
      avatar: "/vietnamese-woman-portrait.jpg",
      rating: 4,
      text: "Cây lan hồ điệp nổi bật trên bàn làm việc. Chỉ mong nó nở hoa sớm. Nhân viên tư vấn rất tốt!",
      date: "3 tuần trước",
    },
    {
      name: "Phạm Văn Tùng",
      avatar: "/vietnamese-man-portrait.jpg",
      rating: 5,
      text: "Cây cau vàng giúp phòng của tôi sáng hơn rất nhiều. Thích những điều nhỏ như vậy!",
      date: "1 tuần trước",
    },
    {
      name: "Võ Thu Trang",
      avatar: "/asian-woman-portrait.jpg",
      rating: 4,
      text: "Trầu bà rất dễ chăm sóc cho người mới bắt đầu. Giá cạnh tranh, chất lượng tốt.",
      date: "5 ngày trước",
    },
    {
      name: "Hoàng Minh Khoa",
      avatar: "/asian-man-portrait.jpg",
      rating: 5,
      text: "Bạch mộc của tôi đã nở hoa! Rất vui khi làm theo hướng dẫn của shop. Tuyệt vời!",
      date: "3 ngày trước",
    },
  ];

  return (
    <div className="w-full max-w-[1400px] m-auto p-4 space-y-5">
      {/* Head */}
      <p className="font-semibold text-2xl uppercase pl-4 border-l-5 border-l-primary">
        Đánh giá từ khách hàng
      </p>

      {/* Carousel */}
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {reviews.map((review, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1 ">
                <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-6 h-full">
                  {/* Stars */}
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-foreground leading-relaxed grow">{`"${review.text}"`}</p>

                  {/* Author Info */}
                  <div className="flex items-center gap-3 pt-2 border-t border-border">
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <p className="font-semibold text-foreground">
                        {review.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {review.date}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation */}
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

function MarqueeItem({
  logoSrc,
  logoName,
}: {
  logoSrc: string;
  logoName: string;
}) {
  return (
    <Image
      src={logoSrc}
      alt={logoName}
      width={100}
      height={100}
      className="md:mx-10 mx-5"
    />
  );
}

export default function Home() {
  return (
    <main className="flex flex-col gap-10">
      {/* Danh mục */}
      <CategoriesSection />

      {/* Chào mừng */}
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
              <div className="w-fit bg-cyan-600 px-2 py-1 md:text-sm text-xs text-white">
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
                src={"/assets/images/decorations/orange-flower.jpg"}
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
                src={"/assets/images/decorations/bedroom-with-plants.png"}
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

      {/* Gợi ý sản phẩm được yêu thích nhiều nhất*/}
      <MostPopularProducts className="mt-10" />

      {/* Đối tác bán hàng */}
      <div className="w-full space-y-5">
        <div className="max-w-[1400px] m-auto p-4">
          <p className="font-semibold text-2xl uppercase pl-4 border-l-5 border-l-primary">
            Đối tác bán hàng
          </p>
        </div>
        <Marquee pauseOnHover={false} gradientWidth={50} speed={50}>
          <MarqueeItem
            logoSrc="/assets/icons/partner-logos/aeon.svg"
            logoName=""
          />
          <MarqueeItem
            logoSrc="/assets/icons/partner-logos/amazon.svg"
            logoName=""
          />
          <MarqueeItem
            logoSrc="/assets/icons/partner-logos/costco-wholesale.svg"
            logoName=""
          />
          <MarqueeItem
            logoSrc="/assets/icons/partner-logos/facebook.svg"
            logoName=""
          />
          <MarqueeItem
            logoSrc="/assets/icons/partner-logos/shopee.svg"
            logoName=""
          />
          <MarqueeItem
            logoSrc="/assets/icons/partner-logos/target.svg"
            logoName=""
          />
          <MarqueeItem
            logoSrc="/assets/icons/partner-logos/tiktok-banner.svg"
            logoName=""
          />
          <MarqueeItem
            logoSrc="/assets/icons/partner-logos/walmart.svg"
            logoName=""
          />
        </Marquee>
      </div>

      {/* Giảm giá */}
      <div className="bg-[#68a9de]/10">
        <div className={cn("w-full max-w-[1400px] m-auto px-4 py-10")}>
          <div className="flex md:flex-row-reverse flex-col gap-10 items-center lg:rounded-2xl md:rounded-lg rounded-md">
            <Image
              src="/assets/images/orange-flower.jpg"
              alt="Room with plants"
              width={200}
              height={200}
              className="rounded-4xl w-full max-w-md aspect-square object-cover object-center"
            ></Image>

            {/* Content */}
            <div className="w-full space-y-5 z-2 flex flex-col md:items-start items-center">
              <p className="w-full md:text-5xl text-3xl uppercase font-black tracking-tight md:text-left text-center">
                Đơn giản là đẹp
              </p>
              <p className="lg:text-lg md:text-left text-center">
                Nhập
                <span className="text-[#FF9100] font-bold"> GREENFUTURE </span>
                giảm<span className="text-[#5f9cd9] font-bold"> 50K </span>đơn
                đầu tiên từ
                <span className="text-[#5f9cd9] font-bold"> 299k</span>
              </p>
              <Button className="bg-[#FF9100]  hover:bg-[#FF9100] text-[#FFFBE6] py-6 min-w-1/3 md:w-fit w-full">
                Mua ngay
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Danh mục */}
      <CategoriesSection />

      {/* Chính sách bán hàng */}
      <div className="w-full max-w-[1400px] p-4 m-auto grid md:grid-cols-3 grid-cols-1 gap-10">
        <div className="flex flex-col items-center gap-3">
          <Image
            src={"/assets/icons/sales-policy-icons/large-assortment.svg"}
            alt="Large assortment"
            width={80}
            height={80}
          />
          <p className="font-semibold">Đa dạng loại cây</p>
          <p className="text-muted-foreground text-center max-w-sm">
            chúng tôi cung cấp nhiều loại sản phẩm khác nhau với ít biến thể hơn
            trong mỗi danh mục.
          </p>
        </div>

        <div className="flex flex-col items-center gap-3">
          <Image
            src={"/assets/icons/sales-policy-icons/free-shipping.svg"}
            alt="Large assortment"
            width={80}
            height={80}
          />
          <p className="font-semibold">Vận chuyển nhanh & miễn phí</p>
          <p className="text-muted-foreground text-center max-w-sm">
            Thời gian giao hàng 4 ngày hoặc ít hơn, miễn phí vận chuyển và có
            tùy chọn giao hàng nhanh.
          </p>
        </div>

        <div className="flex flex-col items-center gap-3">
          <Image
            src={"/assets/icons/sales-policy-icons/24-7-support.svg"}
            alt="Large assortment"
            width={80}
            height={80}
          />
          <p className="font-semibold">Hỗ trợ 24/7</p>
          <p className="text-muted-foreground text-center max-w-sm">
            Đội ngũ hỗ trợ khách hàng luôn sẵn sàng giải đáp mọi thắc mắc của
            bạn
          </p>
        </div>
      </div>

      {/* Sản phẩm mới trong tháng */}
      <NewArrivalProductsSection className="mt-10" />

      {/* Đánh giá sản phẩm */}
      <ReviewCarousel />

      {/* Liên hệ */}
      <div className="bg-[#91e3a8]/10 mt-10">
        <div className={cn("w-full max-w-[1400px] m-auto")}>
          <div className="flex md:flex-row-reverse flex-col items-center lg:rounded-2xl md:rounded-lg rounded-md">
            <Image
              src="/assets/images/message-bro.svg"
              alt="Message bro"
              width={200}
              height={200}
              className="rounded-4xl w-full max-w-md aspect-square object-cover object-center"
            ></Image>

            {/* Content */}
            <div className="w-full space-y-5 z-2 flex flex-col md:items-start items-center  px-4 py-10">
              <p className="w-full md:text-5xl text-3xl uppercase font-black tracking-tight md:text-left text-center">
                Không bỏ lỡ
              </p>
              <p className="lg:text-lg md:text-left text-center max-w-xl">
                Đăng ký nhận những thông báo mới nhất của chúng tôi ngay hôm nay
                và là người đầu tiên sở hữu cây trồng mới, được giảm giá độc
                quyền và nhiều ưu đãi khác!
              </p>
              <InputGroup className="max-w-md bg-background overflow-hidden">
                <InputGroupInput
                  type="email"
                  placeholder="Cho chúng tôi biết email của bạn"
                  className="bg-background"
                />
                <InputGroupAddon>
                  <Mail />
                </InputGroupAddon>
              </InputGroup>
              <Button className="py-6 w-full max-w-md">Đăng ký ngay</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
