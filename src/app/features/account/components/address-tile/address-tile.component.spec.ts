import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressTileComponent } from './address-tile.component';

describe('AddressTileComponent', () => {
  let component: AddressTileComponent;
  let fixture: ComponentFixture<AddressTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddressTileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddressTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
