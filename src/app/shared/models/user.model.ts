export interface IUser {
  email: string;
  password: string;
  name: string;
  role?: 'admin';
}

export class User {
  email: string;
  password: string;
  name: string;
  role?: 'admin';

  constructor(user: IUser) {
    this.email = user.email;
    this.password = user.password;
    this.name = user.name;
    this.role = user.role;
  }
}
