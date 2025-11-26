import { Address } from "@/lib/models/address";
import { Cart } from "@/lib/models/cart";

export class UserProfile {
  profileId: string;
  userName: string;
  mobileNumber: string;
  gender: boolean;
  birthDate: Date;
  addressResponse: Address[];
  cartResponse: Cart[];

  constructor(
    profileId: string,
    userName: string,
    mobileNumber: string,
    gender: boolean,
    birthDate: Date,
    addressResponse: Address[],
    cartResponse: Cart[]
  ) {
    this.profileId = profileId;
    this.userName = userName;
    this.mobileNumber = mobileNumber;
    this.gender = gender;
    this.birthDate = birthDate;
    this.addressResponse = addressResponse;
    this.cartResponse = cartResponse;
  }
}
