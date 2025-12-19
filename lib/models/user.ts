import { Role } from "@/lib/models/role";
import { UserProfile } from "@/lib/models/user-profile";

export class User {
  id: string;
  email: string;
  roles: Role[];
  userProfile: UserProfile | null;

  constructor(
    id: string,
    email: string,
    roles: Role[],
    userProfile: UserProfile
  ) {
    this.id = id;
    this.email = email;
    this.roles = roles;
    this.userProfile = userProfile;
  }
}
