import { Coupon } from "@/lib/models/coupon";
import { OrderItem } from "@/lib/models/order-item";
import { OrderStatusType } from "@/lib/type/order-status";

export class Order {
  constructor(
    public orderId: string,
    public paymentId: string,
    public profileId: string,
    public deliveryAddressId: string,
    public shippingFee: number,
    public discountAmount: number,
    public totalAmount: number,
    public orderStatus: OrderStatusType,
    public orderDate: Date,
    public orderItemResponses: OrderItem[],
    public couponResponse: Coupon
  ) {}

  static fromJson(json: {
    orderId: string;
    paymentId: string;
    profileId: string;
    deliveryAddressId: string;
    shippingFee: number;
    discountAmount: number;
    totalAmount: number;
    orderStatus: OrderStatusType;
    orderDate: string;
    orderItemResponses: OrderItem[];
    couponResponse: Coupon;
  }): Order {
    return new Order(
      json.orderId,
      json.paymentId,
      json.profileId,
      json.deliveryAddressId,
      json.shippingFee,
      json.discountAmount,
      json.totalAmount,
      json.orderStatus,
      new Date(json.orderDate),
      json.orderItemResponses,
      json.couponResponse
    );
  }
}
