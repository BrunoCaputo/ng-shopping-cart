import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, first, lastValueFrom } from 'rxjs';
import { IUser, User } from 'src/app/shared/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl: string = `${environment.apiBaseUrl}/auth/login`;
  private loggedIn: boolean = false;
  private loggedUser: User | null = null;

  constructor(private http: HttpClient) {}

  getUser(): User | null {
    return this.loggedUser;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  async login(user: IUser): Promise<void> {
    const postBody = {};
    const { token } = await lastValueFrom(
      this.http.post<any>(this.authUrl, postBody).pipe(
        first(),
        catchError((err) => err.message)
      )
    );
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
