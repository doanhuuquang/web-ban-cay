export class CartItem {
  constructor(
    public cartItemId: string,
    public productId: string,
    public productName: string,
    public quantity: number,
    public unitPrice: number,
    public totalPrice: number
  ) {}

  static fromJson(json: {
    cartItemId: string;
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }): CartItem {
    return new CartItem(
      json.cartItemId,
      json.productId,
      json.productName,
      json.quantity,
      json.unitPrice,
      json.totalPrice
    );
  }
}
