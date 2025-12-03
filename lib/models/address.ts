export type AddressType = "HOME" | "WORK" | "SCHOOL" | "OTHER";

export const AddressTypeLabel: Record<AddressType, string> = {
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
    public provinceID: string,
    public province: string,
    public districtID: string,
    public district: string,
    public wardCode: string,
    public ward: string,
    public postalCode: string,
    public additionalInfo: string,
    public type: AddressType,
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
    provinceID: string;
    province: string;
    districtID: string;
    district: string;
    wardCode: string;
    ward: string;
    postalCode: string;
    additionalInfo: string;
    type: AddressType;
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
      json.provinceID,
      json.province,
      json.districtID,
      json.district,
      json.wardCode,
      json.ward,
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
