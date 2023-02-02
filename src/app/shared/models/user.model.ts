export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  email: string;
  username: string;
  password: string;
  age?: number;
  gender?: 'male' | 'female' | 'other';
  phone?: string;
  birthDate?: string;
  image?: string;
  bloodGroup?: string;
  height?: number;
  weight?: number;
  eyeColor?: string;
  hair?: {
    color: string;
    type: string;
  };
  domain?: string;
  ip?: string;
  addresses?: IUserAddress[];
  macAddress?: string;
  university?: string;
  bank?: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  };
  company?: {
    address: {
      address: string;
      city: string;
      coordinates?: {
        lat: number;
        lng: number;
      };
      postalCode: string;
      state: string;
    };
    department: string;
    name: string;
    title: string;
  };
  ein?: string;
  ssn?: string;
  userAgent?: string;
  role?: 'admin' | undefined;
}

export interface IUserAddress {
  address: string;
  city: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  postalCode: string;
  state: string;
}

export class User {
  private _email: string;
  private _password: string;
  private _name: string;
  private _role?: 'admin' | undefined;
  private _username: string;
  private _userInterface: IUser;

  constructor(user: IUser) {
    this._email = user.email;
    this._password = user.password;
    this._name = user.firstName;
    this._role = user.role;
    this._username = user.username;
    this._userInterface = user;
  }

  // GETTERS AND SETTERS
  public get email(): string {
    return this._email;
  }
  public set email(value: string) {
    this._email = value;
  }

  public get username(): string {
    return this._username;
  }
  public set username(value: string) {
    this._username = value;
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

  public get userInterface(): IUser {
    return this._userInterface;
  }
}
