"use client";

import {
  AdditionalInfoInput,
  AddressSelectorProvider,
  DistrictSelector,
  ProvinceSelector,
  ReciverNameInput,
  ReciverPhoneNumberInput,
  StreetInput,
  useAddressSelector,
  WardSelector,
} from "@/components/shared/address-selector";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ACCOUNT_ADDRESS_PATH,
  CART_PATH,
  CHECKOUT_PATH,
} from "@/lib/constants/path";
import { useAuth } from "@/lib/contexts/auth-context";
import { Address } from "@/lib/models/address";
import { District } from "@/lib/models/district";
import { Province } from "@/lib/models/province";
import { Ward } from "@/lib/models/ward";
import { cn } from "@/lib/utils";
import { ChevronDown, Plus, SlashIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

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
            <Link href={CART_PATH}>Giỏ hàng của tôi</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <SlashIcon />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={CHECKOUT_PATH}>Thanh toán</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function AddressField({
  title,
  isRequired = true,
  children,
}: {
  title: string;
  isRequired?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label>
        {title} {isRequired && <span className="text-red-500">*</span>}
      </Label>
      {children}
    </div>
  );
}

function AddressForm() {
  const router = useRouter();
  const {
    setSelectedProvince,
    setSelectedDistrict,
    setSelectedWard,
    setStreet,
    setFullName,
    setPhone,
    setAdditionalInfo,
    setIsDefault,
    setAddressType,
    setLabel,
    setPostalCode,
  } = useAddressSelector();
  const { user, isLoading, isLoggedIn } = useAuth();
  const [addresses, setAddresses] = React.useState<Address[]>([]);
  const [currentAddressSelected, setCurrentAddressSelected] =
    React.useState<Address | null>(null);

  React.useEffect(() => {
    if (!isLoggedIn || !user) return;

    setAddresses(
      user?.userProfile?.addressResponse.map(Address.fromJson) || []
    );
  }, [isLoggedIn, user]);

  React.useEffect(() => {
    if (addresses.length === 0) return;

    setCurrentAddressSelected(
      addresses.find((address) => address.isDefault) || null
    );
  }, [addresses]);

  React.useEffect(() => {
    if (!currentAddressSelected) return;

    setSelectedProvince(
      new Province(
        currentAddressSelected.provinceID,
        currentAddressSelected.province
      )
    );

    setSelectedDistrict(
      new District(
        currentAddressSelected.districtID,
        currentAddressSelected.provinceID,
        currentAddressSelected.district
      )
    );

    setSelectedWard(
      new Ward(
        currentAddressSelected.wardCode,
        currentAddressSelected.districtID,
        currentAddressSelected.ward
      )
    );

    setStreet(currentAddressSelected.street);
    setFullName(currentAddressSelected.fullName);
    setPhone(currentAddressSelected.phone);
    setAdditionalInfo(currentAddressSelected.additionalInfo);
    setIsDefault(currentAddressSelected.isDefault);
    setAddressType(currentAddressSelected.type);
    setLabel(currentAddressSelected.label);
    setPostalCode(currentAddressSelected.postalCode);
  }, [
    currentAddressSelected,
    setAdditionalInfo,
    setAddressType,
    setFullName,
    setIsDefault,
    setLabel,
    setPhone,
    setPostalCode,
    setSelectedDistrict,
    setSelectedProvince,
    setSelectedWard,
    setStreet,
  ]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-[50px] w-full rounded-none" />
        <Skeleton className="h-[50px] w-full rounded-none" />
        <Skeleton className="h-[50px] w-full rounded-none" />
        <div className="flex gap-4">
          <Skeleton className="h-[50px] w-full rounded-none" />
          <Skeleton className="h-[50px] w-full rounded-none" />
          <Skeleton className="h-[50px] w-full rounded-none" />
        </div>
        <Skeleton className="h-[50px] w-full rounded-none" />
        <Skeleton className="h-[50px] w-full rounded-none" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4">
        <p className="text-lg font-semibold">Thông tin giao hàng</p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size={"icon"} variant={"ghost"} className="rounded-full">
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full max-w-sm" align="end">
            <DropdownMenuLabel>Địa chỉ của bạn</DropdownMenuLabel>
            <DropdownMenuGroup>
              {addresses.map((address) => (
                <DropdownMenuItem
                  key={address.addressId}
                  onClick={() => setCurrentAddressSelected(address)}
                  className={cn(
                    address.addressId === currentAddressSelected?.addressId &&
                      "text-primary"
                  )}
                >
                  {address.label}
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem
                onClick={() => router.push(ACCOUNT_ADDRESS_PATH)}
                className="bg-primary text-primary-foreground hover:bg-primary! hover:text-primary-foreground!"
              >
                Thêm địa chỉ mới
                <Plus className="text-primary-foreground" />
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Địa chỉ nhận hàng */}
      {addresses.length === 0 ? (
        <div>
          <p className="text-sm text-muted-foreground">
            Vui lòng thêm địa chỉ nhận hàng để tiếp tục thanh toán
          </p>
        </div>
      ) : (
        <div className="space-y-7">
          {/* Tên người nhận */}
          <AddressField title="Tên người nhận">
            <ReciverNameInput />
          </AddressField>

          {/* Số điện thoại */}
          <AddressField title="Số điện thoại">
            <ReciverPhoneNumberInput />
          </AddressField>

          <div className="grid md:grid-cols-3 gap-7">
            {/* Tỉnh/Thành phố */}
            <AddressField title="Tỉnh/Thành phố">
              <ProvinceSelector />
            </AddressField>

            {/* Quận/Huyện */}
            <AddressField title="Quận/Huyện">
              <DistrictSelector />
            </AddressField>

            {/* Phường/Xã */}
            <AddressField title="Phường/Xã">
              <WardSelector />
            </AddressField>
          </div>

          {/* Địa chỉ nhà */}
          <AddressField title="Địa chỉ nhà">
            <StreetInput />
          </AddressField>

          {/* Thông tin bổ sung */}
          <AddressField isRequired={false} title="Thông tin bổ sung">
            <AdditionalInfoInput />
          </AddressField>
        </div>
      )}
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <div className="w-full h-fit">
      <div className="w-full max-w-[1400px] p-4 m-auto space-y-10">
        <BreadcrumbWithCustomSeparator />

        <div className="w-full md:grid grid-cols-2 gap-4">
          {/* Thông tin giao hàng */}
          <AddressSelectorProvider>
            <AddressForm />
          </AddressSelectorProvider>
        </div>
      </div>
    </div>
  );
}
