export class User {
  id: string;
  email: string;
  name: string;
  avatarUrl: string;
  phoneNumber: string;
  address: string;

  constructor(
    id: string,
    email: string,
    name: string,
    avatarUrl: string,
    phoneNumber: string,
    address: string
  ) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.avatarUrl = avatarUrl;
    this.phoneNumber = phoneNumber;
    this.address = address;
  }
}
