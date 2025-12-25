import { Order } from "@/lib/models/order";
import instance from "@/lib/services/axios-config";
import axios from "axios";

const placeOrderFromCart = async (data: {
  profileId: string;
  addressId: string;
  paymentMethod: string;
  bankCode: string;
  shippingFee: number;
  couponCode: string;
  orderNote: string;
}): Promise<{
  code: number;
  order: Order | null;
}> => {
  try {
    const placeOrderFromCartUrl = "/orders/placeOrder";
    const response = await instance.post(placeOrderFromCartUrl, data);

    return {
      code: response.data.code,
      order: Order.fromJson(response.data.data),
    };
  } catch {
    return {
      code: -1,
      order: null,
    };
  }
};

const getOrdersByProfileId = async ({
  profileId,
}: {
  profileId: string;
}): Promise<{
  code: number;
  orders: Order[];
}> => {
  try {
    const createAddressUrl = `/orders/profile/${profileId}`;
    const response = await instance.get(createAddressUrl);

    const orders: Order[] = response.data.data.map(Order.fromJson);

    return {
      code: response.data.code,
      orders: orders,
    };
  } catch {
    return {
      code: -1,
      orders: [],
    };
  }
};

const getOrderById = async ({
  orderId,
}: {
  orderId: string;
}): Promise<{
  code: number;
  order: Order | null;
}> => {
  try {
    const getOrderByIdUrl = `/orders/order/${orderId}`;
    const response = await instance.get(getOrderByIdUrl);
    return {
      code: response.data.code,
      order: Order.fromJson(response.data.data),
    };
  } catch {
    return {
      code: -1,
      order: null,
    };
  }
};


const getOrderAll = async (): Promise<{
  code: number;
  order: Order[] | null;
}> => {
  try {
    const getOrderByIdUrl = `orders/all`;
    const response = await instance.get(getOrderByIdUrl);
    return {
      code: 1,
      order: response.data.data
    };
  } catch {
    return {
      code: -1,
      order: null,
    };
  }
};


const getOrderStatus = async (param: string): Promise<{
  code: number;
  order: Order[] | null;
}> => {
  try {
    const getOrderByIdUrl = `orders/status`;
    const response = await instance.get(getOrderByIdUrl, {
      params: { orderStatus: param }
    });

    return {
      code: 1,
      order: response.data.data
    };
  }
  catch {
    return {
      code: -1,
      order: null,
    };
  }
};


const getOrderId = async (orderId: string): Promise<{
  code: number;
  order: Order | null;
}> => {
  try {
    const getOrderByIdUrl = `orders/order/${orderId}`;
    const response = await instance.get(getOrderByIdUrl);

    return {
      code: 1,
      order: response.data.data
    };
  }
  catch {
    return {
      code: -1,
      order: null,
    };
  }
};

const updateStatusOrder = async (orderId: string, orderStatus: string): Promise<{
  code: number;
  order: Order | null;
}> => {
  try {
    console.log(orderId,orderStatus)
    const getOrderByIdUrl = `orders/order/updateStatus`;
    const response = await instance.put(getOrderByIdUrl,null,{
      params:{orderStatus:orderStatus,orderId:orderId}
    });

    return {
      code: 1,
      order: response.data.data
    };
  }
  catch {
    return {
      code: -1,
      order: null,
    };
  }
};


const getOrderProfileId = async (profileId: string): Promise<{
  code: number;
  order: Order[] | null;
}> => {
  try {
    const getOrderByIdUrl = `orders/profile/${profileId}`;
    const response = await instance.get(getOrderByIdUrl);

    return {
      code: 1,
      order: response.data.data
    };
  }
  catch {
    return {
      code: -1,
      order: null,
    };
  }
};

const updateOrderAddress = async ({
  orderId,
  addressId,
}: {
  orderId: string;
  addressId: string;
}): Promise<number> => {
  try {
    const updateOrderAddressUrl = `/orders/order/${orderId}/address/${addressId}/update-order-address`;
    const response = await instance.put(updateOrderAddressUrl, {});
    return response.data.code;
  } catch (e) {
    console.log(e);
    return -1;
  }
};

const cancelOrder = async ({
  orderId,
}: {
  orderId: string;
}): Promise<number> => {
  try {
    const cancelOrderUrl = `/orders/order/${orderId}/cancelOrder`;
    const response = await instance.put(cancelOrderUrl, {});
    return response.data.code;
  } catch (e) {
    console.log(e);
    return -1;
  }
};

export {
  placeOrderFromCart,
  getOrdersByProfileId,
  getOrderById,
  updateOrderAddress,
  cancelOrder,
  getOrderAll,
  getOrderStatus,
  getOrderId,
  getOrderProfileId,updateStatusOrder
};
