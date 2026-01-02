export type OrderStatusType =
  | "PENDING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "RETURNED";

export const OrderStatusTypeLabel: Record<OrderStatusType, string> = {
  PENDING: "Chờ xác nhận",
  SHIPPED: "Vận chuyển",
  DELIVERED: "Đã giao thành công",
  CANCELLED: "Đã hủy",
  RETURNED: "Trả hàng/Hoàn tiền",
};
