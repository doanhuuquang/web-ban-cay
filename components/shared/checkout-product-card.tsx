"use client";

import { CartItem } from "@/lib/models/cart-item";
import { Product } from "@/lib/models/product";
import { getProductById } from "@/lib/services/product-service";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { formatMoney } from "@/lib/helpers/format-money";

export default function CheckoutProductCard({
  cartItem,
}: {
  cartItem: CartItem;
}) {
  const [product, setProduct] = React.useState<Product | null>(null);

  React.useEffect(() => {
    const fetchProduct = async () => {
      const response = await getProductById({
        productId: cartItem.productId,
      });
      setProduct(response.product);
    };

    fetchProduct();
  }, [cartItem]);

  if (!product) return null;

  return (
    <div className="w-full h-fit flex items-center gap-4 relative">
      <div className="w-full max-w-20 relative aspect-3/4">
        <Image
          src={product.images[0].url}
          alt={product.productName}
          fill
          className="absolute top-0 left-0 object-center object-contain"
        />
      </div>

      <div className="w-full flex justify-between flex-wrap">
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

          <p className="text-sm mt-2">x{cartItem.quantity}</p>
        </div>

        <p className="text-lg font-bold ml-auto">
          {formatMoney(product.price * cartItem.quantity)}
        </p>
      </div>
    </div>
  );
}
