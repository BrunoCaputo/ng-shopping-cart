import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

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
}
