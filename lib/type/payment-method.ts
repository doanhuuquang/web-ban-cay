export type PaymenMethodType = "VNPAY" | "CASH";

export const PaymenMethodTypeLabel: Record<PaymenMethodType, string> = {
  CASH: "Thanh toán khi nhận hàng (COD)",
  VNPAY: "Thanh toán qua VNPAY",
};
