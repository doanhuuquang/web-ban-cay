"use client";

import Link from "next/link";
import {
  Search,
  Heart,
  Truck,
  ShoppingBag,
  UserRound,
  Menu,
  Store,
} from "lucide-react";
import AppLogo from "@/components/shared/app-logo";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LOGIN_PATH } from "@/lib/constants/path";
import React from "react";
import { cn } from "@/lib/utils";

export const navigationLinks = [
  { name: "Trang chủ", href: "/" },
  { name: "Sản phẩm", href: "/products" },
  { name: "Về chúng tôi", href: "/about-us" },
  { name: "Liên hệ", href: "/contact" },
];

function SearchBar() {
  return (
    <div className="w-full">
      <InputGroup className="bg-accent rounded-full h-12 px-3 border-none has-[[data-slot=input-group-control]:focus-visible]:border-primary has-[[data-slot=input-group-control]:focus-visible]:ring-primary has-[[data-slot=input-group-control]:focus-visible]:ring-2">
        <InputGroupInput
          placeholder="Bạn muốn tìm gì?"
          className="placeholder:text-accent-foreground placeholder:text-[16px]"
        />
        <InputGroupAddon>
          <Search className="size-4" />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}

function MenuMobile({ className }: { className?: string }) {
  return (
    <Sheet>
      <SheetTrigger asChild className={className}>
        <Button variant={"ghost"} size={"icon"}>
          <Menu className="size-5 text-foreground" />
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
            <Link key={index} href={link.href} className="uppercase text-lg">
              {link.name}
            </Link>
          ))}
        </div>

        <SheetFooter>
          <Button variant={"outline"}>Quản lý tài khoản</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export function AppHeader() {
  const [isHiden, setIsHidden] = React.useState<boolean>(false);

  React.useEffect(() => {
    const lastY = { current: window.scrollY };

    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY < 400) {
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
        "w-full sticky top-0 z-50 transition-all",
        isHiden && "-translate-y-full"
      )}
    >
      {/* Top Bar */}
      <div className="bg-[#121212] text-white dark:bg-muted lg:text-sm text-xs">
        <div className="max-w-[1400px] mx-auto p-4 flex items-center justify-between gap-8">
          {/* Left Section - Delivery Info */}
          <div className="items-center gap-2 flex-1 hidden lg:flex">
            <Truck size={16} />
            <span className="hover:underline cursor-pointer">
              Dịch vụ giao hàng miễn phí áp dụng cho các đơn hàng trên 150.000đ
            </span>
          </div>

          {/* Right Section - Utilities */}
          <div className="flex items-center lg:justify-end justify-between gap-4 flex-1">
            <button className="flex items-center gap-2 hover:underline cursor-pointer">
              <Truck size={16} />
              <span>Nhập mã bưu điện</span>
            </button>
            <button className="flex items-center gap-2 hover:underline cursor-pointer">
              <Store size={16} />
              <span>Chọn cửa hàng</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-background sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-4 py-4 flex items-center justify-between gap-6">
          {/* Logo */}
          <AppLogo className="text-3xl" />

          {/* Navigation Menu */}
          <nav className="hidden lg:flex items-center gap-8 shrink-0">
            {navigationLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="hover:underline text-foreground/80 hover:text-foreground"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="w-full max-w-md lg:block hidden">
            <SearchBar />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 w-fit">
            {/* Account */}
            <Link href={LOGIN_PATH}>
              <Button variant={"ghost"} className="rounded-full">
                <UserRound className="size-5" />
                <span className="text-sm font-medium hidden lg:inline">
                  Hej! Đăng nhập
                </span>
              </Button>
            </Link>

            {/* Wishlist */}
            <Button variant={"ghost"} size={"icon"} className="rounded-full">
              <Heart className="size-5" />
            </Button>

            {/* Cart */}
            <Button
              variant={"ghost"}
              size={"icon"}
              className="rounded-full relative"
            >
              <ShoppingBag className="size-5" />
              <span className="text-xs font-semibold absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Button>

            {/* Menu mobile */}
            <MenuMobile className="lg:hidden" />
          </div>
        </div>

        {/* Search bar mobile */}
        <div className="w-full max-w-[1400px] px-4 pb-4 m-auto lg:hidden block">
          <SearchBar />
        </div>
      </div>
    </header>
  );
}
