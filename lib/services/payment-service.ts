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

const confirmVnPayPayment = async (
  orderId: string
): Promise<{
  code: number;
}> => {
  try {
    const placeOrderFromCartUrl = `orders/order/${orderId}/confirm-vnpay-payment`;
    await instance.put(placeOrderFromCartUrl);

    return {
      code: 1,
    };
  } catch {
    return {
      code: -1,
    };
  }
};

const confirmCashPayment = async (
  orderId: string
): Promise<{
  code: number;
}> => {
  try {
    const placeOrderFromCartUrl = `orders/order/${orderId}/confirm-cash-payment`;
    await instance.put(placeOrderFromCartUrl);

    return {
      code: 1,
    };
  } catch {
    return {
      code: -1,
    };
  }
};

const confirmPayment = async (
  orderId: string,
  isCash: boolean
): Promise<{
  code: number;
}> => {
  let res;
  if (isCash) res = await confirmCashPayment(orderId);
  else res = await confirmVnPayPayment(orderId);

  return { code: res.code };
};

export { confirmCashPayment, getPaymentByOrderId };
