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
import CheckoutProductCard from "@/components/shared/checkout-product-card";
import CouponCard from "@/components/shared/coupon-card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ACCOUNT_ADDRESS_PATH,
  ORDER_COMFIRMED_PATH,
} from "@/lib/constants/path";
import { useAuth } from "@/lib/contexts/auth-context";
import { Address } from "@/lib/models/address";
import { Cart } from "@/lib/models/cart";
import { Coupon } from "@/lib/models/coupon";
import { District } from "@/lib/models/district";
import { Product } from "@/lib/models/product";
import { Province } from "@/lib/models/province";
import { Ward } from "@/lib/models/ward";
import { getCartByProfileId } from "@/lib/services/cart-service";
import { getAvailableCoupons } from "@/lib/services/coupon-service";
import { getProductById } from "@/lib/services/product-service";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ChevronRight,
  LoaderCircle,
  NotebookPen,
  Plus,
  TicketPercent,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PaymenMethodTypeLabel } from "@/lib/type/payment-method";
import { formatMoney } from "@/lib/helpers/format-money";
import { calculateFee, getServices } from "@/lib/services/ghn-service";
import { GHNService } from "@/lib/models/ghn-service";
import { placeOrderFromCart } from "@/lib/services/order-service";
import { API_SUCCESS_CODE } from "@/lib/constants/api-success-code";
import {
  DEFAULT_ERROR_MESSAGE,
  ERROR_MESSAGES,
} from "@/lib/constants/error-messages";
import { PLACE_ORDER_SUCCESS_MESSAGE } from "@/lib/constants/success-messages";
import { set } from "date-fns";

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

function AddressForm({
  addresses,
  currentAddressSelected,
  setCurrentAddressSelected,
}: {
  addresses: Address[];
  currentAddressSelected: Address | null;
  setCurrentAddressSelected: (address: Address) => void;
}) {
  const router = useRouter();
  const { isLoading } = useAuth();
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
        <p className="text-xl font-semibold">Thông tin giao hàng</p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size={"icon"} variant={"outline"} className="rounded-full">
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
                <Plus className="text-primary-foreground" />
                Thêm địa chỉ mới
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
            <ReciverNameInput isDisabled={true} />
          </AddressField>

          {/* Số điện thoại */}
          <AddressField title="Số điện thoại">
            <ReciverPhoneNumberInput isDisabled={true} />
          </AddressField>

          <div className="grid md:grid-cols-3 gap-4">
            {/* Tỉnh/Thành phố */}
            <AddressField title="Tỉnh/Thành phố">
              <ProvinceSelector isDisabled={true} />
            </AddressField>

            {/* Quận/Huyện */}
            <AddressField title="Quận/Huyện">
              <DistrictSelector isDisabled={true} />
            </AddressField>

            {/* Phường/Xã */}
            <AddressField title="Phường/Xã">
              <WardSelector isDisabled={true} />
            </AddressField>
          </div>

          {/* Địa chỉ nhà */}
          <AddressField title="Địa chỉ nhà">
            <StreetInput isDisabled={true} />
          </AddressField>

          {/* Thông tin bổ sung */}
          <AddressField isRequired={false} title="Thông tin bổ sung">
            <AdditionalInfoInput isDisabled={true} />
          </AddressField>
        </div>
      )}
    </div>
  );
}

