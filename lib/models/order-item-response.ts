export class OrderItemResponse {
  constructor(
    public orderItemId: string,
    public productId: string,
    public quantity: number,
    public price: number
  ) {}
}
