import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Heart, PackagePlus, Plus, ShoppingBasket, Star } from "lucide-react";
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
        "w-full rounded-xs cursor-pointer bg-background",
        className
      )}
    >
      <div className="w-full relative">
        <div className="w-full h-full relative aspect-square rounded-t-xs overflow-hidden">
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
            className="absolute top-0 left-0 object-center object-cover z-2 opacity-0 hover:opacity-100 transition-all"
          />
        </div>
      </div>
      <div className="w-full py-4 space-y-3">
        <div className="w-fit py-1 px-2 bg-red-700 z-3 text-xs text-red-50 rounded-xs">
          Giảm <span className="">10%</span>
        </div>

        <h1 className="font-bold truncate hover:underline">{productName}</h1>

        <p className="line-clamp-2 min-h-10 text-sm text-muted-foreground">
          {productDescription}
        </p>

        <div className="space-x-1 md:text-lg flex flex-wrap-reverse items-baseline">
          <span className="font-semibold">{price}đ</span>
          <span className="text-sm line-through text-muted-foreground">
            {price}đ
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Star size={16} className="fill-amber-400 text-transparent" />
          <p className="text-sm">{rating}</p>
        </div>

        <div className="flex items-center flex-wrap gap-2">
          <Button
            variant={"ghost"}
            size={"icon-lg"}
            className="bg-cyan-600 rounded-full hover:bg-cyan-700 text-cyan-50 hover:text-text-cyan-50"
          >
            <Plus className="size-5" />
          </Button>

          <Button variant={"outline"} size={"icon-lg"} className="rounded-full">
            <Heart className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
