import { PaymenMethodType } from "@/lib/type/payment-method";
import { PaymenStatusType } from "@/lib/type/payment-status";

export class Payment {
  constructor(
    public paymentId: string,
    public orderId: string,
    public paymentMethod: PaymenMethodType,
    public paymentStatus: PaymenStatusType
  ) {}
}
