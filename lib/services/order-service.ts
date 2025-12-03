import { Order } from "@/lib/models/order";
import instance from "@/lib/services/axios-config";
import axios from "axios";

const getOrdersByProfileId = async ({
  profileId,
}: {
  profileId: string;
}): Promise<{
  code: number;
  orders: Order[];
}> => {
  try {
    const createAddressUrl = `orders/profile/${profileId}`;
    const response = await instance.get(createAddressUrl);
    return {
      code: response.data.code,
      orders: response.data.data,
    };
  } catch (error) {
    if (error instanceof axios.AxiosError) {
      return {
        code: -1,
        orders: [],
      };
    }
    return {
      code: -1,
      orders: [],
    };
  }
};

export { getOrdersByProfileId };
