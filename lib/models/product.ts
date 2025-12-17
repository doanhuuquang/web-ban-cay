export class Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  bio: string;
  price: number;
  discount: number;
  categoryId: string;
  imageUrls: string[];
  rating: number;
  ratingCount: number;
  height: number;
  length: number;
  weight: number;
  width: number;

  constructor(data: {
    id: string;
    slug: string;
    name: string;
    description: string;
    bio: string;
    price: number;
    discount: number;
    categoryId: string;
    imageUrls: string[];
    rating: number;
    ratingCount: number;
    height: number;
    length: number;
    weight: number;
    width: number;
  }) {
    this.id = data.id;
    this.slug = data.slug;
    this.name = data.name;
    this.description = data.description;
    this.bio = data.bio;
    this.price = data.price;
    this.discount = data.discount;
    this.categoryId = data.categoryId;
    this.imageUrls = data.imageUrls;
    this.rating = data.rating;
    this.ratingCount = data.ratingCount;
    this.height = data.height;
    this.length = data.length;
    this.weight = data.weight;
    this.width = data.width;
  }

  getDiscountedPrice(): string {
    const price =
      this.discount && this.discount > 0
        ? this.price - (this.price * this.discount) / 100
        : this.price;

    return new Intl.NumberFormat("vi-VN").format(price) + "₫";
  }

  getPrice(): string {
    return new Intl.NumberFormat("vi-VN").format(this.price) + "₫";
  }
}
