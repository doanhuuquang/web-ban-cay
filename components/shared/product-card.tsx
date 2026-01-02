"use client";

import { Button } from "@/components/ui/button";
import { API_SUCCESS_CODE } from "@/lib/constants/api-success-code";
import {
  DEFAULT_ERROR_MESSAGE,
  ERROR_MESSAGES,
} from "@/lib/constants/error-messages";
import { ADD_ITEM_TO_CART_SUCCESS_MESSAGE } from "@/lib/constants/success-messages";
import { useAuth } from "@/lib/contexts/auth-context";
import { formatMoney } from "@/lib/helpers/format-money";
import { Product } from "@/lib/models/product";
import { addItemToCart } from "@/lib/services/cart-item-service";
import { cn } from "@/lib/utils";
import { Heart, LoaderCircle, Plus, ShoppingBag, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";
import imgdefault from "@/public/assets/images/products/hoacuc-1-gplant.jpg"

export default function ProductCard({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const { user } = useAuth();
  const [isAdding, setIsAdding] = React.useState<boolean>(false);

  const handleAddToCart = async () => {
    if (!user || !user.userProfile?.cartResponse.cartId) return;

    try {
      setIsAdding(true);

      const code = await addItemToCart({
        cartId: user.userProfile.cartResponse.cartId,
        productId: product.productId,
        quantity: 1,
      });

      if (code === API_SUCCESS_CODE.ADD_ITEM_TO_CART_SUCCESS) {
        toast(
          code !== API_SUCCESS_CODE.LOGIN_SUCCESS ? "Thất bại" : "Thành công",
          {
            description:
              code !== API_SUCCESS_CODE.LOGIN_SUCCESS
                ? ERROR_MESSAGES[code]
                  ? ERROR_MESSAGES[code]
                  : DEFAULT_ERROR_MESSAGE
                : ADD_ITEM_TO_CART_SUCCESS_MESSAGE,
            action: {
              label: "Oke",
              onClick: () => { },
            },
          }
        );
      }
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Link
      href={"/products/" + product.slug}
      className={cn("w-full cursor-pointer bg-background", className)}
    >
      <div className="w-full relative">
        <div className="w-full h-full relative aspect-3/4 overflow-hidden">
          <Image
            src={product?.images?.[0]?.url ?? imgdefault}
            alt="image"
            fill
            className="absolute top-0 left-0 z-1 object-center object-cover"
          />

          <Image
            src={product?.images[1]?.url ?? imgdefault}
            alt="image"
            fill
            className="absolute top-0 left-0 object-center object-cover z-2 opacity-0 hover:opacity-100 transition-all"
          />
        </div>
      </div>
      <div className="w-full py-4 space-y-3">
        {product.discount !== null && product.discount > 0 && (
          <div className="w-fit py-1 px-2 bg-red-700 z-3 text-xs text-red-50 rounded-xs">
            Giảm <span className="">{product.discount}%</span>
          </div>
        )}

        <div>
          <h1 className="font-bold truncate hover:underline">
            {product.productName}
          </h1>

          <p className="truncate text-sm text-muted-foreground">
            {product.description}
          </p>
        </div>

        <div className="space-x-1 text-lg flex flex-wrap-reverse items-baseline">
          <span className="font-semibold">
            {formatMoney(product.getDiscountedPrice())}
          </span>
          {product.discount !== null && product.discount > 0 && (
            <span className="text-sm line-through text-muted-foreground">
              {formatMoney(product.price)}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          <Star size={16} className="fill-amber-400 text-transparent" />
          <p className="text-sm">{product.avgRating}</p>
        </div>

        <div className="flex items-center flex-wrap gap-2">
          <Button
            onClick={(e) => {
              handleAddToCart();
              return e.preventDefault();
            }}
            variant={"ghost"}
            size={"icon-lg"}
            className="bg-blue-ocean rounded-full hover:bg-blue-ocean/80 text-white hover:text-white"
          >
            {isAdding ? (
              <LoaderCircle className="size-5 animate-spin" />
            ) : (
              <ShoppingBag className="size-5" />
            )}
          </Button>

          <Button variant={"outline"} size={"icon-lg"} className="rounded-full">
            <Heart className="size-5" />
          </Button>
        </div>
      </div>
    </Link>
  );
}
