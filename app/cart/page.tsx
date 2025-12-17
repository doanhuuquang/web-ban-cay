"use client";

import CartProductCard from "@/components/shared/cart-product-card";
import { Button } from "@/components/ui/button";
import { productItemsSample } from "@/lib/constants/product-items";
import Image from "next/image";
import Link from "next/link";
import { Package, PackageOpen, SlashIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CHECKOUT_PATH } from "@/lib/constants/path";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

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

function EstimateShipping() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isFormValid, setIsFormValid] = React.useState<boolean>(false);
  const [shippingFee, setShippingFee] = React.useState<number>(0);
  const [ghnServices, setGhnServices] = React.useState<GHNService[]>([]);
  const [selectedService, setSelectedService] =
    React.useState<GHNService | null>(null);

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
        setSelectedService(null);
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
    if (selectedService === null) return;

    const calculateShippingFee = async () => {
      if (!selectedDistrict || !selectedWard) return;

      const response = await calculateFee({
        data: {
          toDistrictId: selectedDistrict.districtID,
          toWardCode: selectedWard.wardCode.toString(),
          height: 100,
          length: 50,
          width: 50,
          weight: 1000,
          service: selectedService,
        },
      });

      setShippingFee(response.total);
    };

    calculateShippingFee();
  }, [selectedService, selectedProvince, selectedDistrict, selectedWard]);

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full border px-4 bg-background dark:bg-muted/50"
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

          {isFormValid && (
            <RadioGroup
              defaultValue=""
              onValueChange={(value) =>
                setSelectedService(
                  ghnServices.find((service) => service.serviceId === value)!
                )
              }
              className="flex items-center gap-5"
            >
              {ghnServices.map((service, index) => (
                <div key={index} className="flex items-center gap-3">
                  <RadioGroupItem
                    value={service.serviceId}
                    id={service.serviceId}
                  />
                  <Label htmlFor={service.serviceId}>{service.shortName}</Label>
                </div>
              ))}
            </RadioGroup>
          )}

          <div className="mt-6">
            {!selectedService ? (
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

function OrderSummary() {
  return (
    <div className="p-4 space-y-4 bg-background dark:bg-muted/50 border">
      {/* Tổng quan */}
      <div className="space-y-2">
        <p className="font-bold text-lg">Tạm tính</p>
        <div className="flex gap-4 items-baseline justify-between">
          <p className="text-muted-foreground">Tổng tiền hàng</p>
          <span className="font-bold text-muted-foreground">1.400.000₫</span>
        </div>

        <div className="flex gap-4 items-baseline justify-between">
          <p className="text-muted-foreground">Voucher sản phẩm</p>
          <span className="font-bold text-muted-foreground">-200.000₫</span>
        </div>
      </div>

      <Link href={CHECKOUT_PATH}>
        <Button className="w-full p-6 rounded-none uppercase flex items-center justify-between text-lg">
          <p>1.200.000₫</p>
          <p>Thanh toán</p>
        </Button>
      </Link>
    </div>
  );
}

export default function CartPage() {
  const { isShowAppHeader } = useAppHeader();

  if (false) return <CartEmpty />;

  return (
    <div className="w-full h-fit bg-background">
      <div className="w-full max-w-[1400px] p-4 m-auto space-y-4">
        <BreadcrumbWithCustomSeparator />

        <div className="w-full md:grid grid-cols-5 gap-4 max-md:space-y-4">
          <div className="w-full grid grid-cols-1 gap-4 md:col-span-3">
            {productItemsSample.map((product, index) => (
              <CartProductCard key={index} product={product} />
            ))}
          </div>

          <div
            className={cn(
              "h-fit md:col-span-2 sticky space-y-4 transition-all",
              isShowAppHeader ? "top-30" : "top-4"
            )}
          >
            <AddressSelectorProvider>
              <EstimateShipping />
            </AddressSelectorProvider>
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
