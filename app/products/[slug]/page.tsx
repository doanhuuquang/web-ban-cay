import ProductDetail from "@/components/shared/product-detail";
import RelatedProducts from "@/components/shared/related-products";

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
        <RelatedProducts currentProductSlug={slug} />
      </div>
    </div>
  );
}
