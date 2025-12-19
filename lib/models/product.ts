import { Category } from "@/lib/models/category";
import { Inventory } from "@/lib/models/inventory";
import { ProductImage } from "@/lib/models/product-image";

export class Product {
  constructor(
    public productId: string,
    public slug: string,
    public productName: string,
    public description: string,
    public bio: string,
    public price: number,
    public discount: number,
    public specialPrice: number,
    public origin: string,
    public soldCount: number,
    public reviewCount: number,
    public avgRating: number,
    public createAt: Date,
    public updateAt: Date,
    public category: Category,
    public inventory: Inventory,
    public images: ProductImage[],
    public height: number,
    public length: number,
    public weight: number,
    public width: number
  ) {}

  static fromJson(json: {
    productId: string;
    slug: string;
    productName: string;
    description: string;
    bio: string;
    price: number;
    discount: number;
    specialPrice: number;
    origin: string;
    soldCount: number;
    reviewCount: number;
    avgRating: number;
    createAt: Date;
    updateAt: Date;
    category: Category;
    inventory: Inventory;
    images: ProductImage[];
    height: number;
    length: number;
    weight: number;
    width: number;
  }): Product {
    return new Product(
      json.productId,
      json.slug,
      json.productName,
      json.description,
      json.bio,
      json.price,
      json.discount,
      json.specialPrice,
      json.origin,
      json.soldCount,
      json.reviewCount,
      json.avgRating,
      json.createAt,
      json.updateAt,
      json.category,
      json.inventory,
      json.images,
      json.height,
      json.length,
      json.weight,
      json.width
    );
  }

  getDiscountedPrice(): number {
    const price =
      this.discount && this.discount > 0
        ? this.price - (this.price * this.discount) / 100
        : this.price;

    return price;
  }
}
