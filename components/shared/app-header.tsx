"use client";

import Link from "next/link";
import {
  Heart,
  Truck,
  ShoppingBag,
  UserRound,
  Menu,
  Percent,
  ShieldCheck,
  Gift,
  MessageSquareShare,
} from "lucide-react";
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
import { Skeleton } from "@/components/ui/skeleton";
import {
  ACCOUNT_PATH,
  CART_PATH,
  LOGIN_PATH,
  WHISHLIST_PATH,
} from "@/lib/constants/path";
import React from "react";
import { cn } from "@/lib/utils";
import {
  AppSearch,
  SearchBar,
  SearchSuggestionsList,
} from "@/components/shared/app-search";
import Marquee from "react-fast-marquee";
import { useAuth } from "@/lib/contexts/auth-context";
import { usePathname } from "next/navigation";

export const navigationLinks = [
  { name: "Trang chủ", href: "/" },
  { name: "Sản phẩm", href: "/products" },
  { name: "Về chúng tôi", href: "/about-us" },
  { name: "Liên hệ", href: "/contact" },
];

type AppHeaderContextProps = {
  isShowAppHeader: boolean;
  setIShowAppHeader: (value: boolean) => void;
  isShowSearchDropdown: boolean;
  setIsShowSearchDropdown: (value: boolean) => void;
};

const AppHeaderContext = React.createContext<AppHeaderContextProps | null>(
  null
);

function useAppHeader() {
  const context = React.useContext(AppHeaderContext);

  if (!context) {
    throw new Error("useAppHeader must be used within a <AppHeader />");
  }

  return context;
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

function AccountButton() {
  const { isLoading, isLoggedIn } = useAuth();

  if (isLoading)
    return <Skeleton className="h-9 w-25 max-md:w-9 rounded-full" />;

  return (
    <Link href={isLoggedIn ? ACCOUNT_PATH : LOGIN_PATH}>
      <Button variant={"ghost"} className="rounded-full">
        <UserRound className="size-5" />
        <span className="text-sm font-medium hidden lg:inline">
          {isLoggedIn ? "Tài khoản của tôi" : "Hej! Đăng nhập"}
        </span>
      </Button>
    </Link>
  );
}

function AppHeaderContent() {
  const pathName = usePathname();

  const {
    isShowAppHeader,
    setIShowAppHeader,
    isShowSearchDropdown,
    setIsShowSearchDropdown,
  } = useAppHeader();

  React.useEffect(() => {
    const lastY = { current: window.scrollY };

    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY < 100) {
        setIShowAppHeader(true);
      } else {
        if (currentY > lastY.current) {
          setIShowAppHeader(false);
        } else if (currentY < lastY.current) {
          setIShowAppHeader(true);
        }
      }

      lastY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setIShowAppHeader]);

  React.useEffect(() => {
    if (isShowSearchDropdown) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isShowSearchDropdown]);

  if (pathName?.startsWith("/admin")) return null;

  return (
    <AppSearch>
      <header
        className={cn(
          "w-full h-fit sticky top-0 z-50 transition-all flex flex-col",
          !isShowSearchDropdown && !isShowAppHeader && "-translate-y-full",
          isShowSearchDropdown && "min-h-screen fixed"
        )}
      >
        {/* Top Bar */}
        <div className="bg-primary text-primary-foreground lg:text-sm text-xs">
          <div className="max-w-[1400px] mx-auto px-4 py-2">
            <Marquee speed={50}>
              <div className="flex items-center gap-2 mx-10">
                <Truck size={16} />
                <span>Miễn phí giao hàng cho đơn trên 150.000đ</span>
              </div>

              <div className="flex items-center gap-2 mx-10">
                <Gift size={16} />
                <span>Tặng kèm đất hữu cơ cho đơn trên 300.000đ</span>
              </div>

              <div className="flex items-center gap-2 mx-10">
                <Percent size={16} />
                <span>Cây cảnh văn phòng giảm đến 25% trong tuần này</span>
              </div>

              <div className="flex items-center gap-2 mx-10">
                <ShieldCheck size={16} />
                <span>Bảo hành 7 ngày cho tất cả cây trong nhà</span>
              </div>
            </Marquee>
          </div>
        </div>

        {/* Main Header */}
        <div className="bg-background w-full sticky top-0 z-50">
          <div className="max-w-[1400px] mx-auto px-4 py-4 flex items-center justify-between gap-6">
            {/* Logo */}
            <AppLogo />

            {/* Navigation Menu */}
            <nav className="hidden lg:flex items-center gap-6 shrink-0">
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
              <SearchBar
                onFocus={() => setIsShowSearchDropdown(true)}
                onSubmit={() => setIsShowSearchDropdown(false)}
              />
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-1 w-fit">
              {/* Account */}
              <AccountButton />

              {/* Wishlist */}
              <Link href={WHISHLIST_PATH}>
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="rounded-full"
                >
                  <Heart className="size-5" />
                </Button>
              </Link>

              {/* Cart */}
              <Link href={CART_PATH}>
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="rounded-full relative"
                >
                  <ShoppingBag className="size-5" />
                  <div className="text-[9px] font-semibold absolute bottom-0 right-0 bg-primary text-background rounded-full w-4 h-4 flex items-center justify-center border-2 border-background">
                    <p className="leading-0">8</p>
                  </div>
                </Button>
              </Link>

              {/* Chat bot */}
              <Link href={WHISHLIST_PATH}>
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="rounded-full"
                >
                  <MessageSquareShare className="size-5" />
                </Button>
              </Link>

              {/* Menu mobile */}
              <MenuMobile className="lg:hidden" />
            </div>
          </div>

          {/* Search bar mobile */}
          <div className="w-full max-w-[1400px] px-4 pb-4 m-auto lg:hidden block">
            <SearchBar onFocus={() => setIsShowSearchDropdown(true)} />
          </div>
        </div>

        {/* Search dropdown */}
        {isShowSearchDropdown && (
          <div className="w-full min-h-full bg-background/60 backdrop-blur-xs flex-1 shadow-2xl flex flex-col">
            <div className="w-full bg-background border-y overflow-hidden">
              <div className="w-full max-w-[1400px] mx-auto">
                <div className="max-h-[55vh] overflow-y-scroll scrollbar-hide">
                  <SearchSuggestionsList />
                </div>
              </div>
            </div>

            <div
              className="w-full h-full p-4 grow"
              onClick={() => setIsShowSearchDropdown(false)}
            ></div>
          </div>
        )}
      </header>
    </AppSearch>
  );
}

function AppHeaderProvider({ children }: { children: React.ReactNode }) {
  const [isShowAppHeader, setIShowAppHeader] = React.useState(true);
  const [isShowSearchDropdown, setIsShowSearchDropdown] = React.useState(false);

  return (
    <AppHeaderContext.Provider
      value={{
        isShowAppHeader,
        setIShowAppHeader,
        isShowSearchDropdown,
        setIsShowSearchDropdown,
      }}
    >
      {children}
    </AppHeaderContext.Provider>
  );
}

export { useAppHeader, AppHeaderProvider, AppHeaderContent };
