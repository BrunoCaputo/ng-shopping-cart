export interface IUser {
  email: string;
  password: string;
  name: string;
  role?: 'admin';
}

export class User {
  private _email: string;
  private _password: string;
  private _name: string;
  private _role?: 'admin' | undefined;

  constructor(user: IUser) {
    this._email = user.email;
    this._password = user.password;
    this._name = user.name;
    this._role = user.role;
  }

  // GETTERS AND SETTERS
  public get email(): string {
    return this._email;
  }
  public set email(value: string) {
    this._email = value;
  }

  public get password(): string {
    return this._password;
  }
  public set password(value: string) {
    this._password = value;
  }

  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }

  public get role(): 'admin' | undefined {
    return this._role;
  }
  public set role(value: 'admin' | undefined) {
    this._role = value;
  }
}
