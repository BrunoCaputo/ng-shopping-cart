import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IUser, User } from 'src/app/shared/models';
import { AuthHttpService } from './auth-http.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn: boolean = false;
  private loggedUser: User | null = null;

  constructor(private authHttp: AuthHttpService) {}

  getUser(): User | null {
    return this.loggedUser;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  async login(user: IUser): Promise<void> {
    const postBody = {};
    const { token } = await lastValueFrom(this.authHttp.login(postBody));
    sessionStorage.setItem('userToken', token);
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
