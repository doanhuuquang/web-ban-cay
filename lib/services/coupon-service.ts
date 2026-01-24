import { Coupon, UpdateCouponDTO } from "@/lib/models/coupon";
import instance from "@/lib/services/axios-config";
import { Product } from "../models/product";
import { Category } from "../models/category";
import { parseLocalDateTime } from "../helpers/format-date";

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
      coupons: response.data.data,
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

    return response.data.data;
  } catch {
    return [];
  }
};

const getAllCouponsProductIds = async (
  ids: string[]
): Promise<Product[]> => {
  try {
    if (!ids.length) return [];

    const params = new URLSearchParams();
    ids.forEach(id => params.append("productIds", id.toString()));

    const response = await instance.get("/products", { params });

    return response.data.data.map(Product.fromJson);
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getAllCouponsCategoryIds = async (
  ids: string[]
): Promise<Category[]> => {
  try {
    const params = new URLSearchParams();
    ids.forEach(id => params.append("categoryIds", id.toString()));

    const response = await instance.get("/categories", {
      params,
    });

    return response.data.data.map(Category.fromJson);
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getAllAvailableCoupons = async (): Promise<Coupon[]> => {
  try {
    const getAvailableCouponsUrl = `/coupons/coupon-available`;
    const response = await instance.get(getAvailableCouponsUrl);

    return response.data.data;
  } catch {
    return [];
  }
};

const deleteCoupon = async (couponId: string): Promise<number> => {
  try {
    const getAvailableCouponsUrl = `coupons/${couponId}`;
    await instance.delete(getAvailableCouponsUrl);

    return 1
  } catch {
    return -1;
  }
};

const updateCouponSer = async (couponId: string, formdata: UpdateCouponDTO): Promise<{ code: number, data: Coupon | null }> => {
  try {

    console.log(formdata)
    const getAvailableCouponsUrl = `coupons/${couponId}`;
    const res = await instance.put(getAvailableCouponsUrl, formdata);

    return {
      code: 1,
      data: res.data.data
    }

  } catch (err) {
    console.log(err)
    return {
      code: -1,
      data: null
    }
  }
};

export type CouponScope = 'GLOBAL' | 'CATEGORY' | 'PRODUCT';

export type createCou = {
  code: string;
  discountType?: 'PERCENTAGE' | 'FIXED_AMOUNT';
  discountPercent?: number | null | undefined;
  discountAmount?: number | null | undefined;
  maxDiscountAmount?: number;
  minOrderValue?: number;
  startDate?: string;
  expiryDate?: string;
  usageLimit?: number;
  limitPerUser?: boolean;
  maxUsesPerUser?: number;
  enabled?: boolean;
  scope: CouponScope,
  categoryIds?: string[];
  productIds?: string[];
}


const createCoupon = async (
  coupon: createCou

): Promise<{ code: number; data: Coupon | null }> => {
  try {
    const url = `coupons/coupon/create`;

    const response = await instance.post(url, coupon);

    return {
      code: 1,
      data: response.data.data,
    };
  } catch (err) {
    console.error(err);

    return {
      code: -1,
      data: null,
    };
  }
};



export { getAvailableCoupons, getAllCoupons, getAllAvailableCoupons, createCoupon, deleteCoupon, updateCouponSer, getAllCouponsCategoryIds, getAllCouponsProductIds };
