import { Product } from "@/lib/models/product";

export class Inventory {
  constructor(
    public inventoryId: string,
    public product: Product,
    public available: number,
    public reserved: number,
    public updatedAt: Date
  ) {}
}
