import { Injectable } from '@angular/core';
import { IUser, User } from 'src/app/shared/models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn: boolean = false;
  private loggedUser: User | null = null;

  constructor() {}

  getUser(): User | null {
    return this.loggedUser;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  login(user: IUser): void {
    this.loggedIn = true;
    this.loggedUser = new User(user);
  }

  logout(): void {
    this.loggedIn = false;
    this.loggedUser = null;
  }

  isAdmin(): boolean {
    return this.loggedUser?.role === 'admin';
  }
}
