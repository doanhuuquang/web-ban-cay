import OrderDetail from "@/components/shared/order-detail";

export default async function OrderConfirmedPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  return (
    <div className="w-full bg-muted dark:bg-background py-2">
      <OrderDetail orderId={id} />
    </div>
  );
}
