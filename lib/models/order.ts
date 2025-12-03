import { CouponResponse } from "@/lib/models/coupon-response";
import { OrderItemResponse } from "@/lib/models/order-item-response";

export class Order {
  constructor(
    public orderId: string,
    public paymentId: string,
    public profileId: string,
    public deliveryAddressId: string,
    public shippingFee: number,
    public discountAmount: number,
    public totalAmount: number,
    public orderStatus: string,
    public orderDate: Date,
    public orderItemResponses: OrderItemResponse[],
    public couponResponse: CouponResponse
  ) {}
}
