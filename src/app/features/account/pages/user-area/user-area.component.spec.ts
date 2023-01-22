import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAreaComponent } from './user-area.component';

describe('UserAreaComponent', () => {
  let component: UserAreaComponent;
  let fixture: ComponentFixture<UserAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserAreaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
