import { Payment } from "@/lib/models/payment";
import instance from "@/lib/services/axios-config";
import axios from "axios";

const getPaymentByOrderId = async (
  orderId: string
): Promise<{ code: number; payment?: Payment }> => {
  try {
    const response = await instance.get(`/payment/order/${orderId}`);
    return { code: response.data.code, payment: response.data.data };
  } catch (error) {
    if (error instanceof axios.AxiosError) {
      return { code: error.response?.data.code };
    }
    return { code: -1 };
  }
};

export { getPaymentByOrderId };
