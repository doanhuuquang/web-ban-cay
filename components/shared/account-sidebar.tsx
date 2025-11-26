"use client";

import {
  ACCOUNT_ADDRESS_PATH,
  ACCOUNT_ORDERS_PATH,
  ACCOUNT_PATH,
  ACCOUNT_PAYMENT_METHODS_PATH,
} from "@/lib/constants/path";
import { cn } from "@/lib/utils";
import {
  ChevronRight,
  CreditCard,
  LogOut,
  MapPin,
  Truck,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/services/auth-service";
import { toast } from "sonner";
import {
  DEFAULT_ERROR_MESSAGE,
  ERROR_MESSAGES,
} from "@/lib/constants/error-messages";
import { LOGOUT_SUCCESS_MESSAGE } from "@/lib/constants/success-messages";
import { useAuth } from "@/lib/contexts/auth-context";
import { API_SUCCESS_CODE } from "@/lib/constants/api-success-code";

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

export default function AccountSidebar({ className }: { className?: string }) {
  const { setIsLoggedIn } = useAuth();

  const handleLogout = async () => {
    const code = await logout();

    if (code === API_SUCCESS_CODE.LOGOUT_SUCCESS) setIsLoggedIn(false);

    toast(
      code !== API_SUCCESS_CODE.LOGOUT_SUCCESS ? "Thất bại" : "Thành công",
      {
        description:
          code !== API_SUCCESS_CODE.LOGOUT_SUCCESS
            ? ERROR_MESSAGES[code]
              ? ERROR_MESSAGES[code]
              : DEFAULT_ERROR_MESSAGE
            : LOGOUT_SUCCESS_MESSAGE,
        action: {
          label: "Oke",
          onClick: () => {},
        },
      }
    );
  };

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

      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button className="w-full items-center flex gap-4 bg-transparent text-foreground hover:bg-muted/50 px-4! h-[56.8px]!">
              <LogOut className="size-6" />
              <p className="text-[16px] font-normal">Đăng xuất</p>
              <ChevronRight className="ml-auto size-4 opacity-50" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] rounded-none!">
            <DialogHeader>
              <DialogTitle>Xác nhận</DialogTitle>
              <DialogDescription>
                Bạn có chắc chắn muốn đăng xuất khỏi tài khoản không?
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Hủy</Button>
              </DialogClose>
              <Button onClick={() => handleLogout()}>Đăng xuất</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}
