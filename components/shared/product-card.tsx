import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Heart, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";

type ProductCardProps = {
  imageSrcs: string[];
  productName: string;
  productDescription: string;
  price: number;
  discountPercentage: number;
  rating: number;
};

export default function ProductCard({
  imageSrcs,
  productName,
  productDescription,
  price,
  rating,
  className,
}: ProductCardProps & {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full rounded-xl overflow-hidden cursor-pointer group hover:border-primary space-y-2 aspect-3/4",
        className
      )}
    >
      <div className="w-full h-full relative">
        <div className="absolute top-0 right-0 z-1 p-2 gap-2 hidden group-hover:flex group-hover:flex-col">
          <Button variant={"outline"} size={"icon"} className="rounded-full">
            <Heart />
          </Button>

          <Button variant={"outline"} size={"icon"} className="rounded-full">
            <ShoppingCart />
          </Button>
        </div>

        <Image
          src={imageSrcs[0]}
          alt="image"
          fill
          className="absolute top-0 left-0 z-1 object-center object-cover rounded-md"
        />

        <Image
          src={imageSrcs[1]}
          alt="image"
          fill
          className="absolute top-0 left-0 object-center object-cover rounded-md z-0 group-hover:z-2 transition-all"
        />

        <div className="w-full group-hover:translate-y-full transition-all p-4 space-y-1 flex flex-col justify-end bg-background/80 absolute bottom-0 left-0 z-3">
          <p className="font-semibold truncate">{productName}</p>
          <p className="text-muted-foreground text-xs h-8 line-clamp-2">
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
              <p className="text-xs">{rating}</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
