import AppLogo from "@/components/shared/app-logo";
import Link from "next/link";
import SubscribeForm from "@/components/shared/subscribe-form";
import Image from "next/image";
import { carouselItems } from "@/lib/constants/crousel-items";

export const navigationLinks = [
  { name: "Trang chủ", href: "/" },
  { name: "Sản phẩm", href: "/products" },
  { name: "Về chúng tôi", href: "/about-us" },
  { name: "Liên hệ", href: "/contact" },
];

export default function AppFooter() {
  return (
    <div className="w-full bg-[#0a0a0a] divide-y divide-white/10 border-t-white/10 border-t">
      <div className="w-full max-w-[1400px] mx-auto grid lg:grid-cols-3 grid-cols-1 divide-x divide-white/10">
        <div className="space-y-5 px-4 py-5">
          <AppLogo className="text-3xl text-white" />

          <p className="text-sm text-white mt-2">
            Cửa hàng cây xanh cho mọi phong cách.
          </p>

          <div className="flex items-center justify-start gap-6 -ml-1.5">
            <Link href="/">
              <Image
                src={"/assets/icons/social-medias/facebook-dark.png"}
                alt="Facebook"
                width={25}
                height={25}
              />
            </Link>

            <Link href="/">
              <Image
                src={"/assets/icons/social-medias/instagram-dark.png"}
                alt="Facebook"
                width={25}
                height={25}
              />
            </Link>

            <Link href="/">
              <Image
                src={"/assets/icons/social-medias/threads-dark.png"}
                alt="Facebook"
                width={25}
                height={25}
              />
            </Link>

            <Link href="/">
              <Image
                src={"/assets/icons/social-medias/youtube-dark.png"}
                alt="Facebook"
                width={25}
                height={25}
              />
            </Link>

            <Link href="/">
              <Image
                src={"/assets/icons/social-medias/tiktok-dark.png"}
                alt="Facebook"
                width={25}
                height={25}
              />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 text-sm px-4 py-5 ">
          <div className="space-y-3">
            <p className="font-semibold text-white">Liên kết nhanh</p>
            <div className="flex flex-col space-y-2">
              {navigationLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-sm text-white/70 hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-3 text-end">
            <p className="font-semibold text-white">Danh mục sản phẩm</p>
            <div className="flex flex-col space-y-2">
              {carouselItems.map((item, index) => (
                <Link
                  key={index}
                  href={"/"}
                  className="text-sm text-white/70 hover:text-primary transition-colors"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="px-4 py-5 space-y-5">
          <p className="text-sm font-semibold text-white">
            Đăng ký nhận các thông báo mới nhất!
          </p>
          <SubscribeForm />
        </div>
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-4 py-5 flex flex-wrap items-center justify-between text-muted-foreground text-xs gap-2">
        <p>Copyright © 2025. Toàn bộ bản quyền thuộc GPlant</p>
        <div className="flex items-center gap-2">
          <Link href={"/"}>Điều khoản dịch vụ</Link>
          <div className="w-px h-3 bg-muted-foreground"></div>
          <Link href={"/"}>Chính sách bảo mật</Link>
        </div>
      </div>
    </div>
  );
}
