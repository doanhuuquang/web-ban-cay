import { Button } from "@/components/ui/button";
import { Product } from "@/lib/models/product";
import { Minus, Plus, Trash, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartProductCard({ product }: { product: Product }) {
  return (
    <div className="w-full h-fit pl-4 py-4 pr-10 border flex items-start gap-4 bg-muted/20 relative">
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
        <div className="">
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
          <div className="flex items-center gap-4">
            <p className="font-semibold text-muted-foreground line-through">
              {product.getDiscountedPrice()}
            </p>
            <div className="text-xs px-2 py-1 bg-red-700 text-red-50">
              Giảm {product.discount}%
            </div>
          </div>

          <div className="flex items-center rounded-full gap-4 mt-5">
            <Button
              variant={"ghost"}
              size={"icon"}
              className="rounded-full bg-muted"
            >
              <Minus />
            </Button>

            <p className="text-sm">4</p>

            <Button
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
