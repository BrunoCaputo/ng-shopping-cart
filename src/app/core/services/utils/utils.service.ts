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
}
