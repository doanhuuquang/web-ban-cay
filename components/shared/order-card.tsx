"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/lib/contexts/auth-context";
import { formatMoney } from "@/lib/helpers/format-money";
import { Order } from "@/lib/models/order";
import { Product } from "@/lib/models/product";
import { getProductById } from "@/lib/services/product-service";
import { OrderStatusTypeLabel } from "@/lib/type/order-status";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function OrderCard({ order }: { order: Order }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [orderItems, setOrderItems] = React.useState<
    { product: Product; quantity: number }[]
  >([]);
  const { user } = useAuth();

  React.useEffect(() => {
    if (!user) return;

    const fetchProductById = async () => {
      try {
        setIsLoading(true);

        const orderItems: { product: Product; quantity: number }[] = [];

        await Promise.all(
          order.orderItemResponses.map(async (item) => {
            const response = await getProductById({
              productId: item.productId,
            });

            if (response.product)
              orderItems.push({
                product: response.product,
                quantity: item.quantity,
              });
          })
        );

        setOrderItems(orderItems);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductById();
  }, [user, order]);

  if (isLoading || orderItems.length === 0)
    return (
      <div className="w-full p-4 bg-background dark:bg-muted/50 flex gap-4">
        <Skeleton className="w-15 h-15 rounded-none" />
        <div className="w-full space-y-2">
          <Skeleton className="w-full max-w-sm h-7 rounded-none" />
          <Skeleton className="w-full max-w-xs h-5 rounded-none" />
        </div>
      </div>
    );

  return (
    <Link
      href={`/account/orders/${order.orderId}`}
      className="w-full h-full bg-background dark:bg-accent/50 p-4 flex flex-wrap justify-between gap-10 group"
    >
      {/* Ảnh, tên, mô tả, giá sản phẩm */}
      <div className={cn(orderItems.length > 1 && "space-y-4")}>
        {orderItems.map((orderItem, index) => (
          <div key={index} className="flex gap-4">
            <div className="w-20 aspect-square relative">
              <Image
                src={orderItem.product.images[0].url}
                alt={orderItem.product.productName}
                fill
                className="absolute top-0 left-0 object-center object-contain"
              />
            </div>

            <div className="space-y-1">
              <p className="group-hover:underline">
                {orderItem.product.productName}
              </p>
              <p className="text-sm text-muted-foreground">
                {orderItem.product.description}
              </p>
              <p className="text-sm">x{orderItem.quantity}</p>
              <div className="space-x-1">
                <span className="text-xs text-muted-foreground line-through">
                  {formatMoney(orderItem.product.price)}
                </span>
                <span className="text-sm">
                  {formatMoney(orderItem.product.getDiscountedPrice())}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trạng thái, tổng giá trị đơn hàng */}
      <div className="w-full max-w-md text-end space-y-2">
        <p className="text-sm text-muted-foreground">
          {OrderStatusTypeLabel[order.orderStatus]}
        </p>
        <div className="text-sm">
          <span>Tổng giá tiền: </span>
          <span className="font-semibold">
            {formatMoney(order.totalAmount)}
          </span>
        </div>
      </div>
    </Link>
  );
}
