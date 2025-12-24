import ProductDetail from "../../_components/product-detail";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = await (await params).slug;

  return (
    <>
      <ProductDetail slug={slug} />
    </>
  );
}
