import { Coupon } from "@/lib/models/coupon";
import { create } from "zustand";

interface CouponsState {
    loading: boolean
    couponsAll: Coupon[] | null
    couponOne: Coupon | null
    setLoading: (loading: boolean) => void
    setAllCoupon: (details: Coupon[] | null) => void
    addCoupon: (Coupon: Coupon) => void;
    removeCoupon: (CouponId: string) => void;
    updateCoupon: (CouponId: string, upData: Coupon) => void;
    filterCouponsByDateEnd: (time: string) => Coupon[]
}


const storeCoupon = create<CouponsState>((set, get) => ({
    couponsAll: null,
    loading: false,
    couponOne: null,

    setLoading: (value: boolean) => set({ loading: value }),

    setAllCoupon: (value) => set({ couponsAll: value }),

    addCoupon: (Coupon) => set((state) => ({
        couponsAll: state.couponsAll
            ? [...state.couponsAll, Coupon]
            : [Coupon],
    })),


    removeCoupon: (CouponId) => set((state) => ({
        couponsAll: state.couponsAll
            ? state.couponsAll.filter((c) => c.couponId !== CouponId) : null,
    })),

    filterCouponsByDateEnd: (time: string) => {
        const coupons = get().couponsAll ?? [];

        const normalize = (d: string | Date) => {
            const dt = new Date(d);
            if (isNaN(dt.getTime())) return NaN;
            dt.setHours(0, 0, 0, 0);
            return dt.getTime();
        };

        const target = normalize(time);

        return coupons.filter(c => {
            if (!c.expiryDate) return false;

            const expiry = normalize(c.expiryDate);
            return !isNaN(expiry) && expiry <= target;
        });
    },

    updateCoupon: (couponIdx: string, upData: Coupon) => set((s) => ({
        couponsAll: s.couponsAll?.map(row =>
            row.couponId === couponIdx
                ? { ...row, ...upData }
                : row
        )
    }))


}));

export default storeCoupon;
