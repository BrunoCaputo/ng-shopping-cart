import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IPostmonApiResponse } from 'src/app/shared/models';
import { UtilsHttpService } from './utils-http.service';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(private utilsHttp: UtilsHttpService) {}

  captalizeFirstLetter(str: string): string {
    let result: string = '';
    let splittedStr: string[] = str.split(' ');

    for (let i in splittedStr) {
      const val = splittedStr[i];
      result += val.charAt(0).toLocaleUpperCase() + val.slice(1);

      if (Number(i) !== splittedStr.length - 1) {
        result += ' ';
      }
    }

    return result;
  }

  generateRandomCode(): string {
    const length = 8;
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let code = '';

    for (let i = 0; i < length; i++) {
      code += Math.floor(Math.random() * numbers.length);
    }

    return code;
  }

  generateToken(): string {
    const randomString =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    return randomString;
  }

  async getDataFromZipCode(zipCode: string): Promise<IPostmonApiResponse> {
    return lastValueFrom(this.utilsHttp.getAddress(zipCode));
  }
}
