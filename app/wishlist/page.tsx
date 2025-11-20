import WishlistProductCard from "@/components/shared/wishlist-product-card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { productItemsSample } from "@/lib/constants/product-items";
import { SlashIcon } from "lucide-react";
import Link from "next/link";

export function BreadcrumbWithCustomSeparator() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Trang chủ</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <SlashIcon />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/whishlist">Sản phẩm đã thích</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default function WishlistPage() {
  return (
    <div className="w-full h-fit">
      <div className="w-full max-w-[1400px] p-4 m-auto space-y-4">
        <div className="space-y-1">
          <p className="text-lg font-bold">Danh sách yêu thích</p>

          <BreadcrumbWithCustomSeparator />
        </div>

        <div className="w-full space-y-4">
          {productItemsSample.map((product, index) => (
            <WishlistProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