function CheckoutSummary({
  selectedAddress,
}: {
  selectedAddress: Address | null;
}) {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const { selectedProvince, selectedDistrict, selectedWard } =
    useAddressSelector();

  const [isLoadingCart, setIsLoadingCart] = React.useState<boolean>(true);
  const [isOrderPlacing, setIsOrderPlacing] = React.useState<boolean>(false);
  const [cart, setCart] = React.useState<Cart | null>(null);
  const [ghnServices, setGhnServices] = React.useState<GHNService[]>([]);
  const [coupons, setCoupons] = React.useState<Coupon[]>([]);
  const [selectedCoupon, setSelectedCoupon] = React.useState<Coupon | null>(
    null
  );
  const [note, setNote] = React.useState<string>("");
  const [isShowCouponSheet, setIsShowCouponSheet] =
    React.useState<boolean>(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    React.useState<string>("CASH");
  const [totalProductPrice, setTotalProductPrice] = React.useState<number>(0);
  const [totalDiscountProductPrice, setTotalDiscountProductPrice] =
    React.useState<number>(0);
  const [totalShippingFee, setTotalShippingFee] = React.useState<number>(0);
  const [couponDiscount, setCouponDiscount] = React.useState<number>(0);
  const [totalPrice, setTotalPrice] = React.useState<number>(0);

  // Fetch cart
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

  // Fetch available coupons
  React.useEffect(() => {
    if (!cart) return;

    const fetchCoupons = async () => {
      const response = await getAvailableCoupons({
        orderTotal: cart.totalPrice,
      });

      if (response.coupons) setCoupons(response.coupons);
    };

    fetchCoupons();
  }, [cart]);

  // Calculate total product discount and products price
  React.useEffect(() => {
    if (!cart) return;

    const caculatePrices = async () => {
      setTotalProductPrice(0);
      setTotalDiscountProductPrice(0);

      const products: Product[] = [];

      await Promise.all(
        cart.items.map(async (item) => {
          const response = await getProductById({
            productId: item.productId,
          });

          if (response.product) {
            products.push(Product.fromJson(response.product));

            setTotalProductPrice(
              (prev) => prev + response.product!.price * item.quantity
            );
            setTotalDiscountProductPrice(
              (prev) =>
                prev +
                (response.product!.price -
                  response.product!.getDiscountedPrice()) *
                  item.quantity
            );
          }
        })
      );
    };

    caculatePrices();
  }, [cart]);

  // Fetch GHN services
  React.useEffect(() => {
    const fetchGhnServices = async () => {
      if (!selectedProvince || !selectedDistrict || !selectedWard) {
        setGhnServices([]);
        return;
      }

      const response = await getServices({
        toDitrictId: selectedDistrict.districtID,
      });

      setGhnServices(response.services);
    };

    fetchGhnServices();
  }, [selectedProvince, selectedDistrict, selectedWard]);

  // Calculate shipping fee
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

      setTotalShippingFee(response.total);
    };

    calculateShippingFee();
  }, [selectedProvince, selectedDistrict, selectedWard, ghnServices]);

  // Calculate total price
  React.useEffect(() => {
    const base =
      totalProductPrice + totalShippingFee - totalDiscountProductPrice;

    let computedCoupon = 0;

    if (selectedCoupon) {
      if (selectedCoupon.discountType === "FIXED_AMOUNT") {
        computedCoupon = selectedCoupon.discountAmount;
      } else {
        computedCoupon = (base * selectedCoupon.discountPercent) / 100;
      }
    }

    if (
      selectedCoupon &&
      selectedCoupon.discountType === "PERCENTAGE" &&
      computedCoupon > selectedCoupon.maxDiscountAmount
    ) {
      computedCoupon = selectedCoupon.maxDiscountAmount;
    }

    const final = Math.max(base - computedCoupon, 0);

    setCouponDiscount(computedCoupon);
    setTotalPrice(final);
  }, [
    totalProductPrice,
    totalShippingFee,
    totalDiscountProductPrice,
    selectedCoupon,
  ]);

  const handleSelectCoupon = (coupon: Coupon) => {
    if (selectedCoupon === coupon) {
      setSelectedCoupon(null);
      return;
    }

    setSelectedCoupon(coupon);

    toast("Thành công", {
      description: "Áp dụng mã giảm giá thành công vào đơn hàng của bạn.",
      action: {
        label: "Oke",
        onClick: () => {},
      },
    });
  };

  const handlePlaceOrderFromCart = async () => {
    if (!user || !user.userProfile) return;
    if (!selectedAddress) return;

    try {
      setIsOrderPlacing(true);

      const response = await placeOrderFromCart({
        profileId: user.userProfile.profileId,
        addressId: selectedAddress.addressId,
        paymentMethod: selectedPaymentMethod,
        bankCode: "",
        shippingFee: totalShippingFee,
        couponCode: selectedCoupon ? selectedCoupon.code : "",
        orderNote: note,
      });

      toast(
        response.code !== API_SUCCESS_CODE.PLACE_ORDER_SUCCESS
          ? "Thất bại"
          : "Thành công",
        {
          description:
            response.code !== API_SUCCESS_CODE.PLACE_ORDER_SUCCESS
              ? ERROR_MESSAGES[response.code]
                ? ERROR_MESSAGES[response.code]
                : DEFAULT_ERROR_MESSAGE
              : PLACE_ORDER_SUCCESS_MESSAGE,
          action: {
            label: "Oke",
            onClick: () => {},
          },
        }
      );

      router.push(`${ORDER_COMFIRMED_PATH}/${response.order?.orderId}`);
    } finally {
      setIsOrderPlacing(false);
    }
  };

  if (isLoadingCart) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-20 w-full rounded-none" />
        <Skeleton className="h-20 w-full rounded-none" />
        <Skeleton className="h-20 w-full rounded-none" />
        <div className="flex gap-4">
          <Skeleton className="h-20 w-full rounded-none" />
          <Skeleton className="h-20 w-full rounded-none" />
        </div>
        <Skeleton className="h-20 w-full rounded-none" />
      </div>
    );
  }

  return (
    <>
      <div className="space-y-7">
        <p className="text-xl font-semibold">Tổng quan đơn hàng</p>

        {cart?.items.map((item, index) => (
          <CheckoutProductCard key={index} cartItem={item} />
        ))}

        {/* Coupon selector */}
        <InputGroup className="rounded-none py-6">
          <InputGroupInput
            disabled={true}
            placeholder="Mã giảm giá"
            defaultValue={selectedCoupon?.code || ""}
          />
          <InputGroupAddon>
            <TicketPercent className="size-5" />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <Button
              variant={"ghost"}
              onClick={() => setIsShowCouponSheet(true)}
            >
              {coupons.length} mã có sẵn <ChevronRight />
            </Button>
          </InputGroupAddon>
        </InputGroup>

        {/* Payment method selector */}
        <RadioGroup
          defaultValue="comfortable"
          className="w-full flex flex-wrap gap-4"
        >
          {Object.entries(PaymenMethodTypeLabel).map(([key, label], index) => (
            <div
              key={index}
              className="grow flex items-center gap-3 border p-4"
            >
              <RadioGroupItem
                defaultChecked={selectedPaymentMethod === key}
                checked={selectedPaymentMethod === key}
                onClick={() => setSelectedPaymentMethod(key)}
                value={key}
                id={key}
              />
              <Label htmlFor={key}>{label}</Label>
            </div>
          ))}
        </RadioGroup>

        {/* Order note */}
        <InputGroup className="rounded-none py-6">
          <InputGroupInput
            placeholder="Ghi chú đơn hàng"
            onChange={(e) => setNote(e.target.value)}
          />
          <InputGroupAddon>
            <NotebookPen className="size-5" />
          </InputGroupAddon>
        </InputGroup>

        {/* Order summary */}
        <div className="space-y-4 bg-background dark:bg-muted/50">
          {/* Tổng quan */}
          <div className="space-y-2">
            <div className="flex gap-4 items-baseline justify-between">
              <p className="text-muted-foreground">Tổng tiền hàng</p>
              <span className="font-bold text-muted-foreground">
                {formatMoney(totalProductPrice)}
              </span>
            </div>

            {selectedDistrict && selectedWard && totalShippingFee && (
              <div className="flex gap-4 items-baseline justify-between">
                <p className="text-muted-foreground">Tổng phí vận chuyển</p>
                <span className="font-bold text-muted-foreground">
                  {formatMoney(totalShippingFee)}
                </span>
              </div>
            )}

            <div className="flex gap-4 items-baseline justify-between">
              <p className="text-muted-foreground">Giảm giá sản phẩm</p>
              <span className="font-bold text-muted-foreground">
                -{formatMoney(totalDiscountProductPrice)}
              </span>
            </div>

            {couponDiscount > 0 && (
              <div className="flex gap-4 items-baseline justify-between">
                <p className="text-muted-foreground">Mã giảm giá</p>
                <span className="font-bold text-muted-foreground">
                  -{formatMoney(couponDiscount)}
                </span>
              </div>
            )}
          </div>

          <Button
            disabled={isOrderPlacing}
            onClick={() => handlePlaceOrderFromCart()}
            className="w-full p-6 rounded-none uppercase flex items-center justify-between text-lg"
          >
            {isOrderPlacing ? (
              <>
                <p>Đang xử lý...</p>
                <LoaderCircle className="animate-spin size-6" />
              </>
            ) : (
              <>
                <p>{formatMoney(totalPrice)}</p>
                <p>Thanh toán</p>
              </>
            )}
          </Button>
        </div>
      </div>

      <Sheet
        open={isShowCouponSheet}
        onOpenChange={() => setIsShowCouponSheet(false)}
      >
        <SheetContent isShowXButton={false}>
          <SheetHeader>
            <SheetTitle>Mã giảm giá</SheetTitle>
            <SheetDescription>
              Chọn mã giảm giá để áp dụng vào đơn hàng.
            </SheetDescription>
          </SheetHeader>

          <div className="px-4 space-y-4">
            {coupons.map((coupon, index) => (
              <CouponCard
                key={index}
                coupon={coupon}
                isSelected={selectedCoupon === coupon}
                onClick={() => handleSelectCoupon(coupon)}
              />
            ))}
          </div>

          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline">Xong</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const { user, isLoggedIn } = useAuth();
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

  if (user && user.userProfile?.cartResponse.items.length === 0) {
    router.back();
    return;
  }

  return (
    <AddressSelectorProvider>
      <div className="w-full h-fit bg-muted dark:bg-background">
        <div className="w-full max-w-[1400px] py-2 m-auto">
          <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-2 max-md:space-y-2">
            {/* Thông tin giao hàng */}
            <div className="w-full h-full bg-background dark:bg-muted/50 p-4 md:order-1 order-2">
              <AddressForm
                addresses={addresses}
                currentAddressSelected={currentAddressSelected}
                setCurrentAddressSelected={setCurrentAddressSelected}
              />
            </div>

            <div className="w-full h-full bg-background dark:bg-muted/50 p-4 md:order-2 order-1">
              <CheckoutSummary selectedAddress={currentAddressSelected} />
            </div>
          </div>
        </div>
      </div>
    </AddressSelectorProvider>
  );
}
