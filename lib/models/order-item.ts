export class OrderItem {
  constructor(
    public orderItemId: string,
    public productId: string,
    public productName: string,
    public quantity: number,
    public price: number
  ) {}
}
