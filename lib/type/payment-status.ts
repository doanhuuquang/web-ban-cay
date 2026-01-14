export type PaymenStatusType =
  | "INIT"
  | "UNPAID"
  | "PAID"
  | "PENDING"
  | "FAILED"
  | "EXPIRED";

export const PaymenStatusTypeLabel: Record<PaymenStatusType, string> = {
  INIT: "Chờ thanh toán",
  UNPAID: "Chưa thanh toán",
  PAID: "Đã thanh toán",
  PENDING: "Đang xử lý",
  FAILED: "Thanh toán thất bại",
  EXPIRED: "Thanh toán hết hạn",
};
