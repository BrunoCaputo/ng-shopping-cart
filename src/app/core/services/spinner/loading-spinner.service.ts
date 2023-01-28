import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class LoadingSpinnerService {
  constructor(private spinner: NgxSpinnerService) {}

  show() {
    this.spinner.show('loadingSpinner');
  }

  hide() {
    this.spinner.hide('loadingSpinner');
  }
}
