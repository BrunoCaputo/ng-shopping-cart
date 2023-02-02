import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { IPostmonApiResponse } from 'src/app/shared/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UtilsHttpService {
  private addressUrl: string = environment.addressUrl;

  constructor(private http: HttpClient) {}

  getAddress(zipCode: string): Observable<IPostmonApiResponse> {
    return this.http
      .get<IPostmonApiResponse>(`${this.addressUrl}/${zipCode}`)
      .pipe(first());
  }
}
