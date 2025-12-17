export type OrderStatusType =
  | "PENDING"
  | "SHIPPING"
  | "DELIVERING"
  | "COMPLETED"
  | "CANCELLED"
  | "RETURNED";

export const OrderStatusTypeLabel: Record<OrderStatusType, string> = {
  PENDING: "Chờ xác nhận",
  SHIPPING: "Vận chuyển",
  DELIVERING: "Chờ giao hàng",
  COMPLETED: "Hoàn thành",
  CANCELLED: "Đã hủy",
  RETURNED: "Trả hàng/Hoàn tiền",
};
