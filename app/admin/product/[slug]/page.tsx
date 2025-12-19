export default async function ProductDetailPage({params} : {
    params: Promise< {slug: string}>
}) {
    const slug = await (await params).slug;

    return <div>{slug}</div>
}