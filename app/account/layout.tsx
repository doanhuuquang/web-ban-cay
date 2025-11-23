"use client";

import AccountSidebar from "@/components/shared/account-sidebar";
import {
  AppLoadingBackground,
  AppLoadingIcon,
} from "@/components/shared/app-loading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LOGIN_PATH } from "@/lib/constants/path";
import { useUser } from "@/lib/contexts/user-context";
import { Receipt, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function NotLoggedInYet() {
  return (
    <div className="w-full h-fit">
      <div className="w-full max-w-[1400px] px-4 pb-15 m-auto flex flex-col items-center">
        <div className="w-full max-w-sm relative aspect-square object-cover object-center">
          <Image
            src={"/assets/images/decorations/empty-cart.svg"}
            alt="404"
            fill
            className="absolute top-0 left-0 w-full"
          />
        </div>

        <div className="grid items-center text-center max-w-md">
          <p className="text-xl font-bold mb-2">Opps! Bạn chưa đăng nhập</p>

          <p className="text-sm text-muted-foreground">
            Đăng nhập để khám phá sản phẩm, theo dõi đơn hàng và thêm cây xanh
            vào giỏ của bạn.
          </p>
        </div>

        <Link href={LOGIN_PATH} className="mt-6">
          <Button>Tới trang đăng nhập</Button>
        </Link>
      </div>
    </div>
  );
}

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading, isLoggedIn } = useUser();

  if (isLoading) {
    return (
      <AppLoadingBackground>
        <AppLoadingIcon title="Đang kiểm tra" />
      </AppLoadingBackground>
    );
  }

  if (!isLoggedIn) return <NotLoggedInYet />;

  return (
    <div className="w-full h-fit bg-accent dark:bg-background">
      <div className="w-full max-w-[1400px] m-auto md:px-4 py-4 space-y-4">
        <div className="w-full overflow-hidden px-4 py-6 grid md:grid-cols-3 grid-cols-1 gap-6 md:divide-x-3 divide-blue-ocean bg-background dark:bg-accent/50 shadow-sm">
          <div className="flex items-center gap-4">
            <Avatar className="size-15">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div>
              <p className="font-bold text-lg">Doan Huu Quang</p>
              <p className="text-sm text-muted-foreground">0336314376</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-blue-ocean size-15 flex items-center justify-center rounded-full">
              <ShoppingBag className="text-primary-foreground" />
            </div>

            <div>
              <p className="font-bold text-lg">0</p>
              <p className="text-sm text-muted-foreground">
                Tổng số đơn hàng đã mua
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-blue-ocean size-15 flex items-center justify-center rounded-full">
              <Receipt className="text-primary-foreground" />
            </div>

            <div>
              <p className="font-bold text-lg">0₫</p>
              <p className="text-sm text-muted-foreground">
                Tổng tiền tích lũy
              </p>
            </div>
          </div>
        </div>

        <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-4">
          <AccountSidebar className="h-full md:col-span-1 bg-background dark:bg-accent/50 shadow-sm" />
          <main className="w-full md:col-span-2 overflow-hidden shadow-sm">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
