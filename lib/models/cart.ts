import { CartItem } from "@/lib/models/cart-item";

export class Cart {
  constructor(
    public cartId: string,
    public items: CartItem[],
    public totalPrice: number
  ) {}

  static fromJson(json: {
    cartId: string;
    items: CartItem[];
    totalPrice: number;
  }): Cart {
    return new Cart(
      json.cartId,
      json.items.map(CartItem.fromJson),
      json.totalPrice
    );
  }
}
