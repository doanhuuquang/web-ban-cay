import storeCoupon from "@/store/storeCoupons"
import { createCou, createCoupon, deleteCoupon, getAllAvailableCoupons, getAllCoupons, getAvailableCoupons, updateCouponSer } from "@/lib/services/coupon-service"
import { toast } from "sonner";
import { Coupon } from "@/lib/models/coupon";

export async function getAllCouponsMock() {
    const { setLoading, setAllCoupon } = storeCoupon.getState();
    const res = await getAllCoupons();

    setLoading(true);

    if (res)
        setAllCoupon(res);
    setLoading(false);
}
export async function getAvailableCouponsMock() {
    const { setLoading, setAllCoupon } = storeCoupon.getState();
    const res = await getAllAvailableCoupons();

    setLoading(true);

    if (res)
        setAllCoupon(res);
    setLoading(false);
}

export async function getAvailableCouponsByPriceMock(price: number) {
    const { setLoading, setAllCoupon } = storeCoupon.getState();
    const res = await getAvailableCoupons({ orderTotal: price });

    setLoading(true);

    if (res.code !== -1)
        setAllCoupon(res.coupons);
    setLoading(false);
}

export async function getAvailableCouponsByDateEnd(time: string) {
    const { setLoading, filterCouponsByDateEnd, setAllCoupon } = storeCoupon.getState();
    setLoading(true);
    await getAvailableCouponsMock();
    const a = filterCouponsByDateEnd(time);
    setAllCoupon(a);
    setLoading(false);
}

export async function createCouponMock(coupon: createCou) {
    const { setLoading, addCoupon } = storeCoupon.getState();
    setLoading(true);
    const res = await createCoupon(coupon);
    if (res.code === 1 && res.data) {
        addCoupon(res.data)
        toast("thêm mã giảm giá thành công")
    }
    else
        toast("thêm mã giảm giá thất bại")

    setLoading(false);
}

export async function deleteCouponMock(couponId: string) {
    const { setLoading, removeCoupon } = storeCoupon.getState();
    setLoading(true);
    const res = await deleteCoupon(couponId);
    if (res === 1) {
        removeCoupon(couponId)
        toast("Xóa mã giảm giá thành công")
    }
    else
        toast("Xóa mã giảm giá thất bại")

    setLoading(false);
}

export async function updateCouponMock(couponId: string, formdata: Coupon) {
    const { setLoading, updateCoupon } = storeCoupon.getState();
    setLoading(true);
    const res = await updateCouponSer(couponId, formdata);
    if (res.code === 1 ) {
        updateCoupon(couponId, formdata)
        toast("cập nhật mã giảm giá thành công")
    }
    else
        toast("cập nhật giảm giá thất bại")

    setLoading(false);
}