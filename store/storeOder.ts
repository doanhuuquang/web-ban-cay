import { Order } from "@/lib/models/order";
import { OrderStatusType } from "@/lib/type/order-status";
import { create } from "zustand";

export type OrderSummary = {
    totalIncome: number;
    success: number;
    pending: number;
    shipping: number;
    cancelled: number;
    returned: number;
};

interface OderState {
    loading: boolean
    orderAll: Order[] | null
    setLoading: (loading: boolean) => void
    setAllOrder: (details: Order[] | null) => void
    setOrder: (details: Order | null) => void
    addOrder: (order: Order) => void;
    updateOrderStatus: (orderId: string, status: string) => void;
    addOrUpdateOrder: (order: Order) => void;
    removeOrder: (orderId: string) => void;
}


const storeOrder = create<OderState>((set) => ({
    orderAll: null,
    loading: false,

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

    updateOrderStatus: (orderId: string, status: string) =>
        set((state) => ({
            ...state,
            orderAll: state.orderAll
                ? state.orderAll.map((c) =>
                    c.orderId === orderId
                        ? { ...c, orderStatus: status as OrderStatusType }
                        : c
                )
                : null,
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


}));

export default storeOrder;
