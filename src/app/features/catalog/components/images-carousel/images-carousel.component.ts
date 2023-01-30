import { Component, Input, SimpleChanges } from '@angular/core';
import { fadeAnimation, slideAnimation } from 'src/app/core/animations';

@Component({
  selector: 'images-carousel',
  templateUrl: './images-carousel.component.html',
  styleUrls: ['./images-carousel.component.scss'],
  animations: [slideAnimation, fadeAnimation],
})
export class ImagesCarouselComponent {
  @Input() images: string[] = [];

  currentIndex = 0;
  slide = { left: true };
  carouselImages: { url: string; start: boolean; end: boolean }[] = [];

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    const imgs: string[] = changes['images'].currentValue;
    this.carouselImages = imgs.map((img) => {
      return {
        url: img,
        start: false,
        end: false,
      };
    });
  }

  isActive(index: number) {
    return this.currentIndex === index;
  }

  prevImage() {
    this.currentIndex--;
    this.slide = { left: false };
  }

  nextImage() {
    this.currentIndex++;
    this.slide = { left: true };
  }
}
