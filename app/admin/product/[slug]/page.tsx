import ProductDetails from "./ProductDetails";

export default async function ProductDetailPage({params} : {
    params: Promise< {slug: string}>
}) {
    const slug =  (await params).slug;

    return <ProductDetails slug={slug}/>
}
