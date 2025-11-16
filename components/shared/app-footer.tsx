import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { icons } from "lucide-react";
import { AppThemeModeToggle } from "@/components/shared/app-theme-mode-toggle";

export const navigationLinks = [
  { name: "Trang chủ", href: "/" },
  { name: "Sản phẩm", href: "/products" },
  { name: "Về chúng tôi", href: "/about-us" },
  { name: "Liên hệ", href: "/contact" },
];

const services = [
  "Giao hàng",
  "Nhận hàng tại cửa hàng (Click and collect)",
  "Tài chính / Trả góp",
  "Dịch vụ tư vấn – lập kế hoạch",
  "Thu mua lại (Buyback)",
];

const helps = [
  "Dịch vụ khách hàng",
  "Theo dõi đơn hàng",
  "Liên hệ chúng tôi",
  "Chính sách đổi trả",
  "Mua sắm từ xa",
  "Ứng dụng GPLANT",
  "Thẻ quà tặng GPLANT",
  "Câu hỏi thường gặp (FAQ)",
  "Thu hồi sản phẩm (Product recalls)",
  "Gửi phản hồi cho chúng tôi",
  "Hỗ trợ tiếp cận (Accessibility)",
];

const aboutGPLANT = [
  "Tìm cửa hàng",
  "Giới thiệu về chúng tôi",
  "Tuyển dụng tại GPLANT",
  "GPLANT dành cho doanh nghiệp",
  "Quỹ GPLANT",
  "Phát triển bền vững",
  "Tin tức",
];

const GPLANTFamily = [
  "Chào mừng đến với GPLANT Family",
  "Quyền lợi từ GPLANT Family",
  "Ưu đãi",
  "Sự kiện",
  "Giới thiệu",
];

const paymentMethods = [
  { href: "/", imageSrc: "/assets/icons/payments/visa.svg", alt: "Visa" },
  {
    href: "/",
    imageSrc: "/assets/icons/payments/master-card.svg",
    alt: "Master card",
  },
  {
    href: "/",
    imageSrc: "/assets/icons/payments/american-express.svg",
    alt: "American express",
  },
  { href: "/", imageSrc: "/assets/icons/payments/paypal.svg", alt: "Paypal" },
  {
    href: "/",
    imageSrc: "/assets/icons/payments/apple-pay.svg",
    alt: "Apple pay",
  },
  {
    href: "/",
    imageSrc: "/assets/icons/payments/google-pay.svg",
    alt: "Google pay",
  },
];

export default function AppFooter() {
  return (
    <div className="w-full h-fit bg-muted dark:bg-background">
      <div className="w-full h-full max-w-[1400px] m-auto px-4 py-10 space-y-10">
        {/* Head */}
        <div className="w-full grid lg:grid-cols-6 grid-cols-1 gap-6 max-md:divide-y">
          <div className="w-full h-full lg:col-span-2 space-y-10 mb-4">
            {/* Tham gia GPLANT Family */}
            <div className="space-y-3">
              <p className="font-bold">Tham gia GPLANT Family</p>

              <p className="text-sm text-muted-foreground">
                Nhận ngay ưu đãi và các quyền lợi khi tham gia câu lạc bộ IKEA
                Family hoàn toàn miễn phí ngay hôm nay.
              </p>

              <div>
                <Link href={"/"} className="underline text-sm">
                  Xem thêm
                </Link>
              </div>

              <Button className="rounded-full bg-foreground text-background hover:bg-foreground/70 hover:text-background">
                Tham gia
              </Button>
            </div>

            {/* Tham gia GPLANT Business Network */}
            <div className="space-y-3">
              <p className="font-bold">Tham gia GPLANT Business Network</p>

              <p className="text-sm text-muted-foreground">
                Nhận nhiều quyền lợi đặc biệt giúp bạn xây dựng môi trường làm
                việc tốt hơn.
              </p>

              <div>
                <Link href={"/"} className="underline text-sm">
                  Xem thêm
                </Link>
              </div>

              <Button className="rounded-full bg-foreground text-background hover:bg-foreground/70 hover:text-background">
                Tham gia
              </Button>
            </div>
          </div>

          {/* Helps */}
          <div className="space-y-4">
            <p className="font-bold">Hỗ trợ</p>
            <div className="lg:block hidden space-y-4">
              {helps.map((service, index) => (
                <Link
                  key={index}
                  href={"#"}
                  className="text-muted-foreground block hover:text-foreground hover:underline text-sm"
                >
                  {service}
                </Link>
              ))}
            </div>
          </div>

          {/* About GPLANT */}
          <div className="space-y-4">
            <p className="font-bold">Về GPLANT</p>
            <div className="lg:block hidden space-y-4">
              {aboutGPLANT.map((service, index) => (
                <Link
                  key={index}
                  href={"#"}
                  className="text-muted-foreground block hover:text-foreground hover:underline text-sm"
                >
                  {service}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <p className="font-bold">Dịch vụ</p>
            <div className="lg:block hidden space-y-4">
              {services.map((service, index) => (
                <Link
                  key={index}
                  href={"#"}
                  className="text-muted-foreground block hover:text-foreground hover:underline text-sm"
                >
                  {service}
                </Link>
              ))}
            </div>
          </div>

          {/* GPLANT Family */}
          <div className="space-y-4">
            <p className="font-bold">GPLANT Family</p>
            <div className="lg:block hidden space-y-4">
              {GPLANTFamily.map((service, index) => (
                <Link
                  key={index}
                  href={"#"}
                  className="text-muted-foreground block hover:text-foreground hover:underline text-sm"
                >
                  {service}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Phương thức thanh toán */}
        <div className="flex items-center gap-4 flex-wrap">
          {paymentMethods.map((method, index) => (
            <Link
              key={index}
              href={method.href}
              className="border hover:border-foreground"
            >
              <Image
                src={method.imageSrc}
                alt={method.alt}
                width={50}
                height={30}
                className="object-contain"
              />
            </Link>
          ))}
        </div>

        {/* Foot */}
        <div className="w-full flex lg:flex-row flex-col lg:items-center items-start justify-between gap-4 pt-4 border-t">
          <p className="text-sm">
            GPLANT Việt Nam - Cửu Việt 2, Trâu Quỳ, Gia Lâm, Hà Nội © Công ty
            TNHH GPLANT Việt Nam 1999-2025
          </p>

          <AppThemeModeToggle />
        </div>
      </div>
    </div>
  );
}
