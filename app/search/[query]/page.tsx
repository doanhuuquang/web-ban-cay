import {
  CarouselCustom,
  CategoryCustomItem,
} from "@/components/shared/carousel-custom";
import ProductCard from "@/components/shared/product-card";
import SearchFoundProducts from "@/components/shared/search-found-products";
import { productItemsSample } from "@/lib/constants/product-items";

function ResultsCount({ keyword }: { keyword: string }) {
  if (false)
    return (
      <div className="w-full pt-5 pb-10 space-y-1">
        <p className="text-2xl">
          Không có kết quả tìm kiếm cho từ khóa
          <span className="font-bold"> &quot;{keyword}&quot;</span>
        </p>
        <p className="text-muted-foreground text-sm">
          Hãy thử lại bằng cách viết khác hoặc sử dụng từ khóa khác.
        </p>
      </div>
    );

  return (
    <div className="w-full pt-5 pb-10 space-y-1">
      <p className="text-2xl">
        <span className="font-bold">149</span> sản phẩm cho từ khóa
        <span> &quot;{keyword}&quot;</span>
      </p>
    </div>
  );
}

function MayLikeProducts() {
  return (
    <div className="w-full h-full space-y-5">
      <h1 className="font-bold text-2xl">Có thể bạn sẽ thích</h1>

      <CarouselCustom itemSize={"lg"}>
        {productItemsSample.map((product, index) => (
          <div key={index}>
            <CategoryCustomItem>
              <ProductCard product={product} />
            </CategoryCustomItem>
          </div>
        ))}
      </CarouselCustom>
    </div>
  );
}

export default async function SearchPage({
  params,
}: {
  params: { query: string };
}) {
  const keyword = decodeURIComponent((await params).query);

  return (
    <main className="w-full max-w-[1400px] m-auto p-4 space-y-10">
      <ResultsCount keyword={keyword} />
      <SearchFoundProducts />
      <MayLikeProducts />
    </main>
  );
}
