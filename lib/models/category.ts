export class Category {
  constructor(
    public categoryId: string,
    public categoryName: string,
    public description: string,
    public createAt: Date,
    public updateAt: Date
  ) {}

  static fromJson(json: {
    categoryId: string;
    categoryName: string;
    description: string;
    createAt: string;
    updateAt: string;
  }): Category {
    return new Category(
      json.categoryId,
      json.categoryName,
      json.description,
      new Date(json.createAt),
      new Date(json.updateAt)
    );
  }
}
