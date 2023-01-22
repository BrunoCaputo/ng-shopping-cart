import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/shared/shared.module';

import { OrderLineComponent } from './order-line.component';

describe('OrderLineComponent', () => {
  let component: OrderLineComponent;
  let fixture: ComponentFixture<OrderLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderLineComponent],
      imports: [SharedModule, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
