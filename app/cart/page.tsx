"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Package, PackageOpen } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CHECKOUT_PATH, LOGIN_PATH } from "@/lib/constants/path";
import React from "react";
import {
  AddressSelectorProvider,
  DistrictSelector,
  ProvinceSelector,
  useAddressSelector,
  WardSelector,
} from "@/components/shared/address-selector";
import { useAppHeader } from "@/components/shared/app-header";
import { cn } from "@/lib/utils";
import { calculateFee, getServices } from "@/lib/services/ghn-service";
import { GHNService } from "@/lib/models/ghn-service";
import { useAuth } from "@/lib/contexts/auth-context";
import { Cart } from "@/lib/models/cart";
import { getCartByProfileId } from "@/lib/services/cart-service";
import CartItemCard from "@/components/shared/cart-product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatMoney } from "@/lib/helpers/format-money";
import { Product } from "@/lib/models/product";
import { getProductById } from "@/lib/services/product-service";
import { useRouter } from "next/navigation";

function CartEmpty() {
  return (
    <div className="w-full h-fit">
      <div className="w-full max-w-[1400px] px-4 pb-15 m-auto flex flex-col items-center">
        <div className="w-full max-w-sm relative aspect-square object-cover object-center">
          <Image
            src={"/assets/images/decorations/empty-cart.svg"}
            alt="Empty cart"
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

function EstimateShipping() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isFormValid, setIsFormValid] = React.useState<boolean>(false);
  const [shippingFee, setShippingFee] = React.useState<number>(0);
  const [ghnServices, setGhnServices] = React.useState<GHNService[]>([]);

  const { selectedProvince, selectedDistrict, selectedWard } =
    useAddressSelector();

  React.useEffect(() => {
    if (!selectedProvince || !selectedDistrict || !selectedWard) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  }, [selectedProvince, selectedDistrict, selectedWard]);

  React.useEffect(() => {
    if (!isFormValid) return;

    const fetchGhnServices = async () => {
      if (!selectedDistrict) {
        setGhnServices([]);
        return;
      }

      const response = await getServices({
        toDitrictId: selectedDistrict.districtID,
      });

      setGhnServices(response.services);
    };

    fetchGhnServices();
  }, [isFormValid, selectedDistrict]);

  React.useEffect(() => {
    const calculateShippingFee = async () => {
      if (!selectedDistrict || !selectedWard) return;

      const response = await calculateFee({
        data: {
          toDistrictId: selectedDistrict.districtID,
          toWardCode: selectedWard.wardCode.toString(),
          service: ghnServices[0],
        },
      });

      setShippingFee(response.total);
    };

    calculateShippingFee();
  }, [selectedProvince, selectedDistrict, selectedWard, ghnServices]);

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full px-4 bg-background dark:bg-muted/50"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger
          className="lg:text-lg hover:cursor-pointer items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div>
            <div className="flex gap-4 items-center">
              {isOpen ? <PackageOpen /> : <Package />}
              <p className="-leading-2">Ước tính phí vận chuyển</p>
            </div>
          </div>
        </AccordionTrigger>

        <AccordionContent className="space-y-4 mt-4">
          <div className="flex lg:flex-row flex-col items-center gap-4">
            <ProvinceSelector />
            <DistrictSelector />
            <WardSelector />
          </div>

          <div className="mt-6">
            {!isFormValid ? (
              <p className="text-muted-foreground">
                Chọn địa chỉ để xem phí vận chuyển ước tính
              </p>
            ) : (
              <div>
                Phí vận chuyển ước tính đến địa chỉ bạn chọn là:{" "}
                <span className="font-semibold">
                  {Intl.NumberFormat("vi-VN").format(shippingFee) + "₫"}
                </span>
              </div>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function OrderSummary({
  totalProductsPrice,
  totalPrice,

  totalDiscountPrice,
}: {
  totalProductsPrice: string;
  totalPrice: string;
  totalDiscountPrice: string;
}) {
  return (
    <div className="p-4 space-y-4 bg-background dark:bg-muted/50">
      {/* Tổng quan */}
      <div className="space-y-2">
        <p className="font-bold text-lg">Tạm tính</p>
        <div className="flex gap-4 items-baseline justify-between">
          <p className="text-muted-foreground">Tổng tiền hàng</p>
          <span className="font-bold text-muted-foreground">
            {totalProductsPrice}
          </span>
        </div>

        <div className="flex gap-4 items-baseline justify-between">
          <p className="text-muted-foreground">Giảm giá sản phẩm</p>
          <span className="font-bold text-muted-foreground">
            {totalDiscountPrice}
          </span>
        </div>
      </div>

      <Link href={CHECKOUT_PATH}>
        <Button className="w-full p-6 rounded-none uppercase flex items-center justify-between text-lg">
          <p>{totalPrice}</p>
          <p>Thanh toán</p>
        </Button>
      </Link>
    </div>
  );
}

export default function CartPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const { isShowAppHeader } = useAppHeader();

  const [isLoadingCart, setIsLoadingCart] = React.useState<boolean>(true);
  const [cart, setCart] = React.useState<Cart | null>(null);
  const [totalProductsPrice, setTotalProductPrice] = React.useState<number>(0);
  const [totalDiscountPrice, setTotalDiscountPrice] = React.useState<number>(0);

  React.useEffect(() => {
    if (isLoading || !user) return;

    try {
      setIsLoadingCart(true);

      const fetchCart = async () => {
        if (!user || !user.userProfile) return;

        const response = await getCartByProfileId({
          profileId: user.userProfile.profileId,
        });

        setCart(response.cart);
      };

      fetchCart();
    } finally {
      setIsLoadingCart(false);
    }
  }, [isLoading, user]);

  React.useEffect(() => {
    if (!cart) return;

    const fetchProducts = async () => {
      const products: Product[] = [];

      await Promise.all(
        cart.items.map(async (item) => {
          const response = await getProductById({
            productId: item.productId,
          });

          if (response.product) {
            setTotalProductPrice(
              (prev) => prev + response.product!.price * item.quantity
            );

            setTotalDiscountPrice(
              (prev) =>
                prev +
                (response.product!.price -
                  response.product!.getDiscountedPrice()) *
                  item.quantity
            );

            products.push(Product.fromJson(response.product));
          }
        })
      );
    };

    fetchProducts();
  }, [cart]);

  if (isLoadingCart) {
    return (
      <div className="w-full max-w-[1400px] p-4 m-auto grid grid-cols-3 gap-2">
        <div className="col-span-2 space-y-2">
          <Skeleton className="w-full h-20 rounded-none" />
          <Skeleton className="w-full h-20 rounded-none" />
          <Skeleton className="w-full h-20 rounded-none" />
          <Skeleton className="w-full h-20 rounded-none" />
        </div>
        <Skeleton className="w-full full rounded-none" />
      </div>
    );
  }

  if (!cart || cart.items.length === 0) return <CartEmpty />;

  if (!isLoading && !user) router.push(LOGIN_PATH);

  return (
    <div className="w-full h-fit bg-muted dark:bg-background">
      <div className="w-full max-w-[1400px] py-2 m-auto space-y-4">
        <div className="w-full md:grid grid-cols-5 gap-2 max-md:space-y-2">
          <div className="w-full h-fit grid grid-cols-1 gap-2 md:col-span-3">
            {cart.items.map((item, index) => (
              <CartItemCard key={index} cartId={cart.cartId} cartItem={item} />
            ))}
          </div>

          <div
            className={cn(
              "h-fit md:col-span-2 sticky space-y-2 transition-all",
              isShowAppHeader ? "top-30" : "top-4"
            )}
          >
            <AddressSelectorProvider>
              <EstimateShipping />
            </AddressSelectorProvider>
            <OrderSummary
              totalProductsPrice={formatMoney(totalProductsPrice)}
              totalDiscountPrice={`-${formatMoney(totalDiscountPrice)}`}
              totalPrice={formatMoney(cart.totalPrice)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
