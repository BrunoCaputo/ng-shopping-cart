import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/shared/shared.module';

import { CategoryContainerComponent } from './category-container.component';

describe('CategoryContainerComponent', () => {
  let component: CategoryContainerComponent;
  let fixture: ComponentFixture<CategoryContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryContainerComponent],
      imports: [SharedModule, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
