"use client";

import { Button } from "@/components/ui/button";
import { CartItem } from "@/lib/models/cart-item";
import { Product } from "@/lib/models/product";
import { getProductById } from "@/lib/services/product-service";
import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { removeItemFromCart } from "@/lib/services/cart-service";
import { toast } from "sonner";
import { API_SUCCESS_CODE } from "@/lib/constants/api-success-code";
import {
  DEFAULT_ERROR_MESSAGE,
  ERROR_MESSAGES,
} from "@/lib/constants/error-messages";
import { REMOVE_ITEM_FROM_CART_SUCCESS_MESSAGE } from "@/lib/constants/success-messages";
import { updateCartItemQuantity } from "@/lib/services/cart-item-service";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { formatMoney } from "@/lib/helpers/format-money";

export default function CartItemCard({
  cartId,
  cartItem,
}: {
  cartId: string;
  cartItem: CartItem;
}) {
  const [isShowDeleteDialog, setIsShowDeleteDialog] =
    React.useState<boolean>(false);
  const [isRemoving, setIsRemoving] = React.useState<boolean>(false);
  const [product, setProduct] = React.useState<Product | null>(null);
  const [quantity, setQuantity] = React.useState<number>(-1);

  React.useEffect(() => {
    const fetchProduct = async () => {
      const response = await getProductById({
        productId: cartItem.productId,
      });
      setProduct(response.product);
    };

    fetchProduct();

    setQuantity(cartItem.quantity);
  }, [cartItem]);

  React.useEffect(() => {
    const fetchUpdateCartItemQuantity = async () => {
      await updateCartItemQuantity({
        cartId: cartId,
        cartItemId: cartItem.cartItemId,
        quantity: quantity,
      });
    };

    fetchUpdateCartItemQuantity();
  }, [quantity, cartId, cartItem.cartItemId]);

  const handelIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity <= 1) return;
    setQuantity((prev) => prev - 1);
  };

  const handleRemoveItemFromCart = async () => {
    try {
      setIsRemoving(true);
      const code = await removeItemFromCart({
        cartId: cartId,
        cartItemId: cartItem.cartItemId,
      });

      toast(
        code !== API_SUCCESS_CODE.REMOVE_ITEM_FROM_CART_SUCCESS
          ? "Thất bại"
          : "Thành công",
        {
          description:
            code !== API_SUCCESS_CODE.REMOVE_ITEM_FROM_CART_SUCCESS
              ? ERROR_MESSAGES[code]
                ? ERROR_MESSAGES[code]
                : DEFAULT_ERROR_MESSAGE
              : REMOVE_ITEM_FROM_CART_SUCCESS_MESSAGE,
          action: {
            label: "Oke",
            onClick: () => {},
          },
        }
      );
    } finally {
      setIsShowDeleteDialog(false);
      setIsRemoving(false);
    }
  };

  if (!product) return null;

  return (
    <div className="w-full h-fit p-4 flex items-start gap-4 bg-background dark:bg-muted/50 relative">
      <Dialog open={isShowDeleteDialog} onOpenChange={setIsShowDeleteDialog}>
        <DialogTrigger asChild>
          <Button
            onClick={() => setIsShowDeleteDialog(true)}
            variant={"ghost"}
            size={"icon"}
            className="absolute top-0 right-0 hover:bg-transparent"
          >
            <X />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Xác nhận</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn gỡ sản phẩm khỏi giỏ hàng không?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Hủy</Button>
            </DialogClose>
            <Button
              disabled={isRemoving}
              onClick={() => handleRemoveItemFromCart()}
              className="bg-red-600 hover:bg-red-700"
            >
              Xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="w-full max-w-25 relative aspect-3/4">
        <Image
          src={product.images[0].url}
          alt={product.productName}
          fill
          className="absolute top-0 left-0 object-center object-contain"
        />
      </div>

      <div className="grow h-full flex items-start justify-between flex-wrap gap-5">
        <div className="w-full flex flex-wrap justify-between items-end">
          <div>
            <Link
              href={`/products/${product.slug}`}
              className="max-w-full font-semibold hover:underline"
            >
              {product.productName}
            </Link>
            <p className="text-sm text-muted-foreground truncate">
              {product.description}
            </p>
            <p className="text-lg font-bold mt-2">
              {formatMoney(product.getDiscountedPrice())}
            </p>
            {product.discount > 0 && (
              <div className="flex items-center gap-4">
                <p className="font-semibold text-muted-foreground line-through">
                  {formatMoney(product.price)}
                </p>
                <div className="text-xs px-2 py-1 bg-red-700 text-red-50">
                  Giảm {product.discount}%
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center rounded-full gap-4 mt-5">
            <Button
              onClick={() => handleDecreaseQuantity()}
              disabled={quantity <= 1}
              variant={"ghost"}
              size={"icon"}
              className="rounded-full bg-muted"
            >
              <Minus />
            </Button>

            <p className="text-sm">{quantity}</p>

            <Button
              onClick={() => handelIncreaseQuantity()}
              variant={"ghost"}
              size={"icon"}
              className="rounded-full bg-muted"
            >
              <Plus />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
