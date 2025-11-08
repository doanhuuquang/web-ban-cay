"use client";

import AppLogo from "@/components/shared/app-logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Menu, Search, ShoppingBag, User } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const navigationLinks = [
  { name: "Trang chủ", href: "/" },
  { name: "Sản phẩm", href: "/products" },
  { name: "Về chúng tôi", href: "/about-us" },
  { name: "Liên hệ", href: "/contact" },
];

const NavBar = ({
  className,
  isHeaderFixed,
  currentPath,
}: {
  className?: string;
  isHeaderFixed: boolean;
  currentPath: string;
}) => {
  return (
    <nav className={cn("flex items-center justify-center gap-6", className)}>
      {navigationLinks.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className={cn(
            "uppercase transition-all duration-300 ease-in-out text-sm",
            currentPath === link.href && "font-bold",
            isHeaderFixed
              ? "text-white/50 hover:text-white"
              : "text-muted-foreground hover:text-foreground",
            currentPath === link.href
              ? isHeaderFixed
                ? "text-white"
                : "text-foreground"
              : ""
          )}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
};

const Action = ({
  className,
  isHeaderFixed,
}: {
  className?: string;
  isHeaderFixed: boolean;
}) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href="/search">
            <Button
              variant={"ghost"}
              size={"icon"}
              className="rounded-full group"
            >
              <Search
                className={cn(
                  "size-5",
                  isHeaderFixed
                    ? "text-white group-hover:text-foreground"
                    : "text-foreground"
                )}
              />
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>Tìm kiếm</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={"ghost"}
            size={"icon"}
            className="rounded-full group"
          >
            <ShoppingBag
              className={cn(
                "size-5",
                isHeaderFixed
                  ? "text-white group-hover:text-foreground"
                  : "text-foreground"
              )}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Giỏ hàng</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Link href="/auth/login">
            <Button
              variant={"ghost"}
              size={"icon"}
              className="rounded-full group"
            >
              <User
                className={cn(
                  "size-5",
                  isHeaderFixed
                    ? "text-white group-hover:text-foreground"
                    : "text-foreground"
                )}
              />
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>Đăng nhập</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

const MenuMobile = ({
  className,
  isHeaderFixed,
}: {
  className?: string;
  isHeaderFixed: boolean;
}) => {
  const pathname = usePathname();
  const { theme } = useTheme();
  /*
    "/products/"  → "/products"
    "/products"   → "/products"
    "/"           → "/"
  */
  const currentPath = pathname?.replace(/\/+$/, "") || "/";

  return (
    <Sheet>
      <SheetTrigger asChild className={className}>
        <Button variant={"ghost"} size={"icon"}>
          <Menu
            className={cn(
              "size-5",
              isHeaderFixed
                ? "text-white group-hover:text-foreground"
                : "text-foreground"
            )}
          />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full max-w-md">
        <SheetHeader>
          <SheetTitle>
            <AppLogo className="text-3xl" />
          </SheetTitle>
        </SheetHeader>
        <div className="px-4 flex flex-col gap-6">
          {navigationLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={cn(
                "uppercase text-lg",
                currentPath === link.href
                  ? "font-semibold"
                  : "text-muted-foreground"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <SheetFooter>
          <div className="flex items-center justify-center gap-6 py-4">
            <Link href="/">
              <Image
                src={
                  theme === "light"
                    ? "/assets/icons/social-medias/facebook.png"
                    : "/assets/icons/social-medias/facebook-dark.png"
                }
                alt="Facebook"
                width={25}
                height={25}
              />
            </Link>

            <Link href="/">
              <Image
                src={
                  theme === "light"
                    ? "/assets/icons/social-medias/instagram.png"
                    : "/assets/icons/social-medias/instagram-dark.png"
                }
                alt="Instagram"
                width={25}
                height={25}
              />
            </Link>

            <Link href="/">
              <Image
                src={
                  theme === "light"
                    ? "/assets/icons/social-medias/threads.png"
                    : "/assets/icons/social-medias/threads-dark.png"
                }
                alt="Threads"
                width={25}
                height={25}
              />
            </Link>

            <Link href="/">
              <Image
                src={
                  theme === "light"
                    ? "/assets/icons/social-medias/youtube.png"
                    : "/assets/icons/social-medias/youtube-dark.png"
                }
                alt="Youtube"
                width={25}
                height={25}
              />
            </Link>

            <Link href="/">
              <Image
                src={
                  theme === "light"
                    ? "/assets/icons/social-medias/tiktok.png"
                    : "/assets/icons/social-medias/tiktok-dark.png"
                }
                alt="Tiktok"
                width={25}
                height={25}
              />
            </Link>
          </div>

          <Button variant={"outline"}>Quản lý tài khoản</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default function AppHeader({ className }: { className?: string }) {
  const [isFixed, setIsFixed] = React.useState<boolean>(false);
  const [isHiden, setIsHidden] = React.useState<boolean>(false);

  const pathname = usePathname();
  /*
        "/products/"  → "/products"
        "/products"   → "/products"
        "/"           → "/"
  */
  const currentPath = pathname?.replace(/\/+$/, "") || "/";

  React.useEffect(() => {
    if (currentPath !== "/") {
      setIsFixed(false);
      return;
    }

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsFixed(false);
      } else {
        setIsFixed(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPath]);

  React.useEffect(() => {
    const lastY = { current: window.scrollY };

    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY < 700) {
        setIsHidden(false);
      } else {
        if (currentY > lastY.current) {
          setIsHidden(true);
        } else if (currentY < lastY.current) {
          setIsHidden(false);
        }
      }

      lastY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "w-full top-0 z-50 transtion-all duration-300 ease-in-out fixed",
        isFixed ? "bg-transparent" : "bg-background",
        isHiden ? "-translate-y-full" : "translate-y-0",
        className
      )}
    >
      <div className="w-full max-w-[1400px] m-auto p-4 lg:grid lg:grid-cols-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <MenuMobile isHeaderFixed={isFixed} className="-ml-3 lg:hidden" />
          <AppLogo isHeaderFixed={isFixed} className="lg:text-3xl text-2xl" />
        </div>
        <NavBar
          isHeaderFixed={isFixed}
          currentPath={currentPath}
          className="w-full col-span-2 lg:flex hidden"
        />
        <Action isHeaderFixed={isFixed} className="justify-end -mr-2.5" />
      </div>
    </header>
  );
}
