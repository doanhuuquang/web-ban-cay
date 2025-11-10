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
        "w-full lg:rounded-lg rounded-sm cursor-pointer group hover:border-primary border bg-background dark:bg-muted/50",
        className
      )}
    >
      <div className="w-full relative group">
        {/* Giảm giá */}
        <div className="absolute top-2 right-2 py-1 px-2 bg-primary z-3 text-[9px] text-white rounded-xs font-light">
          Giảm <span className="">10%</span>
        </div>

        <div className="w-full h-full relative aspect-square lg:rounded-t-lg rounded-t-sm overflow-hidden">
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
      <div className="w-full p-2 space-y-2">
        <p className="font-medium text-sm line-clamp-2 min-h-10">
          {productName}
        </p>

        <div className="space-x-1 md:text-lg text-sm flex flex-wrap-reverse items-baseline">
          <span className="font-semibold text-xs text-primary">{price}đ</span>
          <span className="text-xs text-[10px] line-through text-muted-foreground">
            {price}đ
          </span>
        </div>

        <div className="flex items-center flex-wrap justify-between gap-2">
          <div className="flex items-center gap-1">
            <Star size={16} className="fill-amber-400 text-transparent" />
            <p className="text-sm">{rating}</p>
          </div>

          <Button variant={"ghost"} className="group-last text-blue-400">
            <Heart className="group:hover:fill-blue-400" />
            Yêu thích
          </Button>
        </div>
      </div>
    </div>
  );
}
