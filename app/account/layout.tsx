"use client";

import AccountSidebar from "@/components/shared/account-sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { LOGIN_PATH } from "@/lib/constants/path";
import { useAuth } from "@/lib/contexts/auth-context";
import { getOrdersByProfileId } from "@/lib/services/order-service";
import { ShoppingBag, Wallet } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

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
  const { isLoading, isLoggedIn, user } = useAuth();

  const [orderCount, setOrderCount] = React.useState<number>(0);
  const [totalSpent, setTotalSpent] = React.useState<number>(0);

  React.useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      const response = await getOrdersByProfileId({
        profileId: user.userProfile!.profileId,
      });

      setOrderCount(response.orders.length);

      response.orders.map((order) => {
        setTotalSpent((prev) => prev + order.totalAmount);
      });
    };

    fetchOrders();
  }, [user]);

  if (isLoading) {
    return (
      <div className="w-full max-w-[1400px] m-auto h-full space-y-2 p-4">
        <Skeleton className="w-full h-25 rounded-none" />

        <div className="flex gap-2">
          <Skeleton className="w-1/3 h-60 rounded-none" />
          <Skeleton className="w-2/3 h-60 rounded-none" />
        </div>
      </div>
    );
  }

  if (!isLoggedIn) return <NotLoggedInYet />;

  return (
    <div className="w-full h-fit bg-accent dark:bg-background">
      <div className="w-full max-w-[1400px] m-auto py-2 space-y-2">
        <div className="w-full overflow-hidden px-4 py-6 grid md:grid-cols-3 grid-cols-1 gap-6 bg-background dark:bg-accent/50 z-50">
          <div className="flex items-center gap-4">
            <Avatar className="size-15">
              <AvatarImage
                src={
                  user?.userProfile?.gender
                    ? "/assets/images/user-avatars/male-avatar.svg"
                    : "/assets/images/user-avatars/female-avatar.svg"
                }
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div>
              <p className="font-bold text-lg">
                {user?.userProfile?.username || "Chưa cập nhật"}
              </p>
              <p className="text-sm text-muted-foreground">
                {user?.email || "Chưa cập nhật"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-blue-ocean size-15 flex items-center justify-center rounded-full">
              <ShoppingBag className="text-primary-foreground" />
            </div>

            <div>
              <p className="font-bold text-lg">{orderCount}</p>
              <p className="text-sm text-muted-foreground">
                Tổng số đơn hàng đã mua
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-blue-ocean size-15 flex items-center justify-center rounded-full">
              <Wallet className="text-primary-foreground" />
            </div>

            <div>
              <p className="font-bold text-lg">
                {Intl.NumberFormat("vi-VN").format(totalSpent) + "₫"}
              </p>
              <p className="text-sm text-muted-foreground">
                Tổng tiền tích lũy
              </p>
            </div>
          </div>
        </div>

        <div className="w-full grid md:grid-cols-4 grid-cols-1 gap-2">
          <AccountSidebar className="h-full md:col-span-1 bg-background dark:bg-accent/50" />
          <main className="w-full h-full md:col-span-3 overflow-hidden">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
