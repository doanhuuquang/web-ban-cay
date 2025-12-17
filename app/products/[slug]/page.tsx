import ProductDetail from "@/components/shared/product-detail";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

function RelatedProducts() {
  return (
    <div className="w-full h-full space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl">Sản phẩm liên quan</h1>

        <Button variant={"outline"} className="rounded-full lg:block hidden">
          Xem tất cả sản phẩm liên quan
        </Button>
      </div>

      {/* <CarouselCustom itemSize={"lg"}>
        {productItemsSample.map((product, index) => (
          <div key={index}>
            <CategoryCustomItem>
              <ProductCard product={product} />
            </CategoryCustomItem>
          </div>
        ))}
      </CarouselCustom> */}

      <Link
        href={""}
        className="lg:hidden flex items-center justify-between border-b pb-4"
      >
        <p className="font-bold">Xem tất cả sản phẩm liên quan</p>
        <ChevronRight />
      </Link>
    </div>
  );
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  return (
    <div className="w-full h-fit space-y-10">
      <div className="w-full h-fit">
        {/* Sản phẩm hiện tại */}
        <ProductDetail slug={slug} />
      </div>
      <div className="w-full max-w-[1400px] m-auto p-4 space-y-10">
        <RelatedProducts />
      </div>
    </div>
  );
}
