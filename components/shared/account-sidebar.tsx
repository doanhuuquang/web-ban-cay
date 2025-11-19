"use client";

import {
  ACCOUNT_ADDRESS_PATH,
  ACCOUNT_ORDERS_PATH,
  ACCOUNT_PATH,
  ACCOUNT_PAYMENT_METHODS_PATH,
} from "@/lib/constants/path";
import { cn } from "@/lib/utils";
import { ChevronRight, CreditCard, MapPin, Truck, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarItems = [
  {
    title: "Thông tin tài khoản",
    url: ACCOUNT_PATH,
    icon: User,
  },
  {
    title: "Thông tin giao hàng",
    url: ACCOUNT_ADDRESS_PATH,
    icon: MapPin,
  },
  {
    title: "Thông tin thanh toán",
    url: ACCOUNT_PAYMENT_METHODS_PATH,
    icon: CreditCard,
  },
  {
    title: "Theo dõi đơn hàng",
    url: ACCOUNT_ORDERS_PATH,
    icon: Truck,
  },
];

function SidebarItem({
  title,
  url,
  icon: Icon,
}: {
  title: string;
  url: string;
  icon: React.ComponentType;
}) {
  const pathName = usePathname();

  return (
    <Link
      href={url}
      className={cn(
        "w-full items-center flex gap-4 hover:bg-muted/50 p-4",
        pathName === url &&
          "bg-primary text-primary-foreground hover:bg-primary/90"
      )}
    >
      <Icon />
      <p>{title}</p>
      <ChevronRight className="ml-auto size-4 opacity-50" />
    </Link>
  );
}

export default function Sidebar({ className }: { className?: string }) {
  return (
    <div className={cn("w-full h-fit overflow-hidden divide-y", className)}>
      {sidebarItems.map((item, index) => {
        return (
          <SidebarItem
            key={index}
            title={item.title}
            url={item.url}
            icon={item.icon}
          />
        );
      })}
    </div>
  );
}
