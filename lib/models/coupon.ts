import { DiscountType } from "@/lib/type/discount-type";
import { parseLocalDateTime } from "../helpers/format-date";

export class Coupon {
  constructor(
    public couponId: string,
    public code: string,
    public scope: string,
    public discountType: DiscountType,
    public discountPercent: number,
    public discountAmount: number,
    public maxDiscountAmount: number,
    public minOrderValue: number,
    public startDate: Date,
    public expiryDate: Date,
    public enabled: boolean,
    public usageLimit: number,
    public usedCount: number,
    public limitPerUser: boolean,
    public maxUsesPerUser: number,
    public categoryIds: string[],
    public productIds: string[]
  ) {}

  // static fromJson(json: {
  //   couponId: string;
  //   code: string;
  //   scope: string;
  //   discountType: DiscountType;
  //   discountPercent: number;
  //   discountAmount: number;
  //   maxDiscountAmount: number;
  //   minOrderValue: number;
  //   startDate: string;
  //   expiryDate: string;
  //   enabled: boolean;
  //   usageLimit: number;
  //   usedCount: number;
  //   limitPerUser: boolean;
  //   maxUsesPerUser: number;
  //   categoryIds: string[];
  //   productIds: string[];
  // }): Coupon {
  //   return new Coupon(
  //     json.couponId,
  //     json.code,
  //     json.scope,
  //     json.discountType,
  //     json.discountPercent,
  //     json.discountAmount,
  //     json.maxDiscountAmount,
  //     json.minOrderValue,
  //     new Date(json.startDate),
  //     new Date(json.expiryDate),
  //     json.enabled,
  //     json.usageLimit,
  //     json.usedCount,
  //     json.limitPerUser,
  //     json.maxUsesPerUser,
  //     json.categoryIds,
  //     json.productIds
  //   );
  // }
}


export type UpdateCouponDTO={
  enabled: boolean,
  maxDiscountAmount: number,
  minOrderValue: number,
  startDate: Date,
  expiryDate: Date
}