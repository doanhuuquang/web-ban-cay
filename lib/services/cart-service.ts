import { Cart } from "@/lib/models/cart";
import instance from "@/lib/services/axios-config";
import axios from "axios";

const getCartByProfileId = async ({
  profileId,
}: {
  profileId: string;
}): Promise<{
  code: number;
  cart: Cart | null;
}> => {
  try {
    const getCartByProfileUrlUrl = `carts/cart/user-profile/${profileId}`;
    const response = await instance.get(getCartByProfileUrlUrl);

    return {
      code: response.data.code,
      cart: Cart.fromJson(response.data.data),
    };
  } catch {
    return {
      code: -1,
      cart: null,
    };
  }
};

const removeItemFromCart = async ({
  cartId,
  cartItemId,
}: {
  cartId: string;
  cartItemId: string;
}): Promise<number> => {
  try {
    const removeItemFromCartUrl = `/cartItems/cart/${cartId}/cartItem/${cartItemId}/removeItemFromCart`;
    const response = await instance.delete(removeItemFromCartUrl);
    return response.data.code;
  } catch (error) {
    if (error instanceof axios.AxiosError) return error.response?.data.code;
    else return -1;
  }
};

export { getCartByProfileId, removeItemFromCart };
