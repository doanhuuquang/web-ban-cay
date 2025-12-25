import storeOrder, { OrderSummary } from "@/store/storeOder";
import { getOrderAll, getOrderId, getOrderProfileId, getOrderStatus, updateStatusOrder } from "@/lib/services/order-service";
import { Order } from "@/lib/models/order";
import { toast } from "sonner";
import { OrderStatusType } from "@/lib/type/order-status";

export async function getAllOrderMock() {
    const { setLoading, setAllOrder } = storeOrder.getState();
    setLoading(true);
    const res = await getOrderAll();
    if (res.code === 1) {
        setAllOrder(res.order);
    }

    setLoading(false);
}

export async function getOrderByStatusMock(param: string) {

    const { setLoading, setAllOrder } = storeOrder.getState();
    setLoading(true);
    const res = await getOrderStatus(param);
    if (res.code === 1)
        setAllOrder(res.order)
    else setAllOrder(null);

    setLoading(false);
}


export async function UpdateOrderStatusMock(id: string, status: string) {

    const { setLoading, updateOrderStatus } = storeOrder.getState();
    setLoading(true);
    const res = await updateStatusOrder(id, status);

    if (res.code === 1 && res.order) {
        updateOrderStatus(id,status);
        toast("cập nhật trạng thái thành công");
    }
    else
        toast("cập nhật trạng thái thất bại");

    setLoading(false);
}


export async function getOrderByIdOrProfileMock(stype: string, param: string) {
    const { setLoading, setAllOrder, setOrder, addOrUpdateOrder } = storeOrder.getState();
    setLoading(true);

    if (stype === "all") {
        const res1 = await getOrderProfileId(param)
        setAllOrder(res1.order);

        const res2 = await getOrderId(param);
        if (res2.code == 1 && res2.order !== null)
            addOrUpdateOrder(res2.order);
    }

    if (stype === "userId") {
        const res1 = await getOrderProfileId(param)
        setAllOrder(res1.order);
    }

    if (stype === "paymentId") {

        const res2 = await getOrderId(param);
        if (res2.code == 1)
            setOrder(res2.order);
    }

    setLoading(false);
}


export function summaryOrders(orders: Order[]): OrderSummary {
    return orders.reduce<OrderSummary>((acc, order) => {

        // chỉ cộng tiền khi đơn đã giao thành công
        if (order.orderStatus === "DELIVERED") {
            acc.totalIncome += order.totalAmount;
        }

        switch (order.orderStatus) {
            case "DELIVERED":
                acc.success++;
                break;
            case "PENDING":
                acc.pending++;
                break;
            case "SHIPPED":
                acc.shipping++;
                break;
            case "CANCELLED":
                acc.cancelled++;
                break;
            case "RETURNED":
                acc.returned++;
                break;
        }

        return acc;
    }, {
        totalIncome: 0,
        success: 0,
        pending: 0,
        shipping: 0,
        cancelled: 0,
        returned: 0
    });
}

