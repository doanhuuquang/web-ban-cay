export class DeliveryAddress {
  constructor(
    public recipientName: string,
    public recipientPhone: string,
    public street: string,
    public ward: string,
    public district: string,
    public province: string,
    public postalCode: string,
    public deliveryNote: string
  ) {}

  static fromJson(json: {
    recipientName: string;
    recipientPhone: string;
    street: string;
    ward: string;
    district: string;
    province: string;
    postalCode: string;
    deliveryNote: string;
  }): DeliveryAddress {
    return new DeliveryAddress(
      json.recipientName,
      json.recipientPhone,
      json.street,
      json.ward,
      json.district,
      json.province,
      json.postalCode,
      json.deliveryNote
    );
  }

  getFullAddress(): string {
    return `${this.recipientPhone}, ${this.recipientName}, ${this.street}, ${this.ward}, ${this.district}, ${this.province}`;
  }
}
