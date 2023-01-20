import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  constructor(private router: Router) {}

  ngOnInit() {
    console.log(this.router.url);
  }
}
