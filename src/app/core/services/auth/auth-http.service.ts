import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, first, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthHttpService {
  private authUrl: string = `${environment.apiBaseUrl}/auth/login`;

  constructor(private http: HttpClient) {}

  login(postBody: any): Observable<any> {
    return this.http.post<any>(this.authUrl, postBody).pipe(
      first(),
      catchError((err) => err.message)
    );
  }
}
