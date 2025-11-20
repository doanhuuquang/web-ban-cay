import CartProductCard from "@/components/shared/cart-product-card";
import { Button } from "@/components/ui/button";
import { productItemsSample } from "@/lib/constants/product-items";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, House, SlashIcon, User } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CHECKOUT_PATH } from "@/lib/constants/path";

export function BreadcrumbWithCustomSeparator() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Trang chủ</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <SlashIcon />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/cart">Giỏ hàng của tôi</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function CartEmpty() {
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
          <p className="text-xl font-bold mb-2">
            Căn phòng nhìn thật trống trải và bình yên
          </p>

          <p className="text-sm text-muted-foreground">
            Thêm một vài cây xanh vào giỏ hàng của bạn để làm cho không gian
            sống của bạn trở nên sinh động hơn!
          </p>
        </div>

        <Link href={"/"} className="mt-6">
          <Button>Tiếp tục mua sắm</Button>
        </Link>
      </div>
    </div>
  );
}

function ChooseVoucher() {
  return (
    <div className="w-full bg-orange-500/10 p-4 border-l-5 border-orange-500">
      <div className="w-full flex items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="font-bold">Mã giảm giá</p>
          <p className="text-sm text-muted-foreground">
            Giảm 20% tối đa 20.000đ
          </p>
        </div>

        <Button variant={"ghost"} size={"icon"} className="rounded-full">
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}

function ChooseDeliveryVoucher() {
  return (
    <div className="w-full bg-orange-500/10 p-4 border-l-5 border-orange-500">
      <div className="w-full flex items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="font-bold">Mã giảm giá vận chuyển</p>
          <p className="text-sm text-muted-foreground">
            Giảm 10.000đ cho đơn tối thiểu 0đ
          </p>
        </div>

        <Button variant={"ghost"} size={"icon"} className="rounded-full">
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}

function DeliveryInfo() {
  return (
    <div className="p-4 space-y-4 bg-blue-ocean/10">
      {/* Địa chỉ */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-start gap-2">
          <House size={18} />
          <div>
            <p className="font-bold">Địa chỉ giao hàng</p>
            <p className="text-xs text-muted-foreground">
              75 Nguyễn Thị Minh Khai, Phường 6, Quận 3, TP.HCM
            </p>
          </div>
        </div>

        <ChevronRight size={20} />
      </div>

      <div className="w-full h-[0.2px] bg-muted-foreground/20"></div>

      {/* Thông tin người nhận */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-start gap-2">
          <User size={18} />
          <div>
            <p className="font-bold">Thông tin người nhận</p>
            <p className="text-xs text-muted-foreground">
              75 Nguyễn Thị Minh Khai, Phường 6, Quận 3, TP.HCM
            </p>
          </div>
        </div>

        <ChevronRight size={20} />
      </div>
    </div>
  );
}

function OrderSummary() {
  return (
    <div className="p-4 space-y-4 bg-primary/10">
      {/* Tổng quan */}
      <div className="space-y-2">
        <div className="bg-primary/20 text-primary p-4 text-sm mb-5">
          Đơn giá bên dưới đã bao gồm thuế VAT
        </div>

        <p className="font-bold">Tổng quan đơn hàng</p>
        <div className="flex gap-4 items-baseline justify-between">
          <p className="text-xs text-muted-foreground">Tổng tiền hàng</p>
          <span className="font-bold text-sm text-muted-foreground">
            1.200.000₫
          </span>
        </div>

        <div className="flex gap-4 items-baseline justify-between">
          <p className="text-xs text-muted-foreground">Phí vận chuyển</p>
          <span className="font-bold text-sm text-muted-foreground">
            20.000₫
          </span>
        </div>

        <div className="flex gap-4 items-baseline justify-between">
          <p className="text-xs text-muted-foreground">Giảm giá sản phẩm</p>
          <span className="font-bold text-sm text-muted-foreground">
            200.000₫
          </span>
        </div>

        <div className="flex gap-4 items-baseline justify-between">
          <p className="text-xs text-muted-foreground">Giảm giá vận chuyển</p>
          <span className="font-bold text-sm text-muted-foreground">
            20.000₫
          </span>
        </div>
      </div>

      <div className="w-full h-[0.2px] bg-muted-foreground/20"></div>

      {/* Tổng tiền */}
      <div className="flex gap-4 items-baseline justify-between">
        <p className="text-xs text-muted-foreground">Tổng tiền thanh toán</p>
        <span className="font-bold">1.000.000₫</span>
      </div>

      <Link href={CHECKOUT_PATH}>
        <Button className="w-full p-6 text-lg">Đặt hàng</Button>
      </Link>
    </div>
  );
}

export default function CartPage() {
  if (false) return <CartEmpty />;

  return (
    <div className="w-full h-fit">
      <div className="w-full max-w-[1400px] p-4 m-auto space-y-4">
        <div className="space-y-1">
          <p className="text-lg font-bold">Giỏ hàng của tôi</p>

          <BreadcrumbWithCustomSeparator />
        </div>

        <div className="w-full md:grid grid-cols-5 gap-4 space-y-4">
          <div className="w-full space-y-4 md:col-span-3">
            {productItemsSample.map((product, index) => (
              <CartProductCard key={index} product={product} />
            ))}
          </div>

          <div className="h-fit space-y-3 md:col-span-2">
            <ChooseVoucher />
            <ChooseDeliveryVoucher />
            <DeliveryInfo />
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
