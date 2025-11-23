import { Button } from "@/components/ui/button";
import { Product } from "@/lib/models/product";
import { ShoppingBag, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function WishlistProductCard({ product }: { product: Product }) {
  return (
    <div className="w-full h-fit pl-4 py-4 pr-10 border flex items-start gap-4 dark:bg-muted/50 relative shadow-sm">
      <Button
        variant={"ghost"}
        size={"icon"}
        className="absolute top-0 right-0 hover:bg-transparent"
      >
        <X />
      </Button>

      <div className="w-full max-w-25 relative aspect-3/4">
        <Image
          src={product.imageUrls[0]}
          alt={product.name}
          fill
          className="absolute top-0 left-0 object-center object-contain"
        />
      </div>

      <div className="grow h-full flex items-start justify-between flex-wrap gap-5">
        <div>
          <Link
            href={`/products/${product.slug}`}
            className="max-w-full font-bold hover:underline"
          >
            {product.name}
          </Link>
          <p className="text-sm text-muted-foreground truncate">
            {product.description}
          </p>
          <p className="text-lg font-bold mt-2">
            {product.getDiscountedPrice()}
          </p>

          <Button variant={"outline"} className="mt-4">
            <ShoppingBag /> Thêm vào giỏ hàng
          </Button>
        </div>
      </div>
    </div>
  );
}
