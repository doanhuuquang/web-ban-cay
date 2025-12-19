import OrderDetail from "@/components/shared/order-detail";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  return (
    <div className="w-full bg-muted dark:bg-background">
      <OrderDetail orderId={id} />
    </div>
  );
}
