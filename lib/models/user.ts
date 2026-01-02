import { Role } from "@/lib/models/role";
import { UserProfile } from "@/lib/models/user-profile";
import { Cart } from "./cart";

export class User {
  id: string;
  email: string;
  roles: Role[];
  enabled: boolean;
  lockedReason:string;
  lockedAt:Date;
  userProfile: UserProfile | null;
  cartResponse: Cart | null;

  constructor(
    id: string,
    email: string,
    enabled: boolean,
    lockedReason: string,
    lockedAt: Date,
    roles: Role[],
    userProfile: UserProfile,
    cartResponse:Cart,
  ) {
    this.id = id;
    this.email = email;
    this.enabled = enabled;
    this.lockedReason = lockedReason;
    this.lockedAt = lockedAt;
    this.roles = roles;
    this.userProfile = userProfile;
    this.cartResponse=cartResponse
  }
}
