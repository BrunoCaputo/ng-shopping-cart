import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { USERS } from 'src/app/shared/constants';
import { IPostmonApiResponse, IUser, User } from 'src/app/shared/models';
import { UtilsService } from '../utils/utils.service';
import { AuthHttpService } from './auth-http.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn: boolean = false;
  private loggedUser: User | null = null;

  constructor(private authHttp: AuthHttpService, private utils: UtilsService) {}

  getUser(): User | null {
    return this.loggedUser;
  }

  setUser(user: IUser) {
    this.loggedUser = new User(user);
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  setLoggedIn(logged: boolean) {
    this.loggedIn = logged;
  }

  async login(user: IUser): Promise<void> {
    const postBody = {
      username: user.username,
      password: user.password,
    };
    try {
      const { token } = await lastValueFrom(this.authHttp.login(postBody));
      localStorage.setItem('userToken', token);
    } catch (err) {
      localStorage.setItem('userToken', this.utils.generateToken());
      console.log('NOT DUMMY JSON USER');
    } finally {
      this.setLoggedIn(true);
      this.setUser(user);
      localStorage.setItem('loggedUser', JSON.stringify(user));
    }
  }

  logout(): void {
    localStorage.removeItem('userToken');
    localStorage.removeItem('loggedUser');
    this.setLoggedIn(false);
    this.loggedUser = null;
  }

  isAdmin(): boolean {
    return this.loggedUser?.role === 'admin';
  }

  async getDataFromZipCode(zipCode: string): Promise<IPostmonApiResponse> {
    return lastValueFrom(this.authHttp.getAddress(zipCode));
  }

  async createNewAccount(newAccount: IUser): Promise<IUser> {
    const createdUser: IUser = await lastValueFrom(
      this.authHttp.createAccount(newAccount)
    );

    const localStorageUsers = localStorage.getItem('users');
    let users: IUser[] = [];
    if (!!localStorageUsers) {
      users = JSON.parse(localStorageUsers);
      users.push(createdUser);
    } else {
      users = [createdUser];
    }
    USERS.push(createdUser);
    localStorage.setItem('users', JSON.stringify(users));

    return createdUser;
  }
}
