export class Cart {
  id: string;
  cartItems: undefined[];
  totalPrice: number;

  constructor(id: string, cartItems: undefined[], totalPrice: number) {
    this.id = id;
    this.cartItems = cartItems;
    this.totalPrice = totalPrice;
  }
}
