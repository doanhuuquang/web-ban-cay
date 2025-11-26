export const AddressType: Record<string, string> = {
  HOME: "Nhà riêng",
  WORK: "Cơ quan",
  SCHOOL: "Trường học",
  OTHER: "Địa chỉ khác",
};

export class Address {
  constructor(
    public addressId: string,
    public fullName: string,
    public phone: string,
    public street: string,
    public ward: string,
    public district: string,
    public province: string,
    public postalCode: string,
    public additionalInfo: string,
    public type: "HOME" | "WORK" | "SCHOOL" | "OTHER",
    public label: string,
    public shortAddress: string,
    public fullAddress: string,
    public createdAt: Date,
    public updatedAt: Date | null,
    public isDefault: boolean
  ) {}

  static fromJson(json: {
    addressId: string;
    fullName: string;
    phone: string;
    street: string;
    ward: string;
    district: string;
    province: string;
    postalCode: string;
    additionalInfo: string;
    type: "HOME" | "WORK" | "SCHOOL" | "OTHER";
    label: string;
    shortAddress: string;
    fullAddress: string;
    createdAt: Date;
    updatedAt: Date | null;
    isDefault: boolean;
  }): Address {
    return new Address(
      json.addressId,
      json.fullName,
      json.phone,
      json.street,
      json.ward,
      json.district,
      json.province,
      json.postalCode,
      json.additionalInfo,
      json.type,
      json.label,
      json.shortAddress,
      json.fullAddress,
      json.createdAt,
      json.updatedAt,
      json.isDefault
    );
  }
}
