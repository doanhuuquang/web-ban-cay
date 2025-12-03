type DiscountType = "PERCENTAGE" | "FIXED_AMOUNT";

export class CouponResponse {
  constructor(
    public couponId: string,
    public code: string,
    public discountType: DiscountType,
    public discountPercent: number,
    public discountAmount: number,
    public maxDiscountAmount: number,
    public minOrderValue: number,
    public startDate: Date,
    public expiryDate: Date,
    public enabled: boolean
  ) {}
}
