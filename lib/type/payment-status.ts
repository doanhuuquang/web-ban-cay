export type PaymenStatusType = "UNPAID" | "PAID";

export const PaymenStatusTypeLabel: Record<PaymenStatusType, string> = {
  UNPAID: "Chưa thanh toán",
  PAID: "Đã thanh toán",
};
