import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have made by span', () => {
    const madeBy = (fixture.nativeElement as HTMLElement).querySelector(
      'span.made-by'
    );

    expect(madeBy).toBeTruthy();
    expect(madeBy?.textContent?.trim()).toEqual('Made by Bruno Caputo');
  });

  it('should have links to other pages', () => {
    const links = (fixture.nativeElement as HTMLElement).querySelectorAll(
      '.footer-container .links a'
    );

    expect(links.length).toBeGreaterThan(0);
  });
});
