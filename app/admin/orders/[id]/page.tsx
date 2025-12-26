import OrderDetail from "./OrderDetail";

export default async function ProductDetailPage({params} : {
    params: Promise< {id: string}>
}) {
    const id =  (await params).id;

    return <OrderDetail id={id}/>
}

