import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { IUser } from 'src/app/shared/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthHttpService {
  private usersUrl: string = `${environment.apiBaseUrl}/users`;
  private authUrl: string = `${environment.apiBaseUrl}/auth/login`;

  constructor(private http: HttpClient) {}

  login(postBody: any): Observable<any> {
    return this.http.post<any>(this.authUrl, postBody).pipe(first());
  }

  createAccount(newUser: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${this.usersUrl}/add`, newUser).pipe(first());
  }
}
