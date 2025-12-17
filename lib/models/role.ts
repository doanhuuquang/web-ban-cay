export type RoleType = "ADMIN" | "USER";

export const AddressTypeLabel: Record<RoleType, string> = {
  ADMIN: "Quản trị viên",
  USER: "Người dùng",
};

export class Role {
  roleName: string;
  description: string;

  constructor(roleName: string, description: string) {
    this.roleName = roleName;
    this.description = description;
  }
}
