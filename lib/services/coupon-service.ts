import { Coupon } from "@/lib/models/coupon";
import instance from "@/lib/services/axios-config";

const getAvailableCoupons = async ({
  orderTotal,
}: {
  orderTotal: number;
}): Promise<{
  code: number;
  coupons: Coupon[];
}> => {
  try {
    const getAvailableCouponsUrl = `/coupons/get-available-coupons/${orderTotal}`;
    const response = await instance.get(getAvailableCouponsUrl);

    return {
      code: response.data.code,
      coupons: response.data.data.map(Coupon.fromJson),
    };
  } catch {
    return {
      code: -1,
      coupons: [],
    };
  }
};

const getAllCoupons = async (): Promise<Coupon[]> => {
  try {
    const getAvailableCouponsUrl = `/coupons/all`;
    const response = await instance.get(getAvailableCouponsUrl);

    return response.data.data.map(Coupon.fromJson);
  } catch {
    return [];
  }
};

export { getAvailableCoupons, getAllCoupons };
