import instance from "@/lib/services/axios-config";

const addItemToCart = async ({
  cartId,
  productId,
  quantity,
}: {
  cartId: string;
  productId: string;
  quantity: number;
}): Promise<number> => {
  try {
    const addItemToCartUrl = `/cartItems/cartItem/addItemToCart`;
    const response = await instance.post(addItemToCartUrl, null, {
      params: {
        cartId: cartId,
        productId: productId,
        quantity: quantity,
      },
    });

    console.log(response.data);
    return response.data.code;
  } catch {
    return -1;
  }
};

const updateCartItemQuantity = async ({
  cartId,
  cartItemId,
  quantity,
}: {
  cartId: string;
  cartItemId: string;
  quantity: number;
}): Promise<number> => {
  try {
    const updateCartItemQuantityUrl = `cartItems/cart/${cartId}/cartItem/${cartItemId}/updateItemQuantity/${quantity}`;
    const response = await instance.put(updateCartItemQuantityUrl);

    return response.data.code;
  } catch {
    return -1;
  }
};

export { addItemToCart, updateCartItemQuantity };
