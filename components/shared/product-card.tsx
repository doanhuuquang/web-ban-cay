import { Button } from "@/components/ui/button";
import { Product } from "@/lib/models/product";
import { cn } from "@/lib/utils";
import { Heart, Plus, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  return (
    <Link
      href={"/products/" + product.slug}
      className={cn("w-full cursor-pointer bg-background", className)}
    >
      <div className="w-full relative">
        <div className="w-full h-full relative aspect-square overflow-hidden">
          <Image
            src={product.imageUrls[0]}
            alt="image"
            fill
            className="absolute top-0 left-0 z-1 object-center object-cover"
          />

          <Image
            src={product.imageUrls[1]}
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
          <h1 className="font-bold truncate hover:underline">{product.name}</h1>

          <p className="truncate text-sm text-muted-foreground">
            {product.description}
          </p>
        </div>

        <div className="space-x-1 text-lg flex flex-wrap-reverse items-baseline">
          <span className="font-semibold">{product.getDiscountedPrice()}</span>
          {product.discount !== null && product.discount > 0 && (
            <span className="text-sm line-through text-muted-foreground">
              {product.getPrice()}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          <Star size={16} className="fill-amber-400 text-transparent" />
          <p className="text-sm">{product.rating}</p>
        </div>

        <div className="flex items-center flex-wrap gap-2">
          <Button
            variant={"ghost"}
            size={"icon-lg"}
            className="bg-blue-ocean rounded-full hover:bg-blue-ocean/80 text-white hover:text-white"
          >
            <Plus className="size-5" />
          </Button>

          <Button variant={"outline"} size={"icon-lg"} className="rounded-full">
            <Heart className="size-5" />
          </Button>
        </div>
      </div>
    </Link>
  );
}
