"use client";

import {
  CarouselCustom,
  CategoryCustomItem,
} from "@/components/shared/carousel-custom";
import ProductCard from "@/components/shared/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Product } from "@/lib/models/product";
import {
  getProductBySlug,
  getProductsByCategoryName,
} from "@/lib/services/product-service";
import React from "react";

export default function RelatedProducts({
  currentProductSlug,
}: {
  currentProductSlug: string;
}) {
  const [isLoadingProducts, setIsLoadingProducts] =
    React.useState<boolean>(true);
  const [products, setProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    try {
      const fetchProducts = async () => {
        const responseProductBySlug = await getProductBySlug({
          slug: currentProductSlug,
        });
        if (responseProductBySlug.product) {
          const response = await getProductsByCategoryName({
            categoryName: responseProductBySlug.product.category.categoryName,
          });

          if (response.products.length > 0) setProducts(response.products);
        }
      };

      fetchProducts();
    } finally {
      setIsLoadingProducts(false);
    }
  }, [currentProductSlug]);

  return (
    <div className="w-full h-full space-y-5">
      <h1 className="font-bold text-2xl">Sản phẩm liên quan</h1>

      {isLoadingProducts ? (
        <div className="w-full flex gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="w-full aspect-3/4 rounded-none" />
          ))}
        </div>
      ) : (
        <CarouselCustom itemSize={"lg"}>
          {products.map((product, index) => (
            <div key={index}>
              <CategoryCustomItem>
                <ProductCard product={product} />
              </CategoryCustomItem>
            </div>
          ))}
        </CarouselCustom>
      )}
    </div>
  );
}
