import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Heart, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";

type ProductCardProps = {
  imageSrc: string;
  productName: string;
  productDescription: string;
  price: number;
  discountPercentage: number;
};

export default function ProductCard({
  imageSrc,
  productName,
  productDescription,
  price,
  className,
}: ProductCardProps & {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full rounded-md overflow-hidden bg-background dark:bg-accent cursor-pointer group hover:border-primary",
        className
      )}
    >
      <div className="w-full aspect-3/4 relative">
        <div className="absolute top-0 right-0 z-1 p-2 gap-2 hidden group-hover:flex group-hover:flex-col">
          <Button variant={"outline"} size={"icon"} className="rounded-full">
            <Heart />
          </Button>

          <Button variant={"outline"} size={"icon"} className="rounded-full">
            <ShoppingCart />
          </Button>
        </div>

        <Image
          src={imageSrc}
          alt="image"
          fill
          className="absolute top-0 left-0 object-center object-cover rounded-md"
        />
      </div>
      <div className="w-full p-4 space-y-1">
        <p className="font-semibold truncate">{productName}</p>
        <p className="text-xs text-muted-foreground min-h-10 line-clamp-2">
          {productDescription}
        </p>

        <div className="w-full flex items-center justify-between">
          <div className="space-x-1">
            <span className="font-semibold">{price} VND</span>
            <span className="font-semibold text-xs line-through text-primary">
              {price} VND
            </span>
          </div>
          <span className="flex items-center gap-1">
            <Star size={12} className="text-primary" />
            <p className="text-xs">3.5</p>
          </span>
        </div>
      </div>
    </div>
  );
}
