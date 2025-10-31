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
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const navigationLinks = [
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
            "uppercase text-sm",
            currentPath === link.href && "font-semibold",
            isHeaderFixed ? "text-white/50" : "text-muted-foreground",
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
                src={"/assets/icons/facebook.svg"}
                alt="Facebook"
                width={25}
                height={25}
              />
            </Link>

            <Link href="/">
              <Image
                src={"/assets/icons/instagram.svg"}
                alt="Facebook"
                width={25}
                height={25}
              />
            </Link>

            <Link href="/">
              <Image
                src={"/assets/icons/threads.svg"}
                alt="Facebook"
                width={25}
                height={25}
              />
            </Link>

            <Link href="/">
              <Image
                src={"/assets/icons/youtube.svg"}
                alt="Facebook"
                width={25}
                height={25}
              />
            </Link>

            <Link href="/">
              <Image
                src={"/assets/icons/tiktok.svg"}
                alt="Facebook"
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

  return (
    <header
      className={cn(
        "w-full top-0 z-50 transtion-all fixed",
        isFixed ? "bg-transparent" : "bg-background",
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
        <Action isHeaderFixed={isFixed} className="justify-end -mr-3" />
      </div>
    </header>
  );
}
