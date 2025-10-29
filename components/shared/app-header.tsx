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

const navigationLinks = [
  { name: "Trang chủ", href: "/" },
  { name: "Sản phẩm", href: "/products" },
  { name: "Về chúng tôi", href: "/about-us" },
  { name: "Liên hệ", href: "/contact" },
];

const NavBar = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  /*
    "/products/"  → "/products"
    "/products"   → "/products"
    "/"           → "/"
  */
  const currentPath = pathname?.replace(/\/+$/, "") || "/";

  return (
    <nav className={cn("flex items-center justify-center gap-6", className)}>
      {navigationLinks.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className={cn(
            "uppercase text-sm",
            currentPath === link.href
              ? "font-semibold"
              : "text-muted-foreground hover:text-foreground transition-colors"
          )}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
};

const Action = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant={"ghost"} size={"icon"} className="rounded-full">
            <Search className="size-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Tìm kiếm</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant={"ghost"} size={"icon"} className="rounded-full">
            <ShoppingBag className="size-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Giỏ hàng</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant={"ghost"} size={"icon"} className="rounded-full">
            <User className="size-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Đăng nhập</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

const MenuMobile = ({ className }: { className?: string }) => {
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
          <Menu className="size-5" />
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
  return (
    <header className={cn("w-full sticky top-0 z-50 bg-background", className)}>
      <div className="w-full max-w-7xl m-auto p-4 lg:grid lg:grid-cols-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <MenuMobile className="-ml-3 lg:hidden" />
          <AppLogo className="lg:text-3xl text-2xl" />
        </div>
        <NavBar className="w-full col-span-2 lg:flex hidden" />
        <Action className="justify-end -mr-3" />
      </div>
    </header>
  );
}
