import { Order } from "@/lib/models/order";
import { create } from "zustand";

export type OrderSummary = {
    totalIncome: 0,
    success: 0,
    pending: 0,      // Chờ xử lý
    delivering: 0,   // Chờ lấy hàng
    shipping: 0,     // Đang giao hàng
    cancelled: 0,    // Đã hủy
    returned: 0,     // Đã trả
};

interface OderState {
    loading: boolean
    orderAll: Order[] | null
    orderSum: OrderSummary;
    setLoading: (loading: boolean) => void
    setAllOrder: (details: Order[] | null) => void
    setOrder: (details: Order | null) => void
    addOrder: (order: Order) => void;
    updateOrder: (order: Order) => void;
    addOrUpdateOrder: (order: Order) => void;
    removeOrder: (orderId: string) => void;
    setOrderSum:(a:OrderSummary)=>void;
}


const storeOrder = create<OderState>((set) => ({
    orderAll: null,
    loading: false,

    orderSum: {
        totalIncome: 0,
        success: 0,
        pending: 0,      // Chờ xử lý
        delivering: 0,   // Chờ lấy hàng
        shipping: 0,     // Đang giao hàng
        cancelled: 0,    // Đã hủy
        returned: 0,     // Đã trả
    },

    setLoading: (value: boolean) => set({ loading: value }),

    setAllOrder: (value) => set({ orderAll: value }),

    setOrder: (value) => {
        const arr: Order[] = [];
        if (value) arr.push(value);
        set({ orderAll: arr })
    },

    addOrder: (order) => set((state) => ({
        orderAll: state.orderAll
            ? [...state.orderAll, order]
            : [order],
    })),

    updateOrder: (order) => set((state) => ({
        orderAll: state.orderAll
            ? state.orderAll.map((c) => c.orderId === order.orderId
                ? { ...c, ...order } : c)
            : [order],
    })),

    addOrUpdateOrder: (order) =>
        set((state) => ({
            orderAll: state.orderAll
                ? (() => {
                    const exist = state.orderAll.some(o => o.orderId === order.orderId);
                    return exist
                        ? state.orderAll.map(o =>
                            o.orderId === order.orderId ? { ...o, ...order } : o
                        )
                        : [...state.orderAll, order];
                })()
                : [order],
        })),


    removeOrder: (orderId) => set((state) => ({
        orderAll: state.orderAll
            ? state.orderAll.filter((c) => c.orderId !== orderId) : null,
    })),

    setOrderSum:(value) => set({ orderSum: value })

}));

export default storeOrder;
