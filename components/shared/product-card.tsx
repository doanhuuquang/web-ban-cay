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
        "w-full lg:rounded-xl md:rounded-lg rounded-sm overflow-hidden cursor-pointer group hover:border-primary shadow-sm",
        className
      )}
    >
      <div className="w-full relative group">
        <div className="absolute top-0 right-0 z-3 p-4 gap-2 hidden group-hover:flex group-hover:flex-col">
          <Button
            variant={"default"}
            size={"icon"}
            className="rounded-full bg-white hover:bg-white text-black shadow-2xl"
          >
            <Heart />
          </Button>

          <Button
            variant={"default"}
            size={"icon"}
            className="rounded-full bg-white hover:bg-white text-black shadow-2xl"
          >
            <ShoppingCart />
          </Button>
        </div>

        <div className="w-full h-full relative aspect-square">
          <Image
            src={imageSrcs[0]}
            alt="image"
            fill
            className="absolute top-0 left-0 z-1 object-center object-cover"
          />

          <Image
            src={imageSrcs[1]}
            alt="image"
            fill
            className="absolute top-0 left-0 object-center object-cover z-2 opacity-0 group-hover:opacity-100 transition-all"
          />
        </div>
      </div>
      <div className="w-full md:p-4 p-2 space-y-2">
        <p className="font-bold truncate md:text-lg text-sm">{productName}</p>
        <p className="text-xs text-muted-foreground h-8 line-clamp-2">
          {productDescription}
        </p>

        <div className="w-full flex flex-wrap-reverse items-center justify-between gap-1">
          <div className="space-x-1 md:text-lg text-sm flex flex-wrap-reverse items-baseline">
            <span className="font-semibold">{price} VND</span>
            <span className="font-semibold md:text-xs text-[10px] line-through text-primary">
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
  );
}
