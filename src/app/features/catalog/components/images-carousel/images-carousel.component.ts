import { Component, Input } from '@angular/core';

@Component({
  selector: 'images-carousel',
  templateUrl: './images-carousel.component.html',
  styleUrls: ['./images-carousel.component.scss'],
})
export class ImagesCarouselComponent {
  @Input() images: string[] = [];
}
