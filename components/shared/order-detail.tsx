"use client";

import { AppLoadingIcon } from "@/components/shared/app-loading";
import {
  OrderProgress,
  OrderProgressStep,
} from "@/components/shared/order-progress";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { API_SUCCESS_CODE } from "@/lib/constants/api-success-code";
import {
  DEFAULT_ERROR_MESSAGE,
  ERROR_MESSAGES,
} from "@/lib/constants/error-messages";
import {
  CANCEL_ORDER_SUCCESS_MESSAGE,
  UPDATE_ADDRESS_SUCCESS_MESSAGE,
} from "@/lib/constants/success-messages";
import { formatMoney } from "@/lib/helpers/format-money";
import { Address } from "@/lib/models/address";
import { DeliveryAddress } from "@/lib/models/delivery-address";
import { Order } from "@/lib/models/order";
import { Product } from "@/lib/models/product";
import {
  getAddressByUserProfileId,
  getDeliveryAddressByOrderId,
} from "@/lib/services/address-service";
import {
  cancelOrder,
  getOrderById,
  updateOrderAddress,
} from "@/lib/services/order-service";
import { getProductById } from "@/lib/services/product-service";
import { OrderStatusTypeLabel } from "@/lib/type/order-status";
import { format } from "date-fns";
import {
  ArrowLeft,
  Download,
  LoaderCircle,
  Truck,
  WalletCards,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

export default function OrderDetail({ orderId }: { orderId: string }) {
  const [isLoadingOrder, setIsLoadingOrder] = React.useState<boolean>(true);
  const [isUpdatingAddress, setIsUpdatingAddress] =
    React.useState<boolean>(false);
  const [isCancelingOrder, setIsCancelingOrder] =
    React.useState<boolean>(false);
  const [order, setOrder] = React.useState<Order | null>(null);
  const [deliveryAddress, setDeliveryAddress] =
    React.useState<DeliveryAddress | null>(null);
  const [addresses, setAddresses] = React.useState<Address[]>([]);
  const [orderItems, setOrderItems] = React.useState<
    { product: Product; quantity: number }[]
  >([]);
  const [selectedAddressId, setSelectedAddressId] = React.useState<string>("");
  const [totalProductsPrice, setTotalProductsPrice] = React.useState<number>(0);
  const [totalProductDiscountPrice, setTotalProductDiscountPrice] =
    React.useState<number>(0);
  const [isShowChangeAddressDialog, setIsShowChangeAddressDialog] =
    React.useState<boolean>(false);
  const [isShowCancelOrderDialog, setIsShowCancelOrderDialog] =
    React.useState<boolean>(false);

  const orderSteps: OrderProgressStep[] = [];

  Object.entries(OrderStatusTypeLabel).map(([value, label]) => {
    if (
      label !== OrderStatusTypeLabel.CANCELLED &&
      label !== OrderStatusTypeLabel.RETURNED
    ) {
      orderSteps.push({
        id: value,
        title: label,
      });
    }
  });

  React.useEffect(() => {
    if (!orderId) return;

    try {
      setIsLoadingOrder(true);

      const fetchOrder = async () => {
        const response = await getOrderById({ orderId: orderId });

        if (response.order) setOrder(response.order);
      };

      fetchOrder();
    } finally {
      setIsLoadingOrder(false);
    }
  }, [orderId]);

  React.useEffect(() => {
    if (!order) return;

    const fetchDeliveryAddress = async () => {
      const response = await getDeliveryAddressByOrderId({
        orderId: order.orderId,
      });

      if (response.address) setDeliveryAddress(response.address);
    };

    fetchDeliveryAddress();
  }, [order]);

  React.useEffect(() => {
    if (!order) return;

    const orderItems: { product: Product; quantity: number }[] = [];

    const calculatePrices = async () => {
      await Promise.all(
        order.orderItemResponses.map(async (item) => {
          const response = await getProductById({ productId: item.productId });

          if (response.product) {
            orderItems.push({
              product: response.product,
              quantity: item.quantity,
            });

            setTotalProductsPrice(
              (prev) => prev + response.product!.price * item.quantity
            );
            setTotalProductDiscountPrice(
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

    calculatePrices();
    setOrderItems(orderItems);
  }, [order]);

  React.useEffect(() => {
    if (!order) return;

    const fetchDeliveryAddresses = async () => {
      const response = await getAddressByUserProfileId({
        userProfileId: order.profileId,
      });

      if (response.addresses) setAddresses(response.addresses);
    };

    fetchDeliveryAddresses();
  }, [order]);

  const handleUpdateDeliveryAddress = async () => {
    if (!order || !selectedAddressId) return;
    try {
      setIsUpdatingAddress(true);
      const code = await updateOrderAddress({
        orderId: order.orderId,
        addressId: selectedAddressId,
      });
      if (code === API_SUCCESS_CODE.UPDATE_ORDER_ADDRESS_SUCCESS) {
        setIsShowChangeAddressDialog(false);
      }

      toast(
        code !== API_SUCCESS_CODE.UPDATE_ORDER_ADDRESS_SUCCESS
          ? "Thất bại"
          : "Thành công",
        {
          description:
            code !== API_SUCCESS_CODE.LOGIN_SUCCESS
              ? ERROR_MESSAGES[code]
                ? ERROR_MESSAGES[code]
                : DEFAULT_ERROR_MESSAGE
              : UPDATE_ADDRESS_SUCCESS_MESSAGE,
          action: {
            label: "Oke",
            onClick: () => {},
          },
        }
      );
    } finally {
      setIsUpdatingAddress(false);
    }
  };

  const handleCancelOrder = async () => {
    if (!order) return;

    try {
      setIsCancelingOrder(true);

      const code = await cancelOrder({
        orderId: order.orderId,
      });

      if (code === API_SUCCESS_CODE.CANCEL_ORDER_ADDRESS_SUCCESS) {
        setIsShowCancelOrderDialog(false);
      }

      toast(
        code !== API_SUCCESS_CODE.CANCEL_ORDER_ADDRESS_SUCCESS
          ? "Thất bại"
          : "Thành công",
        {
          description:
            code !== API_SUCCESS_CODE.CANCEL_ORDER_ADDRESS_SUCCESS
              ? ERROR_MESSAGES[code]
                ? ERROR_MESSAGES[code]
                : DEFAULT_ERROR_MESSAGE
              : CANCEL_ORDER_SUCCESS_MESSAGE,
          action: {
            label: "Oke",
            onClick: () => {},
          },
        }
      );
    } finally {
      setIsCancelingOrder(false);
    }
  };

  if (isLoadingOrder) {
    return (
      <div className="w-full min-h-[50vh] flex items-center justify-center">
        <AppLoadingIcon title="Sắp xong rồi!" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="w-full max-w-[1400px] m-auto p-4 bg-background">
        <div className="col-span-2 flex flex-col items-center justify-center gap-2 text-center">
          <div className="w-3xs aspect-square relative">
            <Image
              src={"/assets/images/decorations/woman-thinking.svg"}
              alt="Opps!"
              fill
              className="absolute top-0 left-0 object-center"
            />
          </div>
          <p className="text-2xl font-bold">Nooooooo, Chuyện gì xảy ra vậy!</p>
          <p className="text-muted-foreground">
            Có vẻ như bạn đang đi sai hướng, thử lại xem sao nhé
          </p>
          <Link href={"/"}>
            <Button className="mt-4">
              <ArrowLeft />
              Quay lại trang chủ
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full max-w-[1400px] h-fit md:grid grid-cols-3 gap-2 mx-auto max-md:space-y-2">
        {/* Order progress */}
        <div className="w-full col-span-2 flex flex-col items-center gap-2 text-center">
          <div className="w-full h-full px-4 pb-10 pt-5 flex flex-col items-center justify-center gap-10 bg-background dark:bg-muted/50">
            <div className="w-52 aspect-square relative">
              <Image
                src={"/assets/images/decorations/track-your-order.svg"}
                alt="Opps!"
                fill
                className="absolute top-0 left-0 object-center"
              />
            </div>

            <div className="space-y-2">
              <p className="uppercase text-2xl font-semibold">
                {(() => {
                  switch (order.orderStatus) {
                    case "PENDING":
                      return "Đơn hàng đã được đặt thành công";
                    case "DELIVERING":
                      return "Đơn hàng đang được gửi đi";
                    case "SHIPPING":
                      return "Đơn hàng đang được shipper giao";
                    case "COMPLETED":
                      return "Đơn hàng đã được giao thành công";
                    case "CANCELLED":
                      return "Đã hủy đơn hàng";
                    default:
                      return "Chưa cập nhật";
                  }
                })()}
              </p>
              <p className="text-sm text-muted-foreground">
                Chúng tôi sẽ cố gắng đưa đơn hàng tới tay bạn một cách sớm nhất
              </p>
            </div>
          </div>

          <div className="w-full h-fit p-6 bg-background dark:bg-muted/50">
            <div className="text-muted-foreground text-sm">
              <span>Đơn hàng đã được đặt vào </span>
              <span className="text-foreground">
                {format(order.orderDate, "dd/MM/yyyy")}
              </span>
              <span> và đang trong quá trình xử lý</span>

              <OrderProgress
                steps={orderSteps}
                currentStep={orderSteps.findIndex(
                  (step) => step.id === order.orderStatus
                )}
                className="mt-6"
              />
            </div>
          </div>
        </div>

        {/* Order detail */}
        <div className="w-full space-y-2">
          <div className="flex items-start p-4 justify-between gap-4 bg-background dark:bg-muted/50">
            <div>
              <p className="uppercase text-xs">Chi tiết đơn hàng</p>
              <p className="text-xl font-bold">#{order.orderId}</p>
            </div>

            <Button size={"sm"} variant={"outline"}>
              <Download /> Tải hóa đơn
            </Button>
          </div>

          <div className="w-full p-4 bg-background dark:bg-muted/50 space-y-3">
            <div className="flex items-center gap-4 justify-between">
              <div className="flex gap-3">
                <Truck />
                <p className="uppercase">Địa chỉ giao hàng</p>
              </div>
              {order.orderStatus === "PENDING" && (
                <Button
                  variant={"link"}
                  onClick={() => setIsShowChangeAddressDialog(true)}
                  className="text-sm hover:underline text-blue-ocean p-0!"
                >
                  Thay đổi
                </Button>
              )}
            </div>

            <div className="w-full h-0.5 bg-muted"></div>

            <p className="text-sm">{deliveryAddress?.getFullAddress()}</p>

            <p className="text-sm">
              <span className="font-semibold">Ghi chú: </span>
              {deliveryAddress?.deliveryNote || "Không có"}
            </p>
          </div>

          <div className="w-full p-4 bg-background dark:bg-muted/50 space-y-3">
            <div className="flex items-center gap-3">
              <WalletCards />
              <p className="uppercase">Tóm tắt đơn hàng</p>
            </div>

            <div className="w-full h-0.5 bg-muted"></div>

            {orderItems.map((item, index) => (
              <div key={index} className="flex gap-4">
                <Image
                  src={item.product.images[0].url}
                  alt={item.product.productName}
                  width={50}
                  height={50}
                />
                <div className="text-sm">
                  <p>{item.product.productName}</p>
                  <p className="text-muted-foreground">x{item.quantity}</p>
                </div>
              </div>
            ))}

            <div className="w-full h-0.5 bg-muted"></div>

            <div className="flex gap-4 items-baseline justify-between">
              <p className="text-muted-foreground">Tổng tiền hàng</p>
              <span className="font-bold text-muted-foreground">
                {formatMoney(totalProductsPrice)}
              </span>
            </div>

            <div className="flex gap-4 items-baseline justify-between">
              <p className="text-muted-foreground">Phí vận chuyển</p>
              <span className="font-bold text-muted-foreground">
                {formatMoney(order.shippingFee)}
              </span>
            </div>

            <div className="flex gap-4 items-baseline justify-between">
              <p className="text-muted-foreground">Giảm giá sản phẩm</p>
              <span className="font-bold text-muted-foreground">
                -{formatMoney(totalProductDiscountPrice)}
              </span>
            </div>

            <div className="flex gap-4 items-baseline justify-between">
              <p className="text-muted-foreground">Mã giảm giá</p>
              <span className="font-bold text-muted-foreground">
                -{formatMoney(order.discountAmount)}
              </span>
            </div>

            <div className="w-full h-0.5 bg-muted"></div>

            <div className="flex gap-4 items-baseline justify-between">
              <p className="text-muted-foreground">Tổng</p>
              <span className="font-bold text-lg">
                {formatMoney(order.totalAmount)}
              </span>
            </div>
          </div>

          {order.orderStatus === "PENDING" && (
            <Button
              variant={"outline"}
              onClick={() => setIsShowCancelOrderDialog(true)}
              className="w-full p-6 shadow-none border-none text-red-600 bg-background dark:bg-muted/50 hover:bg-background dark:hover:bg-muted/50"
            >
              <X /> Hủy đơn
            </Button>
          )}
        </div>
      </div>

      {/* Change delivery address Dialog */}
      <Dialog
        open={isShowChangeAddressDialog}
        onOpenChange={setIsShowChangeAddressDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cập nhật địa chỉ giao hàng</DialogTitle>
            <DialogDescription>
              Địa chỉ hiện tại: {deliveryAddress?.getFullAddress()}
            </DialogDescription>
          </DialogHeader>
          <Select onValueChange={(value) => setSelectedAddressId(value)}>
            <SelectTrigger className="w-full overflow-hidden">
              <SelectValue
                className="truncate"
                placeholder="Chọn địa chỉ mới"
              />
            </SelectTrigger>
            <SelectContent className="w-full md:max-w-lg max-w-xs rounded-none">
              <SelectGroup>
                <SelectLabel>Địa chỉ của bạn</SelectLabel>
                {addresses.map((address, index) => (
                  <SelectItem key={index} value={address.addressId}>
                    {address.fullAddress}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Hủy</Button>
            </DialogClose>
            <Button
              disabled={!selectedAddressId || isUpdatingAddress}
              type="submit"
              onClick={() => handleUpdateDeliveryAddress()}
            >
              {isUpdatingAddress ? (
                <>
                  <LoaderCircle className="animate-spin" /> Đang lưu...
                </>
              ) : (
                "Lưu thay đổi"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Order Dialog */}
      <Dialog
        open={isShowCancelOrderDialog}
        onOpenChange={setIsShowCancelOrderDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn hủy đơn hàng này không?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Hủy</Button>
            </DialogClose>
            <Button
              disabled={isCancelingOrder}
              variant={"destructive"}
              type="submit"
              onClick={() => handleCancelOrder()}
            >
              {isCancelingOrder ? (
                <>
                  <LoaderCircle className="animate-spin" /> Đang hủy...
                </>
              ) : (
                "Hủy đơn hàng"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
