import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { USERS } from 'src/app/shared/constants';
import { IUser, IUserAddress, User } from 'src/app/shared/models';
import { AlertService, UtilsService } from '..';
import { AuthHttpService } from './auth-http.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn: boolean = false;
  private loggedUser: User | null = null;

  constructor(
    private authHttp: AuthHttpService,
    private utils: UtilsService,
    private alert: AlertService,
    private router: Router
  ) {}

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
    if (!this.loggedUser) {
      const localLoggedUser = localStorage.getItem('loggedUser');
      if (!!localLoggedUser) {
        this.loggedUser = new User(JSON.parse(localLoggedUser));
      } else {
        this.alert.createErrorDialog('Something went wrong!', '');
        this.router.navigate(['/']);
        return false;
      }
    }

    return this.loggedUser?.role === 'admin';
  }

  async createNewAccount(newAccount: IUser): Promise<IUser> {
    const createdUser: IUser = await lastValueFrom(
      this.authHttp.createAccount(newAccount)
    );

    const createdUserWithAddressArray: IUser = {
      ...createdUser,
      id: newAccount.id,
      addresses: newAccount.addresses,
    };
    const localStorageUsers = localStorage.getItem('users');
    let users: IUser[] = [];
    if (!!localStorageUsers) {
      users = JSON.parse(localStorageUsers);
      users.push(createdUserWithAddressArray);
    } else {
      users = [createdUserWithAddressArray];
    }
    USERS.push(createdUserWithAddressArray);
    localStorage.setItem('users', JSON.stringify(users));

    return createdUser;
  }

  hasLoggedUser(): boolean {
    const token = localStorage.getItem('userToken');
    const loggedUser = localStorage.getItem('loggedUser');
    return !!token && !!loggedUser;
  }

  updateUserData(user: IUser) {
    this.loggedUser?.updateData(user);
    localStorage.setItem(
      'loggedUser',
      JSON.stringify(this.loggedUser?.userInterface)
    );
    const savedUserIndex = USERS.findIndex((u) => u.id === user.id);
    if (savedUserIndex) {
      USERS[savedUserIndex] = { ...user };
      const localUsers = localStorage.getItem('users');
      if (!!localUsers) {
        const users: IUser[] = JSON.parse(localUsers);
        const localUserIndex = users.findIndex((u) => u.id === user.id);
        users[localUserIndex] = { ...user };
        localStorage.setItem('users', JSON.stringify(users));
      }
    }
  }

  updateAddresses(addresses: IUserAddress[]) {
    if (this.loggedUser) {
      this.loggedUser.addresses = addresses;
      localStorage.setItem(
        'loggedUser',
        JSON.stringify(this.loggedUser.userInterface)
      );
      const savedUser = USERS.find((u) => u.id === this.loggedUser!.id);
      if (savedUser) {
        savedUser.addresses = addresses;
        const localUsers = localStorage.getItem('users');
        if (!!localUsers) {
          const users: IUser[] = JSON.parse(localUsers);
          const localUserIndex = users.findIndex(
            (u) => u.id === this.loggedUser!.id
          );
          users[localUserIndex].addresses = addresses;
          localStorage.setItem('users', JSON.stringify(users));
        }
      }
    }
  }

  changeUserToAdmin(user: IUser): IUser[] {
    const userIndex: number = USERS.indexOf(user);
    USERS[userIndex].role = 'admin';

    // Check if user contains in localStorage
    if (!!localStorage.getItem('users')) {
      const localUsers: IUser[] = JSON.parse(localStorage.getItem('users')!);
      const localIndex: number = localUsers.findIndex(
        (lUser) => lUser.id === user.id
      );

      if (localIndex !== -1) {
        localUsers[localIndex].role = 'admin';
        localStorage.setItem('users', JSON.stringify(localUsers));
      }
    }

    return this.getPlatformUsers().filter((user) => user.role !== 'admin');
  }

  getPlatformUsers(): IUser[] {
    return USERS;
  }
}
